// Online bidding. GET → current state of every lot (highest bid, number of bids, last bids with
// initials only). POST { lot, amount, name, email, phone, accept } → places a bid if it is high
// enough and the lot is open. Bids live in the private Blob store, one file per lot
// (auction/<lot>.json), written with ETag checks so two bids at the same moment cannot overwrite
// each other. Bidder details stay private: the museum reads them in Vercel › Storage.
const crypto = require('crypto');
const { put, get } = require('@vercel/blob');
const { sendLotAlerts } = require('./push');
const { AUCTION, lotOpen, lotMinBid } = require('../auction-config.js');

const path = id => `auction/${id}.json`;
async function load(id) {
  const r = await get(path(id), { access: 'private', useCache: false }).catch(() => null);
  if (!r || r.statusCode !== 200) return { data: { bids: [] }, etag: null };
  return { data: JSON.parse(await new Response(r.stream).text()), etag: r.blob.etag };
}
const initials = name => String(name).trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase() + '.').join(' ');
function publicState(data) {
  const bids = data.bids || [];
  return { high: bids.length ? bids[bids.length - 1].amount : null, count: bids.length,
    last: bids.slice(-8).reverse().map(b => ({ amount: b.amount, at: b.at, who: b.who })) };
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
  if (!lotOpen(lot)) return res.status(409).json({ error: 'closed' });
  if (!b.accept || name.length < 2 || name.length > 120 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || phone.length < 6 || phone.length > 40)
    return res.status(400).json({ error: 'details' });
  if (!Number.isInteger(amount) || amount > 10000000) return res.status(400).json({ error: 'amount' });

  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, etag } = await load(lot.id);
    const state = publicState(data), min = lotMinBid(lot, state);
    if (amount < min) return res.status(409).json({ error: 'low', min, ...state });
    data.bids = [...(data.bids || []), { amount, at: new Date().toISOString(), who: initials(name), name, email, phone }];
    try {
      await put(path(lot.id), JSON.stringify(data), { access: 'private', contentType: 'application/json', addRandomSuffix: false,
        ...(etag ? { allowOverwrite: true, ifMatch: etag } : { allowOverwrite: false }) });
      const next = publicState(data);
      // Tell the previous highest bidder (if someone else, with alerts on) that they have been outbid.
      const prev = data.bids[data.bids.length - 2], hash = e => crypto.createHash('sha256').update(String(e).trim().toLowerCase()).digest('hex');
      if (prev && hash(prev.email) !== hash(email)) {
        await Promise.race([sendLotAlerts(lot.id, 'outbid', { amount }, rec => rec.who === hash(prev.email)).catch(() => 0), new Promise(r => setTimeout(r, 4000))]);
      }
      return res.status(200).json({ ok: true, ...next, min: lotMinBid(lot, next) });
    } catch (e) { /* someone else bid at the same moment: reload and check again */ }
  }
  res.status(503).json({ error: 'busy' });
};
