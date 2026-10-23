// Mailing list ("Keep me informed", newsletter.js): POST { name, email, phone, lang, topics, source }.
// One private file per person (list/<hash of email, else phone>.json): signing up again updates it.
// The museum sees and exports the list in the dashboard (api/admin.js).
const crypto = require('crypto');
const { writeJSON } = require('./_lib');
const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ar', 'ru'], TOPICS = ['events', 'auction', 'book'];
const str = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const b = req.body || {};
  const name = str(b.name, 120), email = str(b.email, 200).toLowerCase(), phone = str(b.phone, 40), digits = phone.replace(/\D/g, '');
  if (name.length < 2 || (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) || (phone && digits.length < 7) || (!email && !phone))
    return res.status(400).json({ error: 'details' });
  const topics = (Array.isArray(b.topics) ? b.topics : []).filter(x => TOPICS.includes(x));
  const id = crypto.createHash('sha256').update(email || digits).digest('hex');
  await writeJSON(`list/${id}.json`, { name, email, phone, lang: LANGS.includes(b.lang) ? b.lang : 'es', topics: topics.length ? topics : TOPICS,
    source: str(b.source, 40), at: new Date().toISOString() });
  res.status(200).json({ ok: true });
};
