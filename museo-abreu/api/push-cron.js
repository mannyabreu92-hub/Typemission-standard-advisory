// Runs once a day (vercel.json › crons, 14:00 UTC = 10:00 in Punta Cana): sends tomorrow's event
// reminders and deletes each one once sent, so a second call the same day sends nothing again.
// If CRON_SECRET is set in Vercel, Vercel sends it and other callers are turned away.
const webpush = require('web-push');
const { list, del } = require('@vercel/blob');
const { readJSON, writeJSON } = require('./_lib');
const { vapid, useKeys, sendLotAlerts } = require('./push');
const { AUCTION, lotOpen, lotCloses } = require('../auction-config.js');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' });
  // Never at night in Punta Cana, whoever calls.
  const hour = Number(new Date().toLocaleString('en-US', { timeZone: 'America/Santo_Domingo', hour: 'numeric', hourCycle: 'h23' }));
  if (hour < 9 || hour > 20) return res.status(200).json({ skipped: 'night' });
  const now = new Date(), tomorrow = new Date(now.getTime() + 864e5).toLocaleDateString('en-CA', { timeZone: 'America/Santo_Domingo' });

  // Auction alerts: "bidding is open" once per piece, and "last day" when a piece closes within 24 hours.
  const lots = { open: 0, closing: 0 };
  for (const lot of AUCTION.lots) {
    if (!lotOpen(lot)) continue;
    const closes = lotCloses(lot), key = closes.replace(/\D/g, '');
    let justOpened = false;
    if (!(await readJSON(`push/sent/open-${lot.id}-${key}.json`))) {
      lots.open += await sendLotAlerts(lot.id, 'open', { when: closes });
      await writeJSON(`push/sent/open-${lot.id}-${key}.json`, { at: now.toISOString() });
      justOpened = true; // its message already gives the closing time: no second alert the same day
    }
    if (Date.parse(closes) - now.getTime() <= 864e5 && !(await readJSON(`push/sent/closing-${lot.id}-${key}.json`))) {
      if (!justOpened) lots.closing += await sendLotAlerts(lot.id, 'closing', { when: closes });
      await writeJSON(`push/sent/closing-${lot.id}-${key}.json`, { at: now.toISOString() });
    }
  }

  const blobs = []; let cursor;
  do { const r = await list({ prefix: `push/subs/${tomorrow}/`, cursor, limit: 1000 }); blobs.push(...r.blobs); cursor = r.hasMore ? r.cursor : null; } while (cursor);
  if (!blobs.length) return res.status(200).json({ date: tomorrow, sent: 0, failed: 0, lots });
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
  res.status(200).json({ date: tomorrow, sent, failed, lots });
};
