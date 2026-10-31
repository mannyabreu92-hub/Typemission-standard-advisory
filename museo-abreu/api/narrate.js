// Recording Ecce Homo in Oscar Abreu's voice, from the dashboard (Dashboard › Audiobook). The voice is his,
// cloned with his permission in the museum's ElevenLabs account: ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID
// (and optionally ELEVENLABS_MODEL) in Vercel › Settings › Environment Variables. Protected by
// ADMIN_PASSWORD like api/admin.js. The dashboard drives the recording one part at a time, so no call runs
// long:
//   GET                                  → { configured, voice: name, index }
//   POST plan { lang, sec, title, sample? } → { parts: [{ text, first, free, head }], chars, partial }
//        the edition's uploaded text (book/<lang>/<sec>.json); for the introduction and chapter 1, the free
//        sample's paragraphs sent by the dashboard when the full text is not uploaded yet.
//   POST make { lang, sec, n, text, prev, next } → records part n as audio/<lang>/<sec>/<n>.mp3
//   POST done { lang, sec, parts, partial } → audio/<lang>/<sec>.json and audio/index.json (api/audio.js)
//   POST remove { lang, sec }             → deletes the section's recording
const crypto = require('crypto');
const { put, list, del } = require('@vercel/blob');
const { readJSON, writeJSON } = require('./_lib');

const same = (a, b) => crypto.timingSafeEqual(crypto.createHash('sha256').update(a).digest(), crypto.createHash('sha256').update(b).digest());
const FREE_CH1 = 4; // paragraphs of chapter 1 in the free sample (app.js FREE_CH1_PARAS)
const KEY = () => process.env.ELEVENLABS_API_KEY, VOICE = () => process.env.ELEVENLABS_VOICE_ID;
const okSec = s => /^(intro|ch\d{1,2}|ack|chrono)$/.test(String(s));

// The narrator's delivery: steady and warm (stability), true to his voice (similarity), a little of his own
// expression (style), unhurried (speed). The text before and after each part keeps the intonation joined up.
const SETTINGS = { stability: .55, similarity_boost: .85, style: .15, use_speaker_boost: true, speed: .95 };

function plan(blocks, sec, title) {
  const free = sec === 'intro', out = [];
  if (title) out.push({ text: title, head: true, free: free || sec === 'ch1' });
  let p = 0;
  for (const [k, x] of blocks) {
    const text = String(x).trim();
    if (!text) continue;
    if (k !== 'p') { out.push({ text, head: true, free: free || (sec === 'ch1' && p < FREE_CH1) }); continue; }
    out.push({ text, free: free || (sec === 'ch1' && p < FREE_CH1) });
    p++;
  }
  return out.map((x, n) => ({ ...x, n, first: x.text.slice(0, 60) }));
}

async function speak(text, prev, next) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE())}?output_format=mp3_44100_96`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY(), 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2', voice_settings: SETTINGS,
      previous_text: prev ? String(prev).slice(-600) : undefined, next_text: next ? String(next).slice(0, 600) : undefined }),
  });
  if (!r.ok) {
    const why = r.status === 401 ? 'key' : r.status === 404 ? 'voice' : r.status === 402 || r.status === 429 ? 'quota' : 'service';
    const detail = (await r.text().catch(() => '')).slice(0, 300);
    throw Object.assign(new Error(why), { status: r.status, detail });
  }
  return Buffer.from(await r.arrayBuffer());
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return res.status(503).json({ error: 'not-configured' });
  const given = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!given || !same(given, pass)) { await new Promise(r => setTimeout(r, 800)); return res.status(401).json({ error: 'password' }); }
  const configured = !!(KEY() && VOICE());

  if (req.method === 'GET') {
    let voice = '';
    if (configured) {
      const r = await fetch(`https://api.elevenlabs.io/v1/voices/${encodeURIComponent(VOICE())}`, { headers: { 'xi-api-key': KEY() } }).catch(() => null);
      voice = r && r.ok ? String((await r.json().catch(() => ({}))).name || '') : r ? `error ${r.status}` : 'error';
    }
    return res.status(200).json({ configured, voice, index: (await readJSON('audio/index.json')) || {} });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const b = req.body || {};
  if (!/^[a-z]{2}$/.test(String(b.lang)) || !okSec(b.sec)) return res.status(400).json({ error: 'request' });
  const dir = `audio/${b.lang}/${b.sec}`;

  if (b.action === 'plan') {
    const doc = await readJSON(`book/${b.lang}/${b.sec}.json`);
    let blocks = doc && Array.isArray(doc.blocks) ? doc.blocks : null, partial = false;
    if (!blocks && (b.sec === 'intro' || b.sec === 'ch1') && Array.isArray(b.sample)) {
      blocks = b.sample.slice(0, b.sec === 'ch1' ? FREE_CH1 : 200).filter(x => typeof x === 'string' && x.length < 20000).map(x => ['p', x]);
      partial = b.sec === 'ch1';
    }
    if (!blocks || !blocks.length) return res.status(404).json({ error: 'no-text' });
    const parts = plan(blocks, b.sec, String(b.title || '').slice(0, 300));
    return res.status(200).json({ parts, chars: parts.reduce((n, p) => n + p.text.length, 0), partial });
  }
  if (b.action === 'make') {
    if (!configured) return res.status(503).json({ error: 'elevenlabs' });
    const n = Number(b.n), text = String(b.text || '');
    if (!Number.isInteger(n) || n < 0 || n > 999 || !text.trim() || text.length > 9000) return res.status(400).json({ error: 'request' });
    try {
      const mp3 = await speak(text, b.prev, b.next);
      await put(`${dir}/${n}.mp3`, mp3, { access: 'private', contentType: 'audio/mpeg', addRandomSuffix: false, allowOverwrite: true });
      return res.status(200).json({ ok: true, n, bytes: mp3.length });
    } catch (e) {
      return res.status(502).json({ error: e.message, status: e.status || 0, detail: e.detail || '' });
    }
  }
  if (b.action === 'done') {
    const parts = (Array.isArray(b.parts) ? b.parts : []).slice(0, 1000).map(p => ({ n: Number(p.n), first: String(p.first || '').slice(0, 60), free: !!p.free, head: !!p.head }))
      .filter(p => Number.isInteger(p.n));
    if (!parts.length) return res.status(400).json({ error: 'parts' });
    const at = new Date().toISOString();
    await writeJSON(`${dir}.json`, { parts, partial: !!b.partial, at });
    const idx = (await readJSON('audio/index.json')) || {};
    (idx[b.lang] ||= {})[b.sec] = { at, parts: parts.length, partial: !!b.partial };
    await writeJSON('audio/index.json', idx);
    return res.status(200).json({ index: idx });
  }
  if (b.action === 'remove') {
    const blobs = []; let cursor;
    do { const r = await list({ prefix: dir + '/', cursor, limit: 1000 }); blobs.push(...r.blobs); cursor = r.hasMore ? r.cursor : null; } while (cursor);
    await Promise.all([...blobs.map(x => del(x.url).catch(() => {})), del(`${dir}.json`).catch(() => {})]);
    const idx = (await readJSON('audio/index.json')) || {};
    if (idx[b.lang]) { delete idx[b.lang][b.sec]; if (!Object.keys(idx[b.lang]).length) delete idx[b.lang]; }
    await writeJSON('audio/index.json', idx);
    return res.status(200).json({ index: idx });
  }
  res.status(400).json({ error: 'action' });
};
