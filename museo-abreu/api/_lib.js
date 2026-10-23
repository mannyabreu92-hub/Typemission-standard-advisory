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
  const values = strings(data).map(([, v]) => v);
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

module.exports = { emailHash, verifyWebhook, findEmail, findProductKey, readJSON, writeJSON };
