// Runs once a day (vercel.json › crons, 14:00 UTC = 10:00 in Punta Cana): sends tomorrow's event
// reminders and deletes each one once sent, so a second call the same day sends nothing again.
// If CRON_SECRET is set in Vercel, Vercel sends it and other callers are turned away.
const webpush = require('web-push');
const { list, del } = require('@vercel/blob');
const { readJSON } = require('./_lib');
const { vapid, useKeys } = require('./push');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' });
  // Never at night in Punta Cana, whoever calls.
  const hour = Number(new Date().toLocaleString('en-US', { timeZone: 'America/Santo_Domingo', hour: 'numeric', hourCycle: 'h23' }));
  if (hour < 9 || hour > 20) return res.status(200).json({ skipped: 'night' });
  const now = new Date(), tomorrow = new Date(now.getTime() + 864e5).toLocaleDateString('en-CA', { timeZone: 'America/Santo_Domingo' });

  const blobs = []; let cursor;
  do { const r = await list({ prefix: `push/subs/${tomorrow}/`, cursor, limit: 1000 }); blobs.push(...r.blobs); cursor = r.hasMore ? r.cursor : null; } while (cursor);
  if (!blobs.length) return res.status(200).json({ date: tomorrow, sent: 0, failed: 0 });
  useKeys(await vapid());
  let sent = 0, failed = 0;
  for (const b of blobs) {
    const rec = await readJSON(b.pathname);
    if (rec) {
      await webpush.sendNotification(rec.sub, JSON.stringify(rec.msg), { TTL: 12 * 3600 })
        .then(() => { sent++; }, e => { failed++; console.log('push failed', e.statusCode || e.message); });
    }
    await del(b.pathname).catch(() => {});
  }
  res.status(200).json({ date: tomorrow, sent, failed });
};
