// Saves an RSVP so the museum sees it in the dashboard (the reply also goes to WhatsApp, as before).
// POST { event, date, att, name, email, phone, guests, guestNames, note }. One file per guest and event
// date (rsvps/<event>/<date>/<hash of email>.json): a changed reply replaces the earlier one.
const { emailHash, writeJSON } = require('./_lib');

const str = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const b = req.body || {};
  const event = str(b.event, 60), date = str(b.date, 10), email = str(b.email, 200);
  if (!/^[a-z0-9-]+$/.test(event) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !['yes', 'no'].includes(b.att))
    return res.status(400).json({ error: 'details' });
  const reply = { event, date, att: b.att, name: str(b.name, 120), email, phone: str(b.phone, 40),
    guests: Math.min(3, Math.max(0, Number(b.guests) || 0)), guestNames: str(b.guestNames, 300), note: str(b.note, 1000), at: new Date().toISOString() };
  await writeJSON(`rsvps/${event}/${date}/${emailHash(email)}.json`, reply);
  res.status(200).json({ ok: true });
};
