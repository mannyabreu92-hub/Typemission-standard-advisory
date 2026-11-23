// Contact form (contact.js): POST { name, email, phone, topic, message, lang }. Each message is kept privately
// as contact/<time>-<random>.json and listed in the dashboard (api/admin.js), where it can be archived.
const crypto = require('crypto');
const { writeJSON } = require('./_lib');
const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ar', 'ru'], TOPICS = ['general', 'visit', 'press', 'collect'];
const str = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const b = req.body || {};
  // A hidden field people never fill in: a bot that does is thanked and ignored.
  if (str(b.website, 200)) return res.status(200).json({ ok: true });
  const name = str(b.name, 120), email = str(b.email, 200).toLowerCase(), phone = str(b.phone, 40), message = str(b.message, 3000);
  if (name.length < 2 || message.length < 5 || (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) || (phone && phone.replace(/\D/g, '').length < 7) || (!email && !phone))
    return res.status(400).json({ error: 'details' });
  const at = new Date().toISOString();
  await writeJSON(`contact/${at.replace(/[:.]/g, '-')}-${crypto.randomBytes(4).toString('hex')}.json`, {
    name, email, phone, topic: TOPICS.includes(b.topic) ? b.topic : 'general', message, lang: LANGS.includes(b.lang) ? b.lang : 'es', at });
  res.status(200).json({ ok: true });
};
