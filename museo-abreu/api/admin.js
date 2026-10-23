// The museum's dashboard data: auction bids with bidder contacts, Whop purchases and RSVPs.
// Protected by ADMIN_PASSWORD (Vercel › Settings › Environment Variables), sent by the dashboard page
// as "Authorization: Bearer <password>". Without that variable the dashboard stays closed.
const crypto = require('crypto');
const { list, put, del } = require('@vercel/blob');
const { AUCTION } = require('../auction-config.js');
const { readJSON, writeJSON, findEmail, findProductKey } = require('./_lib');

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

  // Door check-in: POST { action: 'checkin', id, arrived } records how many of the party have arrived.
  if (req.method === 'POST') {
    const b = req.body || {};
    // Invitation lists (invites/<event>/<date>.json): add guests, mark one as sent, remove one.
    if (/^invite-(add|sent|remove)$/.test(b.action)) {
      if (!/^[a-z0-9-]+$/.test(String(b.event)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(b.date))) return res.status(400).json({ error: 'request' });
      const path = `invites/${b.event}/${b.date}.json`, doc = (await readJSON(path)) || { list: [] };
      const digits = p => String(p || '').replace(/\D/g, '');
      if (b.action === 'invite-add') {
        for (const g of (Array.isArray(b.list) ? b.list : []).slice(0, 500)) {
          const name = String(g.name || '').trim().slice(0, 120), phone = String(g.phone || '').trim().slice(0, 40);
          if (name.length < 2 || digits(phone).length < 7 || doc.list.some(x => digits(x.phone) === digits(phone))) continue;
          doc.list.push({ id: crypto.randomBytes(6).toString('hex'), name, phone, lang: ['es', 'en', 'fr'].includes(g.lang) ? g.lang : 'es', sentAt: null });
        }
      } else {
        const i = doc.list.findIndex(x => x.id === b.id);
        if (i < 0) return res.status(404).json({ error: 'guest' });
        if (b.action === 'invite-sent') doc.list[i].sentAt = new Date().toISOString(); else doc.list.splice(i, 1);
      }
      await writeJSON(path, doc);
      return res.status(200).json({ event: b.event, date: b.date, ...doc });
    }
    // Mailing list (api/subscribe.js): remove one person.
    if (b.action === 'list-remove') {
      if (!/^list\/[0-9a-f]{64}\.json$/.test(String(b.id))) return res.status(400).json({ error: 'request' });
      await del(b.id).catch(() => {});
      return res.status(200).json({ ok: true });
    }
    // Event photos (photos/<event>/<date>/<id>.jpg + photos/<event>/<date>.json index). The dashboard
    // sends each photo already resized to JPEG, as base64.
    if (b.action === 'photo-add' || b.action === 'photo-remove') {
      if (!/^[a-z0-9-]+$/.test(String(b.event)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(b.date))) return res.status(400).json({ error: 'request' });
      const idx = `photos/${b.event}/${b.date}.json`, doc = (await readJSON(idx)) || { photos: [] };
      if (b.action === 'photo-add') {
        const buf = Buffer.from(String(b.data || ''), 'base64');
        if (buf.length < 1000 || buf.length > 3e6 || buf[0] !== 0xff || buf[1] !== 0xd8) return res.status(400).json({ error: 'image' });
        const id = crypto.randomBytes(8).toString('hex');
        await put(`photos/${b.event}/${b.date}/${id}.jpg`, buf, { access: 'private', contentType: 'image/jpeg', addRandomSuffix: false });
        doc.photos.push({ id, w: Number(b.w) || 0, h: Number(b.h) || 0, at: new Date().toISOString() });
      } else {
        const i = doc.photos.findIndex(p => p.id === b.id);
        if (i < 0) return res.status(404).json({ error: 'photo' });
        doc.photos.splice(i, 1);
        await del(`photos/${b.event}/${b.date}/${b.id}.jpg`).catch(() => {});
      }
      await writeJSON(idx, doc);
      return res.status(200).json({ event: b.event, date: b.date, ...doc });
    }
    // Walk-in: POST { action: 'walkin', event, date, name, party, phone } adds a guest who came without
    // an RSVP, already checked in.
    if (b.action === 'walkin') {
      const name = String(b.name || '').trim().slice(0, 120), party = Math.max(1, Math.min(10, Number(b.party) || 1));
      if (!/^[a-z0-9-]+$/.test(String(b.event)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(b.date)) || name.length < 2) return res.status(400).json({ error: 'request' });
      const id = `rsvps/${b.event}/${b.date}/${crypto.randomBytes(32).toString('hex')}.json`, now = new Date().toISOString();
      const rec = { event: b.event, date: b.date, att: 'yes', walkin: true, name, email: '', phone: String(b.phone || '').trim().slice(0, 40),
        guests: party - 1, guestNames: '', note: '', lang: 'es', at: now, arrived: party, arrivedAt: now };
      await writeJSON(id, rec);
      return res.status(200).json({ id, ...rec });
    }
    if (b.action !== 'checkin' || !/^rsvps\/[a-z0-9-]+\/\d{4}-\d{2}-\d{2}\/[0-9a-f]{64}\.json$/.test(String(b.id))) return res.status(400).json({ error: 'request' });
    const r = await readJSON(b.id);
    if (!r) return res.status(404).json({ error: 'rsvp' });
    r.arrived = Math.max(0, Math.min(1 + (r.guests || 0), Number(b.arrived) || 0));
    r.arrivedAt = r.arrived ? new Date().toISOString() : null;
    await writeJSON(b.id, r);
    return res.status(200).json({ id: b.id, ...r });
  }

  const auction = await Promise.all(AUCTION.lots.map(async l => {
    const d = await readJSON(`auction/${l.id}.json`);
    return { lot: l.id, example: !!l.example, startBid: l.startBid, bids: ((d && d.bids) || []).slice().reverse()
      .map(b => ({ amount: b.amount, at: b.at, name: b.name, email: b.email, phone: b.phone })) };
  }));
  const purchases = (await all('events/', 1000)).filter(e => e.data).map(({ data, at }) => {
    const d = data.data || data;
    return { at, type: String(data.type || data.action || ''),
      product: findProductKey(d), email: findEmail(d), amount: amountOf(d) };
  });
  const rsvps = (await all('rsvps/', 1000)).filter(r => r.data).map(r => ({ id: r.path, ...r.data }));
  const invites = (await all('invites/', 100)).filter(r => r.data).map(r => {
    const [, event, file] = r.path.split('/');
    return { event, date: file.replace('.json', ''), list: r.data.list || [] };
  });
  // Wishlist: how many devices saved each work (api/wish.js).
  const wishes = {};
  (await all('wish/', 3000)).forEach(w => ((w.data && w.data.items) || []).forEach(k => { wishes[k] = (wishes[k] || 0) + 1; }));
  const list = (await all('list/', 5000)).filter(r => r.data).map(r => ({ id: r.path, ...r.data }));
  res.status(200).json({ auction, purchases, rsvps, invites, wishes, list, now: new Date().toISOString() });
};
