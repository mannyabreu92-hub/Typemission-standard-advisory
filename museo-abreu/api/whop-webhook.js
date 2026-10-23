// Whop calls this after payments and membership changes (Whop › Developer › Webhooks, URL
// https://museo-abreu.vercel.app/api/whop-webhook). It records what each buyer owns so the app
// can unlock it. Needs WHOP_WEBHOOK_SECRET (the webhook's secret) in the Vercel project.
const { verifyWebhook, findEmail, findProductKey, emailHash, readJSON, writeJSON } = require('./_lib');

async function rawBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
  return Buffer.concat(chunks).toString('utf8');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const raw = await rawBody(req);
  if (!verifyWebhook(raw, req.headers, process.env.WHOP_WEBHOOK_SECRET)) return res.status(401).json({ error: 'bad signature' });

  const event = JSON.parse(raw);
  const type = String(event.type || event.action || '');
  const id = req.headers['webhook-id'];
  // The museum's private log of every event (Vercel › Storage › museo-abreu-purchases › events/).
  await writeJSON(`events/${new Date().toISOString().slice(0, 10)}/${id}.json`, event);

  const email = findEmail(event.data || event), key = findProductKey(event.data || event);
  if (!email || !key) return res.status(200).json({ ok: true, recorded: false });

  // Access starts with a successful payment or a membership turning valid, and ends when a
  // membership turns invalid, is cancelled or refunded.
  // Only money actually received (or an active membership) unlocks; "created" / "pending" events do not.
  const ends = /invalid|deactivat|cancel|refund|expire|dispute/i.test(type);
  const starts = !ends && /payment\.succeeded|went_valid|membership\.activated|\.paid$|completed/i.test(type);
  if (!ends && !starts) return res.status(200).json({ ok: true, recorded: false });

  const path = `purchases/${emailHash(email)}.json`;
  const rec = (await readJSON(path)) || { items: {} };
  if (rec.seen && rec.seen.includes(id)) return res.status(200).json({ ok: true, duplicate: true });
  rec.items[key] = { active: !ends, type, at: new Date().toISOString() };
  rec.seen = [...(rec.seen || []), id].slice(-50); // Whop may deliver an event more than once
  await writeJSON(path, rec);
  res.status(200).json({ ok: true, recorded: true });
};
