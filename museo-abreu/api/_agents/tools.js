// Tools the agents can call. They only read the site's catalogue or prepare a hand-off
// (checkout link, WhatsApp message, lead in the museum's inbox). No payment is taken here.

const { loadSiteData, L, SITE_URL } = require('./knowledge');

const TZ = 'America/Santo_Domingo';
const DAY = 86400000;

// Today's date in Punta Cana as YYYY-MM-DD.
const todayDR = () => new Date().toLocaleDateString('en-CA', { timeZone: TZ });
const weekday = iso => new Date(iso + 'T12:00:00Z').getUTCDay();

function waLink(text) {
  const n = (loadSiteData().BOOKING || {}).whatsapp || '18098409588';
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}

function findExperience(id) {
  return (loadSiteData().EXPERIENCES || []).find(e => e.id === id);
}

/* ---------------- tool implementations ---------------- */

function check_availability({ experience_id, from_date, days = 14, guide_language }) {
  const d = loadSiteData();
  const exp = findExperience(experience_id);
  if (!exp) return { error: `Unknown experience "${experience_id}". Valid: ${(d.EXPERIENCES || []).map(e => e.id).join(', ')}` };
  if (exp.id === 'private') return { experience: L(exp.name), note: 'Private tours are arranged on request: collect date, group size and language, then use create_booking_request.' };
  const slots = (d.SCHEDULE || {})[exp.id] || [];
  const start = from_date && /^\d{4}-\d{2}-\d{2}$/.test(from_date) && from_date >= todayDR() ? from_date : todayDR();
  const n = Math.min(Math.max(+days || 14, 1), 60);
  const out = [];
  for (let i = 0; i < n; i++) {
    const date = new Date(Date.parse(start + 'T12:00:00Z') + i * DAY).toISOString().slice(0, 10);
    const wd = weekday(date);
    for (const s of slots) {
      if (s.days && !s.days.includes(wd)) continue;
      if (guide_language && !s.langs.includes(guide_language)) continue;
      out.push({ date, weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][wd], time: s.time, guide_languages: s.langs });
    }
  }
  return {
    experience: L(exp.name), price_usd: exp.price, minutes: exp.minutes, capacity: exp.capacity,
    note: 'Sample schedule until the museum confirms; the team confirms the final slot.' + (exp.id === 'artist' ? ' Only on dates with the artist’s confirmed participation.' : ''),
    slots: out.slice(0, 40),
  };
}

function search_catalogue({ query = '', kind = 'all' }) {
  const d = loadSiteData();
  const q = String(query).toLowerCase().trim();
  const hit = s => !q || JSON.stringify(s).toLowerCase().includes(q);
  const res = {};
  if (kind === 'all' || kind === 'works') res.works = (d.WORKS || []).filter(hit).map(w => ({ id: w.id, title: L(w.title), spec: w.spec && w.spec.en, sold: !!w.sold, image: `${SITE_URL()}/${w.img}` }));
  if (kind === 'all' || kind === 'events') res.events = (d.EVENTS || []).filter(hit).map(e => ({ id: e.id, name: L(e.name), annual: e.annual, date: e.date, time: e.time, price_usd: e.price, vip: !!e.vip, desc: L(e.desc) }));
  if (kind === 'all' || kind === 'experiences') res.experiences = (d.EXPERIENCES || []).filter(hit).map(e => ({ id: e.id, name: L(e.name), price_usd: e.price, minutes: e.minutes, desc: L(e.desc) }));
  if (kind === 'all' || kind === 'exhibitions') res.exhibitions = (d.EXHIBITIONS || []).filter(hit).slice(0, 15);
  if (kind === 'all' || kind === 'timeline') res.timeline = (d.TIMELINE || []).filter(hit).slice(0, 15);
  return res;
}

// Next date of each event (annual events roll to next year once passed).
function upcoming_events() {
  const d = loadSiteData();
  const today = todayDR();
  const y = +today.slice(0, 4);
  return (d.EVENTS || []).map(e => {
    let next = e.date || null;
    if (e.annual) {
      const mk = yr => `${yr}-${String(e.annual.m).padStart(2, '0')}-${String(e.annual.d).padStart(2, '0')}`;
      next = mk(y) >= today ? mk(y) : mk(y + 1);
    }
    return { id: e.id, name: L(e.name), next_date: next || 'to be announced', time: e.time, price_usd: e.price ?? 'TBC', vip: !!e.vip, rsvp_page: `${SITE_URL()}/#/eventos` };
  }).sort((a, b) => String(a.next_date).localeCompare(String(b.next_date)));
}

