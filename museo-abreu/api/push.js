// Phone reminders the day before an event (Web Push). The app asks this function for the public key,
// then sends the guest's subscription with the reminder already written in their language:
//   GET                                   → { key }  (VAPID public key)
//   POST { action: 'add', sub, event, date, title, body, url, now: { title, body } }
//   POST { action: 'remove', endpoint, event, date }
// Subscriptions are kept privately as push/subs/<date>/<event>/<hash>.json; api/push-cron.js sends
// them the day before and deletes them. The VAPID keys are created on first use and kept in the
// same private store (push/vapid.json), so nothing needs setting up in Vercel.
const crypto = require('crypto');
const webpush = require('web-push');
const { put, del } = require('@vercel/blob');
const { readJSON } = require('./_lib');

async function vapid() {
  let keys = await readJSON('push/vapid.json');
  if (keys) return keys;
  keys = webpush.generateVAPIDKeys();
  // Two first calls at once: only one write wins, both then use the stored pair.
  await put('push/vapid.json', JSON.stringify(keys), { access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: false }).catch(() => {});
  return readJSON('push/vapid.json');
}
function useKeys(keys) { webpush.setVapidDetails('https://museo-abreu.vercel.app', keys.publicKey, keys.privateKey); }

const str = (v, max) => String(v == null ? '' : v).slice(0, max);
const subPath = (date, event, endpoint) => `push/subs/${date}/${event}/${crypto.createHash('sha256').update(endpoint).digest('hex').slice(0, 32)}.json`;
const validEndpoint = e => /^https:\/\/[^\s]+$/.test(String(e || '')) && String(e).length < 1000;

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ key: (await vapid()).publicKey });
  if (req.method !== 'POST') return res.status(405).json({ error: 'GET or POST' });
  const b = req.body || {};
  if (/^lot-(add|remove)$/.test(b.action)) return lotAlerts(b, res);
  if (!/^[a-z0-9-]+$/.test(String(b.event)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(b.date))) return res.status(400).json({ error: 'request' });

  if (b.action === 'remove') {
    if (!validEndpoint(b.endpoint)) return res.status(400).json({ error: 'request' });
    await del(subPath(b.date, b.event, b.endpoint)).catch(() => {});
    return res.status(200).json({ ok: true });
  }
  const sub = b.sub || {};
  if (b.action !== 'add' || !validEndpoint(sub.endpoint) || !sub.keys || typeof sub.keys.p256dh !== 'string' || typeof sub.keys.auth !== 'string')
    return res.status(400).json({ error: 'request' });
  // Reminders only for dates still ahead (Punta Cana time).
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Santo_Domingo' });
  if (b.date <= today) return res.status(400).json({ error: 'date' });
  const rec = { sub: { endpoint: sub.endpoint, keys: { p256dh: str(sub.keys.p256dh, 200), auth: str(sub.keys.auth, 100) } },
    event: b.event, date: b.date, msg: { title: str(b.title, 120), body: str(b.body, 300), url: '/' + str(b.url, 100).replace(/^\/+/, '') }, at: new Date().toISOString() };
  await put(subPath(b.date, b.event, sub.endpoint), JSON.stringify(rec), { access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true });
  // A first notification straight away, so the guest sees that it works.
  let confirmed = false;
  if (b.now && b.now.title) {
    useKeys(await vapid());
    confirmed = await webpush.sendNotification(rec.sub, JSON.stringify({ title: str(b.now.title, 120), body: str(b.now.body, 300), url: rec.msg.url }), { TTL: 3600 })
      .then(() => true, () => false);
  }
  res.status(200).json({ ok: true, confirmed });
};
// Auction alerts for one piece (alerts.js): push/lots/<lot>/<hash>.json with the messages in the
// bidder's language. "outbid" goes to the previous highest bidder when a new bid comes in (api/auction.js,
// matched by a hash of the email used to bid); "open" and "closing" go out with the daily job
// (api/push-cron.js). {amount} and {when} are filled in when sent, in the bidder's locale.
const LOCALES = ['es-DO', 'en-US', 'fr-FR', 'de-DE', 'it-IT', 'ar', 'ru-RU'];
async function lotAlerts(b, res) {
  const { AUCTION } = require('../auction-config.js');
  if (!AUCTION.lots.some(l => l.id === b.lot)) return res.status(400).json({ error: 'request' });
  const sub = b.sub || {}, endpoint = b.action === 'lot-remove' ? b.endpoint : sub.endpoint;
  if (!validEndpoint(endpoint)) return res.status(400).json({ error: 'request' });
  const file = `push/lots/${b.lot}/${crypto.createHash('sha256').update(endpoint).digest('hex').slice(0, 32)}.json`;
  if (b.action === 'lot-remove') { await del(file).catch(() => {}); return res.status(200).json({ ok: true }); }
  if (!sub.keys || typeof sub.keys.p256dh !== 'string' || typeof sub.keys.auth !== 'string') return res.status(400).json({ error: 'request' });
  const m = k => ({ title: str(b.msg && b.msg[k] && b.msg[k].title, 120), body: str(b.msg && b.msg[k] && b.msg[k].body, 300) });
  const email = String(b.email || '').trim().toLowerCase();
  const rec = { sub: { endpoint, keys: { p256dh: str(sub.keys.p256dh, 200), auth: str(sub.keys.auth, 100) } }, lot: b.lot,
    who: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? crypto.createHash('sha256').update(email).digest('hex') : null,
    locale: LOCALES.includes(b.locale) ? b.locale : 'en-US', url: `/#/subasta/${b.lot}`,
    msg: { outbid: m('outbid'), open: m('open'), closing: m('closing') }, at: new Date().toISOString() };
  await put(file, JSON.stringify(rec), { access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true });
  let confirmed = false;
  if (b.now && b.now.title) {
    useKeys(await vapid());
    confirmed = await webpush.sendNotification(rec.sub, JSON.stringify({ title: str(b.now.title, 120), body: str(b.now.body, 300), url: rec.url }), { TTL: 3600 })
      .then(() => true, () => false);
  }
  res.status(200).json({ ok: true, confirmed });
}

