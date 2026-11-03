// Public event photos. GET ?event=<id> → { date, photos: [{ id, w, h }] } for the most recent date
// with photos; ?event=<id>&date=<date> → that date's photos; ?event=<id>&date=<date>&id=<photo> → the JPEG. Photos are uploaded from the dashboard
// (api/admin.js, photo-add) into the private Blob store and served only through here.
const { list, get } = require('@vercel/blob');
const { readJSON } = require('./_lib');

module.exports = async (req, res) => {
  const event = String(req.query.event || ''), date = String(req.query.date || ''), id = String(req.query.id || '');
  if (!/^[a-z0-9-]+$/.test(event)) return res.status(400).json({ error: 'event' });
  if (id) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^[0-9a-f]{16}$/.test(id)) return res.status(400).json({ error: 'photo' });
    const r = await get(`photos/${event}/${date}/${id}.jpg`, { access: 'private' }).catch(() => null);
    if (!r || r.statusCode !== 200) return res.status(404).end();
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(Buffer.from(await new Response(r.stream).arrayBuffer()));
  }
  if (date) { // one date's photos (the dashboard's photo page)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'date' });
    const doc = await readJSON(`photos/${event}/${date}.json`);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ date, photos: ((doc && doc.photos) || []).map(({ id, w, h }) => ({ id, w, h })) });
  }
  const { blobs } = await list({ prefix: `photos/${event}/`, limit: 1000 });
  const dates = blobs.map(b => b.pathname.match(/^photos\/[a-z0-9-]+\/(\d{4}-\d{2}-\d{2})\.json$/)).filter(Boolean).map(m => m[1]).sort().reverse();
  res.setHeader('Cache-Control', 'public, max-age=60');
  for (const d of dates) {
    const doc = await readJSON(`photos/${event}/${d}.json`);
    if (doc && doc.photos && doc.photos.length) return res.status(200).json({ date: d, photos: doc.photos.map(({ id, w, h }) => ({ id, w, h })) });
  }
  res.status(200).json({ date: null, photos: [] });
};
