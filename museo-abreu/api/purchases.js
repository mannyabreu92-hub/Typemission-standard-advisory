// The app asks what an email owns: POST { email } → { keys: ['book-en', 'pro', …], tickets: [{ code, key, qty }] }.
// Only product keys and ticket codes (for the QR) go back, never other details of the purchase.
const { emailHash, readJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const email = String((req.body && req.body.email) || '').trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return res.status(400).json({ error: 'email' });
  const rec = await readJSON(`purchases/${emailHash(email)}.json`);
  const keys = rec ? Object.entries(rec.items).filter(([, v]) => v.active).map(([k]) => k) : [];
  res.setHeader('Cache-Control', 'no-store');
  const tickets = rec && rec.tickets ? rec.tickets.filter(x => !x.void).map(({ code, key, qty }) => ({ code, key, qty })) : [];
  res.status(200).json({ keys, tickets });
};
