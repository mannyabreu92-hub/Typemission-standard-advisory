// Shared helpers for the Whop purchase server (Vercel Functions).
// Purchases are stored in the project's private Vercel Blob store (BLOB_READ_WRITE_TOKEN),
// one file per buyer, named by a hash of the email so no address appears in a file name.
const crypto = require('crypto');
const { put, get } = require('@vercel/blob');
const { BOOKING } = require('../booking-config.js');

const emailHash = email => crypto.createHash('sha256').update(String(email).trim().toLowerCase()).digest('hex');

// Whop signs webhooks with the Standard Webhooks scheme: HMAC-SHA256 over "id.timestamp.body",
// sent as "v1,<base64>" in the webhook-signature header (several, space separated, during key rotation).
function verifyWebhook(raw, headers, secret) {
  const id = headers['webhook-id'], ts = headers['webhook-timestamp'], sigs = headers['webhook-signature'];
  if (!id || !ts || !sigs || !secret) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false; // replay window: 5 minutes
  const key = secret.startsWith('whsec_') ? Buffer.from(secret.slice(6), 'base64') : Buffer.from(secret, 'utf8');
  const expected = crypto.createHmac('sha256', key).update(`${id}.${ts}.${raw}`).digest();
  return String(sigs).split(' ').some(s => {
    const [v, b64] = s.split(',');
    if (v !== 'v1' || !b64) return false;
    const got = Buffer.from(b64, 'base64');
    return got.length === expected.length && crypto.timingSafeEqual(got, expected);
  });
}

// Every string in the payload, to find the buyer's email and the product without depending on
// Whop's exact field names.
function strings(o, out = [], key = '') {
  if (typeof o === 'string') out.push([key, o]);
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) strings(v, out, k);
  return out;
}
const findEmail = data => (strings(data).find(([k, v]) => /email/i.test(k) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) || [])[1] || '';

// The app's product keys (BOOKING.whop) are matched by the last part of each checkout link,
// e.g. https://whop.com/museoabreu/painting-club → "painting-club".
function findProductKey(data) {
  const values = strings(data).map(([, v]) => v.replace(/\/+$/, ''));   // a link may come with a trailing /
  for (const [key, url] of Object.entries(BOOKING.whop || {})) {
    if (!url) continue;
    const slug = url.replace(/\/+$/, '').split('/').pop();
    if (values.some(v => v === slug || v === url || v.endsWith('/' + slug))) return key;
  }
  return '';
}

async function readJSON(pathname) {
  const r = await get(pathname, { access: 'private', useCache: false }).catch(() => null);
  if (!r || r.statusCode !== 200) return null;
  return JSON.parse(await new Response(r.stream).text());
}
const writeJSON = (pathname, obj) => put(pathname, JSON.stringify(obj), {
  access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
});

// Event tickets (ART GABANGI keys "gabangi-…"): each paid purchase gets a code for its QR, made from the
// payment id with a secret kept in the private store (tickets/secret.json, created on first use), so the
// same payment always gives the same code and codes cannot be guessed.
const isTicketKey = key => /^gabangi-/.test(key);
// A random secret kept in the private store, created on first use (two first calls at once: one write wins).
async function storedSecret(path) {
  let s = await readJSON(path);
  if (!s) {
    await put(path, JSON.stringify({ secret: crypto.randomBytes(32).toString('hex') }), { access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: false }).catch(() => {});
    s = await readJSON(path);
  }
  return s.secret;
}
async function ticketCode(paymentId) {
  const h = crypto.createHmac('sha256', await storedSecret('tickets/secret.json')).update(String(paymentId)).digest();
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c = '';
  for (let i = 0; i < 8; i++) c += A[h[i] % 32];
  return `GB-${c.slice(0, 4)}-${c.slice(4)}`;
}
// The quantity of a payment, wherever the payload keeps it (1 if none).
function quantityOf(data) {
  let q = null;
  (function walk(v, k) { if (q != null || !v) return; if (typeof v === 'object') return Object.entries(v).forEach(([kk, vv]) => walk(vv, kk));
    if (/^quantity$/i.test(k) && Number.isInteger(Number(v)) && Number(v) > 0) q = Number(v); })(data, '');
  return Math.min(q || 1, 20);
}

// Reading the full book (api/book.js): the app gets a token for the email it unlocked with, so chapters are
// sent only to someone who went through "Unlock" for an email that owns the edition.
const readerToken = async eHash => crypto.createHmac('sha256', await storedSecret('book/secret.json')).update('reader:' + eHash).digest('hex').slice(0, 40);

module.exports = { emailHash, verifyWebhook, findEmail, findProductKey, readJSON, writeJSON, isTicketKey, ticketCode, quantityOf, readerToken };
