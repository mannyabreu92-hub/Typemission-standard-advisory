// POST /api/agent — Museo Abreu AI agents (visitor guide, booking concierge, sales & collectors).
// Body: { messages: [{ role: 'user'|'assistant', content: string }], agent?: 'guide'|'concierge'|'sales', lang?: 'es'|'en'|... }
// Reply: { reply, agent, actions: [{ label, url }] }
//
// Env: ANTHROPIC_API_KEY (required), ANTHROPIC_MODEL (default claude-sonnet-5-5),
//      SITE_URL (default https://museo-abreu.vercel.app), ALLOWED_ORIGINS (comma list, optional).

const { AGENTS, HANDOFF_TOOL, systemFor, routeFirst } = require('./_agents/agents');
const { toolDefs, runTool } = require('./_agents/tools');

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const API = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '') + '/v1/messages';
const MAX_TURNS = 20;       // history kept per request
const MAX_CHARS = 2000;     // per visitor message
const MAX_STEPS = 6;        // tool-use iterations per reply
const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ru', 'pt', 'ja', 'ar'];

// Light per-IP rate limit (per warm instance). For stronger limits use Vercel KV/Upstash.
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000, max = 40;
  const arr = (hits.get(ip) || []).filter(t => now - t < win);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > max;
}

function cors(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const origin = req.headers.origin;
  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

async function claude(body) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j.error && j.error.message) || `Anthropic HTTP ${r.status}`);
  return j;
}

// Buttons for the widget, taken from tool results (real links only).
function actionsFrom(result, out) {
  if (!result || typeof result !== 'object') return;
  const add = (label, url) => { if (url && !out.some(a => a.url === url)) out.push({ label, url }); };
  add(result.provider === 'Whop' ? 'checkout' : 'pay', result.checkout_url || result.pay_online_url);
  add('whatsapp', result.whatsapp_url);
}

async function respond({ messages, agent, lang }) {
  let current = AGENTS[agent] ? agent : routeFirst(messages.filter(m => m.role === 'user').slice(-1)[0].content);
  const convo = messages.map(m => ({ role: m.role, content: m.content }));
  const actions = [];
  const handoffs = [];

  for (let step = 0; step < MAX_STEPS; step++) {
    const a = AGENTS[current];
    const res = await claude({
      model: MODEL, max_tokens: 900, temperature: 0.4,
      system: systemFor(current, lang),
      tools: [...toolDefs(a.tools), HANDOFF_TOOL],
      messages: convo,
    });
    const uses = (res.content || []).filter(b => b.type === 'tool_use');
    if (res.stop_reason !== 'tool_use' || !uses.length) {
      const reply = (res.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
      return { reply, agent: current, actions, handoffs };
    }
    convo.push({ role: 'assistant', content: res.content });
    const results = [];
    let switched = null;
    for (const u of uses) {
      if (u.name === 'handoff' && AGENTS[u.input.to] && u.input.to !== current) {
        switched = u.input.to; handoffs.push(u.input);
        results.push({ type: 'tool_result', tool_use_id: u.id, content: `Handed off to ${u.input.to}. Reason: ${u.input.reason}` });
        continue;
      }
      if (u.name === 'handoff') { results.push({ type: 'tool_result', tool_use_id: u.id, content: 'You are already the right specialist; continue.' }); continue; }
      const out = await runTool(u.name, u.input, { lang });
      actionsFrom(out, actions);
      results.push({ type: 'tool_result', tool_use_id: u.id, content: JSON.stringify(out).slice(0, 12000) });
    }
    convo.push({ role: 'user', content: results });
    if (switched) {
      // The new specialist sees the same history (tool blocks flattened, since its tool set differs).
      current = switched;
      const flat = [];
      for (const m of convo) {
        const text = typeof m.content === 'string' ? m.content
          : m.content.map(b => b.type === 'text' ? b.text : b.type === 'tool_result' ? `[result] ${typeof b.content === 'string' ? b.content : ''}` : b.type === 'tool_use' ? `[called ${b.name} ${JSON.stringify(b.input)}]` : '').filter(Boolean).join('\n');
        if (!text) continue;
        if (flat.length && flat[flat.length - 1].role === m.role) flat[flat.length - 1].content += '\n' + text;
        else flat.push({ role: m.role, content: text });
      }
      if (flat[flat.length - 1].role !== 'user') flat.push({ role: 'user', content: '(continue helping me)' });
      convo.length = 0; convo.push(...flat);
    }
  }
  return { reply: '', agent: current, actions, handoffs };
}

module.exports = async (req, res) => {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'not_configured' });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  if (limited(ip)) return res.status(429).json({ error: 'rate_limited' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const raw = body && Array.isArray(body.messages) ? body.messages : null;
  if (!raw || !raw.length) return res.status(400).json({ error: 'messages' });

  // Keep clean alternating text turns that start and end with the visitor.
  let messages = raw
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    .slice(-MAX_TURNS);
  while (messages.length && messages[0].role !== 'user') messages.shift();
  messages = messages.reduce((acc, m) => {
    if (acc.length && acc[acc.length - 1].role === m.role) acc[acc.length - 1].content += '\n' + m.content; else acc.push(m);
    return acc;
  }, []);
  if (!messages.length || messages[messages.length - 1].role !== 'user') return res.status(400).json({ error: 'messages' });

  const lang = LANGS.includes(body.lang) ? body.lang : 'es';
  try {
    const out = await respond({ messages, agent: body.agent, lang });
    return res.status(200).json(out);
  } catch (e) {
    console.error('agent error', e.message);
    return res.status(502).json({ error: 'upstream' });
  }
};

module.exports.respond = respond;
