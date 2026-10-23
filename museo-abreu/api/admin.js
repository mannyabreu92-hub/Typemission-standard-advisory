// The museum's dashboard data: auction bids with bidder contacts, Whop purchases and RSVPs.
// Protected by ADMIN_PASSWORD (Vercel › Settings › Environment Variables), sent by the dashboard page
// as "Authorization: Bearer <password>". Without that variable the dashboard stays closed.
const crypto = require('crypto');
const { list } = require('@vercel/blob');
const { AUCTION } = require('../auction-config.js');
const { readJSON, findEmail, findProductKey } = require('./_lib');

const same = (a, b) => crypto.timingSafeEqual(crypto.createHash('sha256').update(a).digest(), crypto.createHash('sha256').update(b).digest());
const wait = ms => new Promise(r => setTimeout(r, ms));

async function all(prefix, max = 300) {
  const out = []; let cursor;
  do {
    const r = await list({ prefix, cursor, limit: 1000 });
    out.push(...r.blobs); cursor = r.hasMore ? r.cursor : null;
  } while (cursor && out.length < 5000);
  out.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  return Promise.all(out.slice(0, max).map(async b => ({ path: b.pathname, at: b.uploadedAt, data: await readJSON(b.pathname) })));
}
// The amount of a Whop payment, wherever the payload keeps it.
function amountOf(o) {
  let found = null;
  (function walk(v, k) {
    if (found != null || !v) return;
    if (typeof v === 'object') return Object.entries(v).forEach(([kk, vv]) => walk(vv, kk));
    if (/^(final_amount|amount|total|subtotal|usd_total)$/i.test(k) && !isNaN(Number(v))) found = Number(v);
  })(o, '');
  return found;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return res.status(503).json({ error: 'not-configured' });
  const given = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!given || !same(given, pass)) { await wait(800); return res.status(401).json({ error: 'password' }); }

  const auction = await Promise.all(AUCTION.lots.map(async l => {
    const d = await readJSON(`auction/${l.id}.json`);
    return { lot: l.id, example: !!l.example, startBid: l.startBid, bids: ((d && d.bids) || []).slice().reverse()
      .map(b => ({ amount: b.amount, at: b.at, name: b.name, email: b.email, phone: b.phone })) };
  }));
  const purchases = (await all('events/')).filter(e => e.data).map(({ data, at }) => {
    const d = data.data || data;
    return { at, type: String(data.type || data.action || ''),
      product: findProductKey(d), email: findEmail(d), amount: amountOf(d) };
  });
  const rsvps = (await all('rsvps/', 1000)).map(r => r.data).filter(Boolean);
  res.status(200).json({ auction, purchases, rsvps, now: new Date().toISOString() });
};
