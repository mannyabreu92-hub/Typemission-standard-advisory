// Wishlist counts: POST { device, items } saves which works one device has saved with ♡
// (wish/<device>.json, private). The device id is random and nothing else is kept, so the museum sees
// how many people saved each work but not who. api/admin.js adds the counts up for the dashboard.
const { writeJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const b = req.body || {};
  if (!/^[0-9a-f]{32}$/.test(String(b.device)) || !Array.isArray(b.items)) return res.status(400).json({ error: 'request' });
  const items = [...new Set(b.items.filter(i => /^[wl]:[a-z0-9-]{1,60}$/.test(String(i))))].slice(0, 200);
  await writeJSON(`wish/${b.device}.json`, { items, at: new Date().toISOString() });
  res.status(200).json({ ok: true, items: items.length });
};
