// The full text of Ecce Homo, one section at a time, for readers who own the edition (or Pro):
// GET ?lang=es&ch=ch12&e=<email hash>&t=<token> → { blocks: [['p', text], ['h', subheading], ['y', year]] };
// ch=all → { sections: { intro: blocks, ch1: blocks, … } }, the whole edition for offline reading.
// The editions are uploaded by the museum from the dashboard (admin.js "book-put") and kept privately
// as book/<lang>/<section>.json; the token comes from api/purchases.js when the app unlocks a purchase.
// b=fu: Fundamentos del Psico-Expresionismo in any of its editions (fundamentos.js), sections s0…s39 in
// fund/<lang>/, for owners of "fund-<lang>" or Pro.
const crypto = require('crypto');
const { readJSON, readerToken } = require('./_lib');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  const { lang, ch, e, t, b } = req.query || {};
  const fu = b === 'fu', dir = fu ? 'fund' : 'book';
  if (!/^[a-z]{2}$/.test(String(lang)) || !(fu ? /^(s\d{1,2}|all)$/ : /^(intro|ch\d{1,2}|ack|chrono|all)$/).test(String(ch)) || !/^[0-9a-f]{64}$/.test(String(e)) || !/^[0-9a-f]{40}$/.test(String(t)))
    return res.status(400).json({ error: 'request' });
  const ok = await readerToken(e);
  if (!crypto.timingSafeEqual(Buffer.from(ok), Buffer.from(String(t)))) return res.status(403).json({ error: 'token' });
  const rec = await readJSON(`purchases/${e}.json`);
  const owns = rec && rec.items && ((rec.items[(fu ? 'fund-' : 'book-') + lang] || {}).active || (rec.items.pro || {}).active);
  if (!owns) return res.status(403).json({ error: 'not-owned' });
  if (ch === 'all') {
    const keys = fu ? Array.from({ length: 40 }, (_, i) => 's' + i) : ['intro', ...Array.from({ length: 70 }, (_, i) => 'ch' + (i + 1)), 'ack', 'chrono'];
    const all = await Promise.all(keys.map(k => readJSON(`${dir}/${lang}/${k}.json`)));
    if (!all.some(Boolean)) return res.status(404).json({ error: 'not-uploaded' });
    return res.status(200).json({ sections: Object.fromEntries(keys.map((k, i) => [k, all[i] && all[i].blocks]).filter(([, b]) => b)) });
  }
  const sec = await readJSON(`${dir}/${lang}/${ch}.json`);
  if (!sec) return res.status(404).json({ error: 'not-uploaded' });
  res.status(200).json({ blocks: sec.blocks });
};