// Checkout link for a product sold online (Whop) or a booking link (Bókun), else a WhatsApp request.
function get_checkout_link({ product, language }) {
  const B = loadSiteData().BOOKING || {};
  const whop = B.whop || {}, links = B.links || {};
  let key = product;
  if (product === 'book-digital') key = 'book-' + (language || 'en');
  if (product === 'book-print') key = 'book-print-' + (language || 'es');
  const url = whop[key] || links[key];
  if (url) return { product: key, provider: whop[key] ? 'Whop' : B.provider || 'Bókun', checkout_url: url };
  const labels = { pro: 'the Museo Abreu Pro membership', 'book-print': 'a printed copy of Ecce Homo', 'book-digital': 'the digital edition of Ecce Homo' };
  const text = `Hello, I would like to buy ${labels[product] || product}${language ? ' (' + language + ')' : ''}.`;
  return { product: key, provider: 'WhatsApp', note: 'No online checkout yet for this item; the team completes it on WhatsApp.', whatsapp_url: waLink(text) };
}

// Sends a lead to the museum's existing inbox: the same handler as the contact form (api/contact.js),
// so it is stored privately and listed under Messages in the staff dashboard.
async function sendToInbox({ name, email, phone, topic, message, lang }) {
  try {
    const contact = require('../contact.js');
    let code = 0;
    const res = { status(c) { code = c; return res; }, json() { return res; }, end() { return res; } };
    await contact({ method: 'POST', body: { name, email: email || '', phone: phone || '', topic, message: message.slice(0, 3000), lang: lang || 'es', website: '' } }, res);
    return code === 200;
  } catch (e) { console.error('inbox', e.message); return false; }
}

async function create_booking_request(a, ctx) {
  const exp = findExperience(a.experience_id);
  if (!exp) return { error: 'Unknown experience_id' };
  if (!a.name || !(a.email || a.phone)) return { error: 'Need the visitor’s name and an email or WhatsApp number first.' };
  const people = Math.max(1, +a.people || 1);
  const total = exp.price != null ? exp.price * people : null;
  const summary = `${L(exp.name)} · ${a.date || 'date TBC'} ${a.time || ''} · ${people} pers. · guide: ${a.guide_language || 'any'}` +
    `${total != null ? ` · USD ${total}` : ' · quote requested'}${a.hotel ? ' · hotel: ' + a.hotel : ''}${a.notes ? ' · notes: ' + a.notes : ''}`;
  const bokun = ((loadSiteData().BOOKING || {}).links || {})[exp.id];
  const saved = await sendToInbox({ name: a.name, email: a.email, phone: a.phone, topic: 'visit', message: `[Booking concierge] ${summary}`, lang: ctx.lang });
  return {
    status: 'request_created', summary, total_usd: total, saved_to_museum_inbox: saved,
    pay_online_url: bokun || null,
    whatsapp_url: waLink(`Hello, I am ${a.name}. I would like to book: ${summary}.`),
    next_step: bokun ? 'Visitor pays online at pay_online_url; the ticket with QR arrives by email.' : 'Visitor taps the WhatsApp link to confirm; the team replies with confirmation and payment.',
  };
}

async function capture_lead(a, ctx) {
  if (!a.name || !(a.email || a.phone)) return { error: 'Need the person’s name and an email or WhatsApp number first.' };
  const topic = ['collect', 'press', 'visit', 'general'].includes(a.topic) ? a.topic : 'collect';
  const msg = `[Sales agent · ${a.interest || 'general'}] ${a.summary || ''}${a.works && a.works.length ? ' · works: ' + a.works.join(', ') : ''}` +
    `${a.budget ? ' · budget: ' + a.budget : ''}${a.country ? ' · country: ' + a.country : ''}`;
  const saved = await sendToInbox({ name: a.name, email: a.email, phone: a.phone, topic, message: msg, lang: ctx.lang });
  return {
    status: 'lead_saved', saved_to_museum_inbox: saved,
    whatsapp_url: waLink(`Hello, I am ${a.name}. ${a.summary || 'I would like to speak with the Collectors’ Circle.'}`),
    next_step: 'A member of the museum team (Collectors’ Circle advisor) follows up personally.',
  };
}

