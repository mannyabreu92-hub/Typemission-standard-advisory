// Ecce Homo in Oscar Abreu's voice (recorded by api/narrate.js from the dashboard). Each section of an edition
// is kept privately as audio/<lang>/<section>/<n>.mp3, one part per paragraph or few, with
// audio/<lang>/<section>.json listing the parts (their first words, so the reader can light the paragraph being
// heard) and audio/index.json listing what is recorded.
// GET ?index=1 → { es: ['intro', 'ch1'], … }
// GET ?lang=es&ch=ch3[&e=<email hash>&t=<token>] → { parts: [{ n, first, head }] }: the free sample (the
//   introduction and the opening of chapter 1, the parts marked free) for everyone, the rest for Pro and
//   owners of the edition, with the same reading token as api/book.js.
// GET ?lang=es&ch=ch3&n=2[&e=&t=] → the part's MP3 (a part is a few minutes at most, well under the
//   function's response limit).
const crypto = require('crypto');
const { get } = require('@vercel/blob');
const { readJSON, readerToken } = require('./_lib');

async function allowed(q, lang) {
  if (!/^[0-9a-f]{64}$/.test(String(q.e)) || !/^[0-9a-f]{40}$/.test(String(q.t))) return false;
  const ok = await readerToken(q.e);
  if (!crypto.timingSafeEqual(Buffer.from(ok), Buffer.from(String(q.t)))) return false;
  const rec = await readJSON(`purchases/${q.e}.json`);
  return !!(rec && rec.items && ((rec.items['book-' + lang] || {}).active || (rec.items.pro || {}).active));
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  const q = req.query || {};
  if (q.index) {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    return res.status(200).json((await readJSON('audio/index.json')) || {});
  }
  res.setHeader('Cache-Control', 'private, no-store');
  const { lang, ch } = q;
  if (!/^[a-z]{2}$/.test(String(lang)) || !/^(intro|ch\d{1,2}|ack|chrono)$/.test(String(ch))) return res.status(400).json({ error: 'request' });
  const man = await readJSON(`audio/${lang}/${ch}.json`);
  if (!man || !Array.isArray(man.parts)) return res.status(404).json({ error: 'not-recorded' });
  const whole = await allowed(q, lang);
  const open = man.parts.filter(p => p.free || whole);
  if (q.n === undefined) return res.status(200).json({ parts: open.map(({ n, first, head }) => ({ n, first, head: !!head })), whole, total: man.parts.length });
  const n = Number(q.n), part = open.find(p => p.n === n);
  if (!Number.isInteger(n) || !part) return res.status(whole ? 404 : 403).json({ error: whole ? 'part' : 'not-owned' });
  const r = await get(`audio/${lang}/${ch}/${n}.mp3`, { access: 'private', useCache: false }).catch(() => null);
  if (!r || r.statusCode !== 200) return res.status(404).json({ error: 'part' });
  const buf = Buffer.from(await new Response(r.stream).arrayBuffer());
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'private, max-age=86400');
  res.status(200).send(buf);
};
