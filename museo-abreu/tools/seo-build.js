// Writes seo/pages.json: for the home page and every address in seo/paths.json, in each of the app's
// languages, the page's own title, description, heading and section headings, read from the app itself
// as a visitor sees it; plus the yearly events for the search data (api/page.js). Run it after changing
// page texts, with the app served locally:  python3 -m http.server 8765  then  node tools/seo-build.js
// (needs Playwright).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), BASE = process.env.SEO_BASE || 'http://localhost:8765/';
const PATHS = JSON.parse(fs.readFileSync(path.join(ROOT, 'seo/paths.json'), 'utf8'));
const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ar', 'ru'];
(async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ serviceWorkers: 'block' }), p = await ctx.newPage();
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  const out = { pages: {}, events: [] };
  for (const l of LANGS) {
    await p.goto(BASE); await p.evaluate(x => localStorage.setItem('ma.lang', JSON.stringify(x)), l);
    await p.reload(); await p.waitForTimeout(700);
    for (const [key, route] of [['', ''], ...Object.entries(PATHS)]) {
      await p.evaluate(r => { location.hash = '#/' + r; }, route); await p.waitForTimeout(250);
      const m = await p.evaluate(() => {
        const txt = el => el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
        const lead = document.querySelector('main .lead');
        return { title: document.title, desc: (document.querySelector('meta[name="description"]') || {}).content || '',
          h1: txt(document.querySelector('main h1')), lead: txt(lead),
          heads: [...document.querySelectorAll('main h2')].map(txt).filter(Boolean).slice(0, 10) };
      });
      ((out.pages[key] ||= { route, meta: {} }).meta)[l] = m;
    }
    out.events.push(...(await p.evaluate(x => ANNUAL_EVENTS.map(ev => ({ lang: x, id: ev.id, m: ev.annual.m, d: ev.annual.d, time: ev.time,
      days: ev.lastDay || 0, name: L(ev.name), desc: L(ev.desc), price: ev.tiers ? Math.min(...ev.tiers.map(t => t.price)) : ev.price || 0 })), l)));
  }
  const events = {};
  for (const e of out.events) { const x = events[e.id] ||= { id: e.id, m: e.m, d: e.d, time: e.time, days: e.days, price: e.price, name: {}, desc: {} }; x.name[e.lang] = e.name; x.desc[e.lang] = e.desc; }
  out.events = Object.values(events);
  fs.writeFileSync(path.join(ROOT, 'seo/pages.json'), JSON.stringify(out));
  // sitemap.xml: every address with its language versions.
  const SITE = 'https://museo-abreu.vercel.app', u = (p, l) => `${SITE}/${p}${l && l !== 'en' ? (p ? '?' : '?') + 'lang=' + l : ''}`;
  const entries = ['', ...Object.keys(PATHS)].flatMap(p => LANGS.map(l => `  <url><loc>${u(p, l)}</loc>\n${LANGS.map(x => `    <xhtml:link rel="alternate" hreflang="${x}" href="${u(p, x)}"/>`).join('\n')}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${u(p)}"/>\n  </url>`));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);
  console.log('pages', Object.keys(out.pages).length, 'events', out.events.length);
  await b.close();
})();