// Sends one kind of alert ("outbid", "open", "closing") to the subscriptions of a piece that pass
// `only`; subscriptions whose phone is gone (404/410) are deleted.
async function sendLotAlerts(lotId, kind, vars, only = () => true) {
  const { list } = require('@vercel/blob');
  const blobs = []; let cursor;
  do { const r = await list({ prefix: `push/lots/${lotId}/`, cursor, limit: 1000 }); blobs.push(...r.blobs); cursor = r.hasMore ? r.cursor : null; } while (cursor);
  if (!blobs.length) return 0;
  useKeys(await vapid());
  let sent = 0;
  await Promise.all(blobs.map(async bl => {
    const rec = await readJSON(bl.pathname);
    if (!rec || !only(rec) || !rec.msg[kind] || !rec.msg[kind].title) return;
    const fill = x => x.replace('{amount}', vars.amount != null ? 'USD ' + Number(vars.amount).toLocaleString(rec.locale) : '')
      .replace('{when}', vars.when ? new Date(vars.when).toLocaleString(rec.locale, { timeZone: 'America/Santo_Domingo', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' }) : '');
    await webpush.sendNotification(rec.sub, JSON.stringify({ title: fill(rec.msg[kind].title), body: fill(rec.msg[kind].body), url: rec.url }), { TTL: 6 * 3600 })
      .then(() => { sent++; }, e => { if (e.statusCode === 404 || e.statusCode === 410) return del(bl.pathname).catch(() => {}); console.log('lot alert failed', e.statusCode || e.message); });
  }));
  return sent;
}

module.exports.vapid = vapid;
module.exports.sendLotAlerts = sendLotAlerts;
module.exports.useKeys = useKeys;