/* ---------------- schemas (Anthropic tool format) ---------------- */

const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ru', 'pt', 'ja'];
const S = {
  check_availability: {
    description: 'List upcoming time slots for a tour or class from the museum schedule, optionally filtered by guide language.',
    input_schema: { type: 'object', properties: {
      experience_id: { type: 'string', description: 'vip | artist | combo | private | painting-class | sculpture-class (couple if enabled)' },
      from_date: { type: 'string', description: 'YYYY-MM-DD, defaults to today in Punta Cana' },
      days: { type: 'integer', description: 'How many days to look ahead (1-60)' },
      guide_language: { type: 'string', enum: LANGS },
    }, required: ['experience_id'] },
  },
  search_catalogue: {
    description: 'Search the museum catalogue: works, events, experiences, exhibitions, and the artist timeline.',
    input_schema: { type: 'object', properties: {
      query: { type: 'string', description: 'Keyword(s); empty returns everything in that kind' },
      kind: { type: 'string', enum: ['all', 'works', 'events', 'experiences', 'exhibitions', 'timeline'] },
    } },
  },
  upcoming_events: { description: 'Upcoming museum events with their next date, time and ticket price.', input_schema: { type: 'object', properties: {} } },
  get_checkout_link: {
    description: 'Get the real checkout link for something sold online (Pro membership, book editions) or a WhatsApp purchase link when there is no online checkout yet.',
    input_schema: { type: 'object', properties: {
      product: { type: 'string', description: 'pro | book-digital | book-print | fund-<lang> | sponsor-25 | sponsor-50 | sponsor-100 | an experience id' },
      language: { type: 'string', enum: LANGS, description: 'Edition language for books' },
    }, required: ['product'] },
  },
  create_booking_request: {
    description: 'Create a tour/class booking request once the visitor confirmed experience, date, time, people, guide language, name and email or WhatsApp. Saves it to the museum inbox and returns the payment or WhatsApp confirmation link.',
    input_schema: { type: 'object', properties: {
      experience_id: { type: 'string' }, date: { type: 'string', description: 'YYYY-MM-DD' }, time: { type: 'string', description: 'HH:MM' },
      people: { type: 'integer' }, guide_language: { type: 'string', enum: LANGS },
      name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string', description: 'WhatsApp with country code' },
      hotel: { type: 'string', description: 'Hotel in Bávaro/Punta Cana, if shared' }, notes: { type: 'string' },
    }, required: ['experience_id', 'name'] },
  },
  capture_lead: {
    description: 'Save a qualified sales lead (collector interest in a work, commission, private viewing/dinner, group or corporate purchase, press) to the museum inbox for personal follow-up.',
    input_schema: { type: 'object', properties: {
      name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' },
      interest: { type: 'string', enum: ['work', 'commission', 'private-viewing', 'private-dinner', 'circle-membership', 'auction', 'book-bulk', 'corporate', 'press', 'other'] },
      works: { type: 'array', items: { type: 'string' }, description: 'Work ids of interest' },
      budget: { type: 'string' }, country: { type: 'string' },
      topic: { type: 'string', enum: ['collect', 'press', 'visit', 'general'] },
      summary: { type: 'string', description: 'One or two sentences the advisor needs to follow up' },
    }, required: ['name', 'summary'] },
  },
};

const IMPL = { check_availability, search_catalogue, upcoming_events, get_checkout_link, create_booking_request, capture_lead };

const toolDefs = names => names.map(name => ({ name, ...S[name] }));

async function runTool(name, input, ctx) {
  if (!IMPL[name]) return { error: `Unknown tool ${name}` };
  try { return await IMPL[name](input || {}, ctx); } catch (e) { return { error: String(e.message || e) }; }
}

module.exports = { toolDefs, runTool, todayDR };
