// Reading statistics, without names: POST { device, lang, ch, owner } each time a chapter of Ecce Homo is
// opened in the app. One private file per phone and edition (reading/<lang>/<device>.json, the device id is
// random) keeps the furthest chapter, the chapters opened, whether the reader owns the edition and whether
// they started with the free sample. api/admin.js adds them up for the dashboard.
const { readJSON, writeJSON } = require('./_lib');
const SECTIONS = 73; // introduction, 70 chapters, acknowledgements, chronology

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const b = req.body || {}, ch = Number(b.ch);
  if (!/^[0-9a-f]{32}$/.test(String(b.device)) || !/^[a-z]{2}$/.test(String(b.lang)) || !Number.isInteger(ch) || ch < 0 || ch >= SECTIONS)
    return res.status(400).json({ error: 'request' });
  const path = `reading/${b.lang}/${b.device}.json`, owner = !!b.owner;
  const rec = (await readJSON(path)) || { seen: '0'.repeat(SECTIONS), max: 0, owner, startedFree: !owner, first: new Date().toISOString() };
  rec.seen = rec.seen.slice(0, ch) + '1' + rec.seen.slice(ch + 1);
  rec.max = Math.max(rec.max, ch);
  rec.owner = rec.owner || owner;
  rec.at = new Date().toISOString();
  await writeJSON(path, rec);
  res.status(200).json({ ok: true });
};
