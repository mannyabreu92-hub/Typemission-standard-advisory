// Online bidding. GET → current state of every lot: highest bid, number of bids, the last bids, the
// leaderboard (each bidder's best bid, highest first) and the close, which a soft close may have moved.
// POST { lot, amount, name, email, phone, accept, show } → places a bid if it is high enough and the lot
// is open. A bidder who chooses to (`show`) appears on the leaderboard by name; anyone else by initials. Bids live in the private Blob store, one file per lot
// (auction/<lot>.json), written with ETag checks so two bids at the same moment cannot overwrite
// each other. Bidder details stay private: the museum reads them in Vercel › Storage.
const crypto = require('crypto');
const { put, get } = require('@vercel/blob');
const { sendLotAlerts } = require('./push');
const { AUCTION, lotOpen, lotCloses, lotMinBid } = require('../auction-config.js');

const path = id => `auction/${id}.json`;
async function load(id) {
  const r = await get(path(id), { access: 'private', useCache: false }).catch(() => null);
  if (!r || r.statusCode !== 200) return { data: { bids: [] }, etag: null };
  return { data: JSON.parse(await new Response(r.stream).text()), etag: r.blob.etag };
}
const initials = name => String(name).trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase() + '.').join(' ');
const shownName = name => String(name).replace(/\s+/g, ' ').trim().slice(0, 40);
const hash = e => crypto.createHash('sha256').update(String(e).trim().toLowerCase()).digest('hex');
// The leaderboard: one line per bidder (by email), with their best bid and the name they last chose to show.
function leaders(bids, n = 10) {
  const best = new Map();
  for (const b of bids) {
    const k = hash(b.email), cur = best.get(k);
    best.set(k, { amount: Math.max(b.amount, cur ? cur.amount : 0), who: b.who, at: cur && cur.amount >= b.amount ? cur.at : b.at });
  }
  return [...best.values()].sort((a, b) => b.amount - a.amount || Date.parse(a.at) - Date.parse(b.at)).slice(0, n);
}
function publicState(data) {
  const bids = data.bids || [];
  return { high: bids.length ? bids[bids.length - 1].amount : null, count: bids.length, closesAt: data.closesAt || null,
    last: bids.slice(-8).reverse().map(b => ({ amount: b.amount, at: b.at, who: b.who })), leaders: leaders(bids) };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const lots = {};
    await Promise.all(AUCTION.lots.map(async l => { lots[l.id] = publicState((await load(l.id)).data); }));
    return res.status(200).json({ lots, now: new Date().toISOString() });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'GET or POST' });

  const b = req.body || {};
  const lot = AUCTION.lots.find(l => l.id === b.lot);
  const amount = Number(b.amount), name = String(b.name || '').trim(), email = String(b.email || '').trim(), phone = String(b.phone || '').trim();
  if (!lot) return res.status(404).json({ error: 'lot' });
  if (!b.accept || name.length < 2 || name.length > 120 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || phone.length < 6 || phone.length > 40)
    return res.status(400).json({ error: 'details' });
  if (!Number.isInteger(amount) || amount > 10000000) return res.status(400).json({ error: 'amount' });

  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, etag } = await load(lot.id);
    const now = Date.now();
    if (!lotOpen(lot, now, data)) return res.status(409).json({ error: 'closed', ...publicState(data) });
    const state = publicState(data), min = lotMinBid(lot, state);
    if (amount < min) return res.status(409).json({ error: 'low', min, ...state });
    data.bids = [...(data.bids || []), { amount, at: new Date(now).toISOString(), who: b.show ? shownName(name) : initials(name), name, email, phone }];
    // Soft close: a bid in the final minutes keeps the lot open a little longer.
    const sc = AUCTION.softClose, closes = Date.parse(lotCloses(lot, data));
    if (sc && closes - now < sc.window * 1000) data.closesAt = new Date(Math.max(closes, now + sc.extend * 1000)).toISOString();
    try {
      await put(path(lot.id), JSON.stringify(data), { access: 'private', contentType: 'application/json', addRandomSuffix: false,
        ...(etag ? { allowOverwrite: true, ifMatch: etag } : { allowOverwrite: false }) });
      const next = publicState(data);
      // Tell the previous highest bidder (if someone else, with alerts on) that they have been outbid.
      const prev = data.bids[data.bids.length - 2];
      if (prev && hash(prev.email) !== hash(email)) {
        await Promise.race([sendLotAlerts(lot.id, 'outbid', { amount }, rec => rec.who === hash(prev.email)).catch(() => 0), new Promise(r => setTimeout(r, 4000))]);
      }
      return res.status(200).json({ ok: true, ...next, min: lotMinBid(lot, next) });
    } catch (e) { /* someone else bid at the same moment: reload and check again */ }
  }
  res.status(503).json({ error: 'busy' });
};
