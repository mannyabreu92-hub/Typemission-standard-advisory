// Museo Abreu — prototype single-page app.
// All persistence is local to the browser (localStorage). In production, tickets,
// purchases and reading access live on the server and are checked there.

const store = {
  get(k, d) { try { const v = localStorage.getItem('ma.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('ma.' + k, JSON.stringify(v)); } catch { /* private mode: keep in memory only */ } },
};

const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ar'];
// German, Italian and Arabic live in lang/<code>.js, loaded when chosen: their UI strings go
// into I18N, and their content into TR as English text → translation.
const LAZY_LANGS = ['de', 'it', 'ar'];
const TR = {};
const browserLang = (navigator.language || 'es').slice(0, 2).toLowerCase();
let lang = store.get('lang', LANGS.includes(browserLang) ? browserLang : 'en');
if (!LANGS.includes(lang)) lang = 'es';
let tickets = store.get('tickets', []);
let purchases = store.get('purchases', []);
let reading = store.get('reading', { fontSize: 1.15, last: null, bookmarks: [] });
let profile = store.get('profile', { name: '', email: '' });
let bk = freshBooking();
let holdTimer = null;

const main = document.getElementById('main');
const $ = (s, el = document) => el.querySelector(s);

// French typography: keep the space before : ; ? ! » and after «, and in "20 h", from breaking.
const frSpaces = s => s.replace(/ ([:;?!»])/g, '\u00a0$1').replace(/« /g, '«\u00a0').replace(/(\d) h\b/g, '$1\u00a0h');
const typeset = v => lang !== 'fr' ? v : typeof v === 'string' ? frSpaces(v) : Array.isArray(v) ? v.map(x => typeof x === 'string' ? frSpaces(x) : x) : v;

function t(key, vars) {
  let s = (I18N[lang] && I18N[lang][key]) ?? (lang !== 'es' ? I18N.en[key] : undefined) ?? I18N.es[key] ?? key;
  if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
  return typeset(s);
}
// English text in the current language through TR (strings, lists and blocks alike); unchanged if none.
const tr = v => !TR[lang] ? v : typeof v === 'string' ? TR[lang][v] ?? v : Array.isArray(v) ? v.map(tr)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, tr(x)])) : v;
// Other languages fall back to English (translated through TR) where a text has no version of its own.
const L = obj => typeset(obj[lang] ?? (lang !== 'es' && obj.en !== undefined ? tr(obj.en) : obj.es));
const expoPlace = e => (lang === 'es' && e.pes) || (lang === 'fr' && e.pfr) || tr(e.p);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const usd = n => 'US$' + n.toLocaleString('en-US');
const pend = () => `<span class="pending">${t('pending')}</span>`;
const save = () => { store.set('tickets', tickets); store.set('purchases', purchases); store.set('reading', reading); store.set('profile', profile); };

function toast(msg) {
  const el = $('.toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.h);
  toast.h = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ---------- Dates in Punta Cana local time ---------- */

function todayPC() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return p; // YYYY-MM-DD
}
function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n, 12)).toISOString().slice(0, 10);
}
function dow(iso) { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay(); }
function fmtDate(iso, opts = { weekday: 'long', day: 'numeric', month: 'long' }) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat({ es: 'es-DO', en: 'en-US', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', ar: 'ar-u-nu-latn' }[lang], { ...opts, timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d, 12)));
}

/* ---------- Availability ---------- */

function hash(s) { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }

// VIP and combo share the same physical tour, so they share capacity.
const poolOf = expId => (expId === 'combo' || expId === 'couple' ? 'vip' : expId);

function sessionsFor(expId, iso) {
  if (dow(iso) === 1) return []; // closed Mondays
  const exp = EXPERIENCES.find(e => e.id === expId);
  return (SCHEDULE[expId] || [])
    .filter(s => !s.days || s.days.includes(dow(iso)))
    .map(s => {
      const pool = poolOf(expId);
      const h = hash(pool + iso + s.time);
      const seeded = h % 9 === 0 ? exp.capacity : h % (exp.capacity - 2);
      const booked = tickets.filter(tk => poolOf(tk.exp) === pool && tk.date === iso && tk.time === s.time && tk.status !== 'refunded')
        .reduce((a, tk) => a + (tk.seats || tk.qty), 0);
      return { ...s, left: Math.max(0, exp.capacity - seeded - booked) };
    });
}

/* ---------- Router ---------- */

const routes = {
  '': pageHome, artista: pageArtist, psico: pagePsico, visita: pageVisit,
  biblioteca: pageLibrary, leer: pageReader, cuenta: pageAccount, personal: pageStaff,
};
if (typeof EXTRA_ROUTES !== 'undefined') Object.assign(routes, EXTRA_ROUTES);

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  const name = routes[parts[0]] ? parts[0] : '';
  clearInterval(holdTimer);
  main.innerHTML = (typeof sectionNav === 'function' ? sectionNav(name) : '') + routes[name](...parts.slice(1));
  const section = (typeof ROUTE_SECTION !== 'undefined' && ROUTE_SECTION[name]) || name;
  document.querySelectorAll('[data-route]').forEach(a => {
    a.classList.toggle('active', a.dataset.route === section);
    if (a.dataset.route === section) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  afterRender(name);
  trackPage();
  // A last path part naming an element on the page (e.g. #/biblioteca/top100) scrolls to it.
  const anchor = parts.length > 1 && /^[a-z][\w-]*$/.test(parts.at(-1)) && document.getElementById(parts.at(-1));
  if (anchor) requestAnimationFrame(() => anchor.scrollIntoView());
}

// Analytics: one page view per route the visitor opens (re-renders for a language change don't count).
let lastTracked = null;
function trackPage() {
  const path = '/' + location.hash.replace(/^#\/?/, '');
  if (path === lastTracked) return;
  lastTracked = path;
  window.va('pageview', { route: path, path });
}
function trackEvent(name, data) { window.va('event', { name, data: { page: lastTracked || '/', ...data } }); }
// Taps on WhatsApp, booking and checkout links rendered as <a>.
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]'); if (!a) return;
  const href = a.href;
  if (/wa\.me\//.test(href)) trackEvent('WhatsApp', { button: (a.textContent || '').trim().slice(0, 60) });
  else if (Object.values(BOOKING.links || {}).includes(href) || Object.values(BOOKING.whop || {}).includes(href)) trackEvent('Checkout', { url: href });
});

function afterRender(name) {
  renderQRs();
  // Keep the current tab of the artist section menu in view on narrow screens.
  const strip = $('.section-nav .tabs'), sel = strip && strip.querySelector('[aria-current="page"]');
  if (sel) strip.scrollLeft = sel.offsetLeft - (strip.clientWidth - sel.clientWidth) / 2;
  if (name === 'visita' && bk.step === 4) startHoldTimer();
  if (name === 'leer') {
    const txt = $('.reader-text');
    if (txt) txt.style.fontSize = reading.fontSize + 'rem';
  }
}

function go(hash) {
  if (location.hash === hash) route(); else location.hash = hash;
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

/* ---------- Pages ---------- */

// A different quote from the book each day (Punta Cana date), in the book's order.
function quoteOfTheDay() {
  const today = todayPC();
  const es = lang === 'es', list = es ? DAILY_QUOTES_ES : DAILY_QUOTES;
  const q = list[Math.floor(Date.parse(today) / 864e5) % list.length];
  const where = q.ch ? t('chapterN', { n: TOC_EN.nums[q.ch - 1] }) : L(CHAPTERS[0].title);
  return `<p class="eyebrow">${t('quoteOfDay')} · ${fmtDate(today, { day: 'numeric', month: 'long' })}</p>
      <figure class="hero-quote"><blockquote lang="${es ? 'es' : 'en'}" dir="ltr">“${esc(q.q)}”</blockquote>
        <figcaption>— Oscar Abreu · <cite>Ecce Homo</cite>, ${where}${lang !== 'en' && !es ? ` · ${t('englishEdition')}` : ''}</figcaption></figure>`;
}

function pageHome() {
  return `
  <section class="hero">
    <div class="hero-art"><img src="img/escaping-being.jpg" srcset="img/escaping-being-800.jpg 800w, img/escaping-being.jpg 1400w" sizes="(max-width: 700px) 100vw, 50vw" alt="" fetchpriority="high"></div>
    <div class="hero-inner">
      <h1 class="visually-hidden">${t('homeTitle')}</h1>
      ${quoteOfTheDay()}
      <p class="lead" style="margin-top:1rem">${t('homeLead')}</p>
      <div class="btn-row">
        <a class="btn primary" href="#/visita">${t('ctaTour')}</a>
        <a class="btn" href="#/biblioteca">${t('ctaBook')}</a>
      </div>
    </div>
  </section>
  <div class="wrap">
    <section class="section grid three">
      <a class="card" href="#/artista" style="text-decoration:none"><p class="eyebrow">01</p><h2 class="h3">${t('homeDiscover')}</h2><p class="muted">${t('homeDiscoverText')}</p></a>
      <a class="card" href="#/visita" style="text-decoration:none"><p class="eyebrow">02</p><h2 class="h3">${t('homeReserve')}</h2><p class="muted">${t('homeReserveText')}</p></a>
      <a class="card" href="#/biblioteca" style="text-decoration:none"><p class="eyebrow">03</p><h2 class="h3">${t('homeRead')}</h2><p class="muted">${t('homeReadText')}</p></a>
    </section>
    <section class="section">
      <p class="eyebrow">${t('navPsico')}</p>
      <div class="grid two" style="align-items:center">
        <div>
          <h2>${t('layersTitle')}</h2>
          <p class="lead">${t('psicoLead')}</p>
          <div class="btn-row"><a class="btn" href="#/psico">${t('psicoIntro')} <span class="arr">→</span></a></div>
        </div>
        <a class="layers" href="#/psico" style="justify-self:center;width:100%" aria-label="${t('layersTitle')}"><img src="${LAYER_WORKS[0].img}" alt="" loading="lazy"></a>
      </div>
    </section>
    ${typeof homeHighlights === 'function' ? homeHighlights() : ''}
    ${typeof homeExtras === 'function' ? homeExtras() : ''}
    <section class="section">
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem">
        <h2>${t('homeWorks')}</h2><a href="#/artista">${t('seeAll')}</a>
      </div>
      <div class="grid four">${WORKS.slice(0, 4).map(workCard).join('')}</div>
      <p class="muted" style="margin-top:1rem">${t('homeNoAccount')}</p>
    </section>
  </div>`;
}

const workImg = w => w.img
  ? `<img src="${w.img}" alt="${esc(L(w.title))}, Oscar Abreu" loading="lazy">`
  : artSVG(w.seed, L(w.title));

function workCard(w) {
  return `<button type="button" class="work" data-action="work" data-id="${w.id}">
    <div class="art">${workImg(w)}</div>
    <div class="meta"><strong>${L(w.title)}</strong><span class="muted">${t('year')}: ${w.spec ? L(w.spec)[0] : t('pending')}</span>${w.sold ? ` <span class="chip sold">${t('sold')}</span>` : ''}</div>
  </button>`;
}

function pageArtist() {
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('artistEyebrow')}</p>
      <h1>Oscar Abreu</h1>
      <p class="lead" style="margin-top:.8rem">${t('artistLead')}</p>
    </section>
    <section class="section grid two">
      <div>
        <h2>${t('welcomeVideo')}</h2>
        <div class="video-ph"><p>▶<br>${t('videoPending')}</p></div>
      </div>
      <div>
        <h2>${t('bioShort')}</h2>
        <p>${esc(L(BIO_SITE).intro)}</p>
        <p class="muted" style="margin-top:.6rem">${t('sourceLabel')}: ${BIO_SITE.source}</p>
        <details style="margin-top:1rem"><summary><strong>${t('bioLong')}</strong></summary><p style="margin-top:.6rem">${t('bioPlaceholder')}</p><p>${t('bioLongText')}</p>
        <p class="muted">${t('sourceNote')}</p></details>
      </div>
    </section>
    <section class="section grid two">
      <div>
        <h2>${t('timeline')}</h2>
        <ol class="timeline">${TIMELINE.map(e => `<li><strong>${e.y}</strong><br><span class="muted">${L(e)}</span></li>`).join('')}</ol>
      </div>
      <div>
        <h2>${t('exhibitions')}</h2>
        <ul class="timeline">${EXHIBITIONS.map(e => `<li><strong><i>${e.t}</i></strong><br><span class="muted">${expoPlace(e)} · ${e.y}</span></li>`).join('')}</ul>
        <p style="margin-top:.5rem">${esc(L(BIO_SITE).circuit)}</p>
        <div class="btn-row"><a class="btn" href="#/exposiciones">${t('navExhibits')} · ${t('catalogueTitle')}</a></div>
      </div>
    </section>
    <section class="section grid two">
      <div>
        <h2>${t('recognitionTitle')}</h2>
        ${L(BIO_SITE).recognition.map(p => `<p>${esc(p)}</p>`).join('')}
      </div>
      <div>
        <h2>${t('legacyTitle')}</h2>
        <p>${esc(L(BIO_SITE).legacy)}</p>
      </div>
    </section>
    <section class="section">
      <h2>${t('quotesTitle')}</h2>
      <div class="grid two">${QUOTES.map(q => `<figure class="card quote"><blockquote lang="en">“${q.q}”</blockquote>
        <figcaption><strong>${q.a}</strong><br><span class="muted">${q.r}</span></figcaption></figure>`).join('')}</div>
      ${lang !== 'en' ? `<p class="muted" style="margin-top:.8rem">${t('quotesNote')}</p>` : ''}
      <div class="btn-row"><a class="btn dark" href="#/resenas">${t('reviewsCta', { n: REVIEWS.items.length })}</a>
        <a class="btn" href="#/prensa">${t('pressCta', { n: BIBLIOGRAPHY.items.length })}</a></div>
    </section>
    <section class="section">
      <h2>${t('catalog')}</h2>
      <div class="grid four">${WORKS.map(workCard).join('')}</div>
      <div class="btn-row"><a class="btn dark" href="#/pinturas">${t('paintingsCta', { n: PAINTINGS.length })}</a>
        <a class="btn" href="#/dibujos">${t('drawingsTitle')} · ${DRAWINGS.length}</a><a class="btn" href="#/escultura">${t('sculptureTitle')} · ${SCULPTURES.length}</a>
        <a class="btn" href="#/fotos">${t('photosTitle')} · ${PHOTOS.length}</a></div>
    </section>
  </div>`;
}

const findWork = id => WORKS.find(x => x.id === id) || MANIFESTO_WORKS.find(x => x.id === id);

function openWork(id) {
  const w = findWork(id);
  const dlg = document.createElement('dialog');
  dlg.setAttribute('aria-label', L(w.title));
  dlg.innerHTML = `<div class="dlg-body">
    <div class="dlg-art">${workImg(w)}</div>
    <h3 style="margin-top:1rem">${L(w.title)}</h3>
    ${w.sold ? `<p><span class="chip sold">${t('sold')}</span></p>` : ''}
    <dl class="specs">
      ${w.spec && w.spec.series ? `<dt>${t('series')}</dt><dd>${L(w.spec.series)}</dd>` : ''}
      <dt>${t('year')}</dt><dd>${w.spec ? L(w.spec)[0] : pend()}</dd>
      <dt>${t('technique')}</dt><dd>${w.spec ? L(w.spec)[1] : pend()}</dd>
      <dt>${t('dimensions')}</dt><dd>${w.spec ? L(w.spec)[2] : pend()}</dd>
    </dl>
    ${w.spec ? `<p class="muted">${t('sourceLabel')}: oscarabreu.com</p>` : ''}
    <div class="btn-row">
      <button class="btn dark small" data-dlg="acquire">${w.sold ? t('askSimilar') : circleStatus() === 'member' ? t('ciInterest') : t('ciRequestCta')}</button>
      <button class="btn small" data-dlg="close">${t('close')}</button>
    </div></div>`;
  document.body.appendChild(dlg);
  dlg.addEventListener('click', e => {
    const b = e.target.closest('[data-dlg]');
    if (e.target === dlg || (b && b.dataset.dlg === 'close')) dlg.close();
    if (b && b.dataset.dlg === 'acquire') {
      dlg.close();
      if (w.sold) { if (!(BOOKING.live && openWhatsApp(t('waSimilar', { title: L(w.title) })))) toast(t('ciInterestSent')); }
      else if (circleStatus() === 'member') actions.circleInterest({ dataset: { work: w.id } });
      else actions.circleRequest({ dataset: { work: w.id } });
    }
  });
  dlg.addEventListener('close', () => dlg.remove());
  dlg.showModal();
}

function pagePsico() {
  const n = LAYER_WORKS.length;
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('psicoEyebrow')}</p>
      <h1>${t('navPsico')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('psicoLead')}</p>
    </section>
    <section class="section grid two">
      <div>
        <h2>${t('psicoIntro')}</h2>
        <p>${t('psicoP1')}</p><p>${t('psicoP2')}</p>
        <figure class="quote" style="margin:1.2rem 0"><blockquote lang="en">“The name was little more than an intuition written down by a teenager who wanted to move beyond the appearance of a face and draw closer to what a person might feel, remember, fear, or conceal.”</blockquote>
          <figcaption class="muted">— Oscar Abreu · ${t('psicoQuoteNote')}</figcaption></figure>
        <p class="muted">${t('psicoP3')}</p>
      </div>
      <div>
        <h2>${t('layersTitle')}</h2>
        <div class="layers" id="layers">${LAYER_WORKS.map((w, i) =>
          `<img src="${w.img}" alt="${t('layerAlt', { n: i + 1 })}" data-layer="${i}" style="z-index:${n - i}"${i > 1 ? ' loading="lazy"' : ''}>`).join('')}</div>
        <label for="layer-range" class="muted" style="display:block;margin-top:.8rem">${t('layersHelp')}</label>
        <input id="layer-range" class="range" type="range" min="0" max="${n - 1}" step="1" value="0" data-action="layers" aria-valuetext="${t('layer')} 1/${n}">
        <p class="muted" style="margin-top:.4rem;font-size:.85rem">${t('layersNote')}</p>
      </div>
    </section>
    ${manifestoSection(MANIFESTOS[0])}
    <section class="section">
      <h2>${t('manifestosTitle', { n: MANIFESTOS.length })}</h2>
      <p class="muted" style="margin-bottom:1rem">${t('manifestosLead')}</p>
      ${manifestoList()}
    </section>
    <section class="section">
      <h2>${t('questionsTitle')}</h2>
      <ol class="questions"><li>${t('q1')}</li><li>${t('q2')}</li><li>${t('q3')}</li></ol>
    </section>
    <section class="section">
      <h2>${t('guidedGallery')}</h2>
      <div class="grid four">${WORKS.slice(2).map(workCard).join('')}</div>
    </section>
  </div>`;
}

// A manifesto opens with its artwork, as on oscarabreu.com. Blocks are
// paragraphs (strings), headings { h }, quotations { q } and lists { ul }.
function manifestoSection(m, own = false) {
  const w = findWork(m.work);
  const hx = own ? 'h2' : 'h3';
  const body = L(m).map(b => typeof b === 'string' ? `<p>${esc(b)}</p>`
    : b.h ? `<${hx} class="m-h">${esc(b.h)}</${hx}>`
    : b.q ? `<blockquote class="m-quote">${esc(b.q)}</blockquote>`
    : `<ul class="m-list">${b.ul.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
  const caption = `${L(w.title)}${w.spec ? ` · ${L(w.spec)[0]}` : ''}`;
  return `<section class="section manifesto${m.n === 1 ? ' m-coda' : ''}">
      <p class="eyebrow">${t('manifestoEyebrow')} ${m.n}/${MANIFESTOS.length}</p>
      ${own ? `<h1 class="m-title">${L(m.title)}</h1>` : `<h2>${L(m.title)}</h2>`}
      <p class="muted" style="margin-bottom:1rem">Oscar Abreu · ${m.source}</p>
      ${w.img ? `<button type="button" class="m-work" data-action="work" data-id="${w.id}">${workImg(w)}<span>${caption}</span></button>`
        : `<p class="m-work-missing">${caption} · ${t('imagePending')}</p>`}
      ${body}
    </section>`;
}

/* ---------- Booking ---------- */

function freshBooking() {
  return { step: 0, exp: null, date: null, time: null, glang: null, qty: 1, terms: false, mkt: false, holdUntil: 0, error: '', ticket: null };
}

function pageVisit() {
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('visitEyebrow')}</p>
      <h1>${t('visitTitle')}</h1>
      <p class="muted" style="margin-top:.6rem">${t('localTime')}</p>
    </section>
    <section class="section" id="wizard">${bookingWizard()}</section>
    <section class="section">
      <h2>${t('practical')}</h2>
      <div class="card">
        <dl class="specs">
          <dt>${t('location')}</dt><dd>Bávaro, Punta Cana ${pend()} · <a href="https://www.google.com/maps/search/?api=1&query=Museo+Abreu+B%C3%A1varo+Punta+Cana" target="_blank" rel="noopener">${t('mapOpen')}</a></dd>
          <dt>${t('hours')}</dt><dd>${t('hoursVal')}</dd>
          <dt>${t('duration')}</dt><dd>${t('durationVal')}</dd>
          <dt>${t('languages')}</dt><dd>${t('languagesVal')}</dd>
          <dt>${t('accessibility')}</dt><dd>${pend()}</dd>
          <dt>${t('arrival')}</dt><dd>${pend()}</dd>
          <dt>${t('transport')}</dt><dd>${t('transportVal')}</dd>
          <dt>${t('contact')}</dt><dd>WhatsApp <a href="https://wa.me/18098409588" target="_blank" rel="noopener">+1 (809) 840-9588</a></dd>
        </dl>
      </div>
    </section>
  </div>`;
}

function stepsBar() {
  const names = ['stepExp', 'stepDate', 'stepPeople', 'stepReview', 'stepPay', 'stepTicket'];
  return `<ol class="steps" tabindex="0" aria-label="${t('stepsLabel')}">${names.map((n, i) => `<li class="${i < bk.step ? 'done' : i === bk.step ? 'current' : ''}" ${i === bk.step ? 'aria-current="step"' : ''}>${t(n)}</li>`).join('')}</ol>`;
}

function bookingWizard() {
  const exp = EXPERIENCES.find(e => e.id === bk.exp);
  const err = bk.error ? `<p class="status bad" role="alert" style="margin-bottom:1rem">${bk.error}</p>` : '';
  if (bk.exp === 'private') return privateForm();
  let body = '';
  switch (bk.step) {
    case 0:
      body = `<h2 tabindex="-1">${t('chooseExp')}</h2><div class="grid two">${EXPERIENCES.filter(e => !e.cat || e.cat === 'tour').map(e => {
        const inner = `<span class="price">${e.price ? usd(e.price) + ' <small class="muted">' + (e.perLabel ? L(e.perLabel) : t('perPerson')) + '</small>' : t('onRequest')}</span>
          <h3>${L(e.name)}</h3><p class="muted">${L(e.desc)}</p>`;
        const ext = bookingLink(e.id);
        return ext
          ? `<a class="choice" href="${ext}" target="_blank" rel="noopener">${inner}<span class="ext-note">${t('bookOn', { provider: BOOKING.provider })} ↗</span></a>`
          : `<button type="button" class="choice" data-action="exp" data-id="${e.id}" aria-pressed="${bk.exp === e.id}">${inner}</button>`;
      }).join('')}</div>
        ${whatsappLink(t('waTour')) ? `<p style="margin-top:1rem"><a class="btn wa" href="${whatsappLink(t('waTour'))}" target="_blank" rel="noopener">${t('bookWhatsApp')}</a></p>` : ''}
        <p class="muted" style="margin-top:.8rem">* ${t('illustrative')}</p>`;
      break;
    case 1: {
      const start = todayPC();
      const days = Array.from({ length: 21 }, (_, i) => addDays(start, i + 1));
      if (!bk.date) bk.date = days.find(d => sessionsFor(bk.exp, d).length) || days[0];
      const sessions = sessionsFor(bk.exp, bk.date);
      body = `<h2 tabindex="-1">${t('chooseDate')}</h2><p class="muted">${L(exp.name)}</p>
        <div class="dates" role="group" aria-label="${t('date')}" style="margin-top:.8rem">${days.map(d => {
          const open = sessionsFor(bk.exp, d).length > 0;
          return `<button type="button" class="date" data-action="date" data-d="${d}" aria-pressed="${bk.date === d}" ${open ? '' : 'disabled'} aria-label="${fmtDate(d)}${open ? '' : ' — ' + t('closed')}">
            <small>${fmtDate(d, { weekday: 'short' })}</small><strong>${d.slice(8)}</strong><small>${fmtDate(d, { month: 'short' })}</small></button>`;
        }).join('')}</div>
        <h3 style="margin:1.2rem 0 .6rem">${fmtDate(bk.date)}</h3>
        <div class="grid two">${sessions.length ? sessions.map(s => s.langs.map(gl => {
          const sel = bk.time === s.time && bk.glang === gl;
          return `<button type="button" class="choice" data-action="session" data-time="${s.time}" data-gl="${gl}" aria-pressed="${sel}" ${s.left ? '' : 'disabled'}>
            <span class="price">${s.left ? t('spotsLeft', { n: s.left }) : t('soldOut')}</span>
            <strong style="font-size:1.2rem">${s.time}</strong> · ${t('guideLang')}: ${L(LANG_NAMES[gl])}
            ${bk.exp === 'artist' ? `<div class="chips"><span class="chip">✓ ${t('artistConfirmed')}</span></div>` : ''}
          </button>`;
        }).join('')).join('') : `<p class="muted">${t('noSessions')}</p>`}</div>
        <div class="btn-row"><button class="btn" data-action="back">${t('back')}</button>
        <button class="btn primary" data-action="next" ${bk.time ? '' : 'disabled'}>${t('continue')}</button></div>`;
      break;
    }
    case 2: {
      const s = sessionsFor(bk.exp, bk.date).find(x => x.time === bk.time);
      const per = exp.seatsPer || 1;
      const max = Math.floor(Math.min(s ? s.left : 0, exp.capacity) / per);
      bk.qty = Math.min(Math.max(1, bk.qty), Math.max(1, max));
      body = `<h2 tabindex="-1">${t(per === 2 ? 'howManyCouples' : 'howMany')}</h2>
        <div class="stepper" style="margin:1rem 0">
          <button type="button" data-action="qty" data-d="-1" aria-label="−1" ${bk.qty <= 1 ? 'disabled' : ''}>−</button>
          <output aria-live="polite">${bk.qty}</output>
          <button type="button" data-action="qty" data-d="1" aria-label="+1" ${bk.qty >= max ? 'disabled' : ''}>+</button>
        </div>
        <p class="muted">${t('maxSpots', { n: max })}</p>
        <div class="btn-row"><button class="btn" data-action="back">${t('back')}</button>
        <button class="btn primary" data-action="next">${t('continue')}</button></div>`;
      break;
    }
    case 3:
      body = `<h2 tabindex="-1">${t('review')}</h2>
        <div class="grid two" style="margin-top:1rem">
          <div class="card">${summary(exp)}</div>
          <div>
            <div class="field"><label for="f-name">${t('name')}</label><input id="f-name" autocomplete="name" value="${esc(profile.name)}" data-bind="name" required></div>
            <div class="field"><label for="f-email">${t('email')}</label><input id="f-email" type="email" autocomplete="email" value="${esc(profile.email)}" data-bind="email" required></div>
            <div class="terms"><strong>${t('termsTitle')}</strong><ul><li>${t('terms1')}</li><li>${t('terms2')}</li><li>${t('terms3')}</li><li>${t('terms4')}</li></ul></div>
            <label class="check"><input type="checkbox" data-bind="terms" ${bk.terms ? 'checked' : ''}> ${t('acceptTerms')}</label>
            <label class="check"><input type="checkbox" data-bind="mkt" ${bk.mkt ? 'checked' : ''}> ${t('marketing')}</label>
          </div>
        </div>
        <div class="btn-row"><button class="btn" data-action="back">${t('back')}</button>
        ${BOOKING.live
          ? `<button class="btn wa" data-action="waBook" ${canPay() ? '' : 'disabled'}>${t('sendWhatsApp')}</button>`
          : `<button class="btn primary" data-action="toPay" ${canPay() ? '' : 'disabled'}>${t('continue')}</button>`}</div>`;
      break;
    case 4:
      body = `<h2 tabindex="-1">${t('payTitle')}</h2>
        <div class="grid two" style="margin-top:1rem">
          <div class="card">${summary(exp)}</div>
          <div>
            <p class="status ok" id="hold" aria-live="polite"></p>
            <p class="muted" style="margin:.8rem 0">${t('payDemo')}</p>
            <div class="btn-row" style="margin-top:.5rem">
              <button class="btn primary" data-action="pay">${t('paySim', { amount: usd(exp.price * bk.qty) })}</button>
              <button class="btn small" data-action="payFail">${t('payFail')}</button>
            </div>
            <div class="btn-row"><button class="btn small" data-action="back">${t('back')}</button></div>
          </div>
        </div>`;
      break;
    case 5: {
      if (bk.requested) {
        body = `<h2 tabindex="-1">${t('requestedTitle')}</h2>
          <p class="lead" style="margin:.6rem 0 1rem">${t('requestedText')}</p>
          <div class="card" style="max-width:560px">${summary(EXPERIENCES.find(e => e.id === bk.exp))}</div>
          <div class="btn-row"><button class="btn wa" data-action="waBook">${t('openWAagain')}</button>
          <button class="btn" data-action="back">${t('back')}</button></div>`;
        break;
      }
      const tk = bk.ticket;
      body = `<h2 tabindex="-1">${t('confirmed')}</h2>
        <p class="muted" style="margin-bottom:1rem">${t('confirmedText', { email: esc(tk.email) })}</p>
        ${ticketHTML(tk)}
        <div class="btn-row">
          <button class="btn" data-action="ics" data-code="${tk.code}">${t('addCal')}</button>
          <a class="btn dark" href="#/cuenta">${t('viewAccount')}</a>
        </div>`;
      break;
    }
  }
  return stepsBar() + err + body;
}

function summary(exp) {
  return `<h3>${L(exp.name)}</h3>
    <div class="summary" style="margin-top:.6rem">
      <span class="muted">${t('date')}</span><span>${fmtDate(bk.date)}</span>
      <span class="muted">${t('time')}</span><span>${bk.time} (UTC−4)</span>
      <span class="muted">${t('guide')}</span><span>${L(LANG_NAMES[bk.glang])}</span>
      <span class="muted">${t('attendees')}</span><span>${bk.qty} × ${usd(exp.price)}</span>
      <span class="total">${t('total')}</span><span class="total">${usd(exp.price * bk.qty)}</span>
    </div>
    ${exp.includesBook ? `<p class="muted" style="margin-top:.6rem">📖 ${t('combo')}</p>` : ''}
    <p class="muted" style="margin-top:.4rem">${t('currency')} · ${t('illustrative')}</p>`;
}

function canPay() { return bk.terms && profile.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(profile.email); }

function privateForm() {
  return `<h2 tabindex="-1">${t('privateTitle')}</h2>
    <p class="muted" style="margin-bottom:1rem">${t('privateText')}</p>
    <form class="card" data-form="private" style="max-width:560px">
      <div class="field"><label for="p-name">${t('name')}</label><input id="p-name" required autocomplete="name" value="${esc(profile.name)}"></div>
      <div class="field"><label for="p-email">${t('email')}</label><input id="p-email" type="email" required autocomplete="email" value="${esc(profile.email)}"></div>
      <div class="grid two">
        <div class="field"><label for="p-size">${t('groupSize')}</label><input id="p-size" type="number" min="1" max="60" value="4" required></div>
        <div class="field"><label for="p-date">${t('preferredDate')}</label><input id="p-date" type="date" min="${addDays(todayPC(), 1)}" required></div>
      </div>
      <div class="field"><label for="p-msg">${t('message')}</label><textarea id="p-msg" rows="3"></textarea></div>
      <div class="btn-row"><button type="button" class="btn" data-action="back">${t('back')}</button><button class="btn primary">${t('sendRequest')}</button></div>
    </form>`;
}

function rerenderWizard(focus = true) {
  clearInterval(holdTimer);
  const w = $('#wizard');
  w.innerHTML = bookingWizard();
  renderQRs();
  if (bk.step === 4) startHoldTimer();
  if (focus) {
    const h = $('h2', w);
    h.focus({ preventScroll: true });
    w.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}

function startHoldTimer() {
  const tick = () => {
    const el = $('#hold');
    if (!el) return clearInterval(holdTimer);
    const ms = bk.holdUntil - Date.now();
    if (ms <= 0) {
      clearInterval(holdTimer);
      Object.assign(bk, { step: 1, time: null, glang: null, error: t('holdExpired') });
      return rerenderWizard();
    }
    const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60;
    el.textContent = '⏱ ' + t('holdTimer', { t: `${m}:${String(s).padStart(2, '0')}` });
  };
  tick();
  holdTimer = setInterval(tick, 1000);
}

function newCode() {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const r = crypto.getRandomValues(new Uint8Array(8));
  return 'MA-' + Array.from(r, b => a[b % a.length]).join('').replace(/(.{4})/, '$1-');
}

function completePayment() {
  // Idempotent: a repeated confirmation for the same booking must not create a second ticket.
  if (bk.ticket) return;
  const exp = EXPERIENCES.find(e => e.id === bk.exp);
  const s = sessionsFor(bk.exp, bk.date).find(x => x.time === bk.time);
  const seats = bk.qty * (exp.seatsPer || 1);
  if (!s || s.left < seats) {
    Object.assign(bk, { step: 1, time: null, glang: null, error: t('soldOut') });
    return rerenderWizard();
  }
  const tk = {
    code: newCode(), exp: bk.exp, date: bk.date, time: bk.time, glang: bk.glang, qty: bk.qty, seats,
    name: profile.name.trim(), email: profile.email.trim(), total: exp.price * bk.qty,
    status: 'valid', created: new Date().toISOString(), terms: 'v0.1', marketing: bk.mkt, rating: 0,
  };
  tickets.push(tk);
  if (exp.includesBook) {
    const ed = ['es', 'en'].includes(bk.glang) ? bk.glang : lang;
    if (!owns(ed)) purchases.push({ lang: ed, price: 0, source: 'combo', ref: tk.code, date: tk.created });
  }
  save();
  Object.assign(bk, { step: 5, ticket: tk, error: '' });
  rerenderWizard();
}

function ticketHTML(tk) {
  const exp = EXPERIENCES.find(e => e.id === tk.exp);
  const st = { valid: ['ok', 'statusValid'], used: ['used', 'statusUsed'], refunded: ['bad', 'statusRefunded'] }[tk.status];
  return `<article class="ticket">
    <div class="ticket-head"><p class="eyebrow ticket-kicker">Museo Abreu</p><h3>${L(exp.name)}</h3></div>
    <div class="ticket-body">
      <div class="qr" data-qr="${tk.code}"></div>
      <p class="code">${tk.code}</p>
      <div class="summary">
        <span class="muted">${t('date')}</span><span>${fmtDate(tk.date)}</span>
        <span class="muted">${t('time')}</span><span>${tk.time} (UTC−4)</span>
        <span class="muted">${t('guide')}</span><span>${L(LANG_NAMES[tk.glang])}</span>
        <span class="muted">${t('attendees')}</span><span>${tk.qty} · ${esc(tk.name)}</span>
      </div>
      <p><span class="status ${st[0]}">${t(st[1])}</span></p>
    </div>
  </article>`;
}

function renderQRs() {
  document.querySelectorAll('[data-qr]').forEach(el => {
    if (el.firstChild) return;
    try {
      const qr = qrcode(0, 'M');
      qr.addData(el.dataset.qr);
      qr.make();
      el.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true, alt: 'QR ' + el.dataset.qr });
    } catch {
      el.innerHTML = `<p class="code" style="padding-top:70px">${el.dataset.qr}</p>`;
    }
  });
}

function downloadICS(code) {
  const tk = tickets.find(x => x.code === code);
  const exp = EXPERIENCES.find(e => e.id === tk.exp);
  const start = tk.date.replace(/-/g, '') + 'T' + tk.time.replace(':', '') + '00';
  const [h, m] = tk.time.split(':').map(Number);
  const endMin = h * 60 + m + exp.minutes;
  const end = tk.date.replace(/-/g, '') + 'T' + String(Math.floor(endMin / 60)).padStart(2, '0') + String(endMin % 60).padStart(2, '0') + '00';
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Museo Abreu//ES', 'BEGIN:VEVENT',
    'UID:' + code + '@museoabreu', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
    'DTSTART;TZID=' + TZ + ':' + start, 'DTEND;TZID=' + TZ + ':' + end,
    'SUMMARY:' + L(exp.name) + ' · Museo Abreu', 'LOCATION:Museo Abreu\\, Bávaro\\, Punta Cana',
    'DESCRIPTION:' + code, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'museo-abreu-' + code + '.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------- Library & reader ---------- */

const owns = l => purchases.some(p => p.lang === l && !p.refunded);
const canRead = (l, ch) => CHAPTERS[ch] && (CHAPTERS[ch].free || owns(l) || (typeof isPro === 'function' && isPro()));

function pageLibrary() {
  const bookTitle = t('bookTitle');
  // Sample text exists for the Spanish and English editions.
  const readLang = owns(lang) ? lang : (purchases[0]?.lang || (hasSample(lang) ? lang : 'en'));
  const last = reading.last;
  return `<div class="wrap">
    <section class="section book">
      <div class="cover">${coverSVG(bookTitle, t('bookSub'))}</div>
      <div>
        <p class="eyebrow">${t('libEyebrow')}</p>
        <h1>${bookTitle}</h1>
        <p style="font-family:var(--serif);font-size:1.4rem;font-style:italic">${t('bookSub')} · ${t('bookSub2')}</p>
        <p class="muted" style="margin:.3rem 0 1rem">${t('bookBy')}</p>
        <h2 class="h3">${t('synopsis')}</h2>
        <p>${t('synopsisText')}</p>
        <p class="muted" style="margin-top:.6rem">${t('credits')}</p>
        ${lang === 'es' && typeof CREDITS_ES !== 'undefined' ? `<details class="ed-credits"><summary>Créditos de la edición</summary>
          <dl>${CREDITS_ES.roles.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
          ${CREDITS_ES.notes.map(n => `<p>${esc(n)}</p>`).join('')}</details>` : ''}
        <div class="btn-row">
          ${last ? `<a class="btn primary" href="#/leer/${last.lang}/${last.ch}">${t('resume')}</a>` : ''}
          <a class="btn ${last ? '' : 'primary'}" href="#/leer/${readLang}/0">${owns(readLang) ? t('read') : readLang !== lang ? t('readEnSample') : t('readSample')}</a>
        </div>
      </div>
    </section>
    ${typeof dailyReading === 'function' ? dailyReading() : ''}
    <section class="section grid two">
      <div>
        <h2>${t('editions')}</h2>
        <p class="muted" style="margin-bottom:.8rem">${t('oneTime')}</p>
        <div class="editions">${EDITIONS.map(ed => `
          <div class="edition">
            <div><strong>${L(LANG_NAMES[ed.lang])}</strong><br><span class="muted">${ed.status === 'available' ? t('available') : t('comingSoon')}</span></div>
            ${owns(ed.lang) ? `<a class="btn small dark" href="#/leer/${ed.lang}/0">${t('owned')} · ${t('read')}</a>`
              : ed.status === 'available' ? `<button class="btn small primary" data-action="buy" data-l="${ed.lang}">${t(BOOKING.live || whopLink('book-' + ed.lang) ? 'buyOnline' : 'buy', { price: usd(ed.price) })}</button>`
              : `<span class="chip">${t('comingSoon')}</span>`}
          </div>`).join('')}
        </div>
        <p class="muted" style="margin-top:.6rem">* ${t('illustrative')}</p>
      </div>
      <div>
        <h2>${t('contents')}</h2>
        ${(() => {
          const item = (c, i) => canRead(readLang, i)
            ? `<li><a href="#/leer/${readLang}/${i}"><span>${chTitle(c, readLang)}</span><span class="muted">${c.free ? t('free') : ''}</span></a></li>`
            : `<li><span><span>${chTitle(c, readLang)}</span><span>🔒</span></span></li>`;
          return `<ol class="toc">${CHAPTERS.slice(0, 6).map(item).join('')}</ol>
            <details style="margin-top:.5rem"><summary class="btn small" style="list-style:none">${t('fullToc', { n: CHAPTERS.length })}</summary>
            <ol class="toc" style="margin-top:.5rem">${CHAPTERS.map(item).slice(6).join('')}</ol></details>`;
        })()}
      </div>
    </section>
    ${typeof libraryExtras === 'function' ? libraryExtras() : ''}
  </div>`;
}

function buyEdition(l) {
  if (BOOKING.live || whopLink('book-' + l)) return checkout({ title: 'Ecce Homo · Oscar Abreu', sub: L(LANG_NAMES[l]),
    price: EDITIONS.find(e => e.lang === l).price, link: whopLink('book-' + l), provider: 'Whop' });
  const finish = email => {
    profile.email = email;
    purchases.push({ lang: l, price: EDITIONS.find(e => e.lang === l).price, source: 'direct', date: new Date().toISOString() });
    save();
    toast(t('bought'));
    route();
  };
  const dlg = document.createElement('dialog');
  dlg.innerHTML = `<form method="dialog" class="dlg-body">
    <h3>${t('buy', { price: usd(EDITIONS.find(e => e.lang === l).price) })} · ${L(LANG_NAMES[l])}</h3>
    <p class="muted" style="margin:.5rem 0 1rem">${t('buyNeedsEmail')}</p>
    <div class="field"><label for="b-email">${t('email')}</label><input id="b-email" type="email" required autocomplete="email" value="${esc(profile.email)}"></div>
    <p class="muted">${t('currency')} · ${t('oneTime')}</p>
    <div class="btn-row"><button class="btn primary" value="ok">${t('paySim', { amount: usd(EDITIONS.find(e => e.lang === l).price) })}</button>
    <button class="btn" value="cancel" formnovalidate>${t('close')}</button></div></form>`;
  document.body.appendChild(dlg);
  dlg.addEventListener('close', () => {
    const email = $('#b-email', dlg).value.trim();
    if (dlg.returnValue === 'ok' && email) finish(email);
    dlg.remove();
  });
  dlg.showModal();
}

const chTitle = (c, l) => c.title[l] ?? c.title.en ?? c.title.es;
const SAMPLES = { en: SAMPLE_EN, es: SAMPLE_ES };
const sampleFor = (l, c) => SAMPLES[l]?.[c.key] || null;
const hasSample = l => l in SAMPLES;


function pageReader(l = 'es', chStr = '0') {
  const ch = Math.min(Math.max(0, parseInt(chStr, 10) || 0), CHAPTERS.length - 1);
  if (!LANG_NAMES[l]) l = 'es';
  const c = CHAPTERS[ch];
  const marked = reading.bookmarks.some(b => b.lang === l && b.ch === ch);
  let text;
  if (canRead(l, ch)) {
    reading.last = { lang: l, ch, at: new Date().toISOString() };
    save();
    const paras = sampleFor(l, c);
    text = `<h1 class="ch-title">${chTitle(c, l)}</h1>` + (paras
      ? paras.map(p => `<p>${esc(p)}</p>`).join('')
      : c.free
        ? `<div class="empty"><p>${t('samplePending')}</p><div class="btn-row" style="justify-content:center"><a class="btn dark" href="#/leer/en/${ch}">${t('readEnSample')}</a></div></div>`
        : `<p class="muted" style="font-family:var(--sans);font-size:.9rem">${t('chapterPlaceholder')}</p>`);
  } else {
    text = `<h1 class="ch-title">${chTitle(c, l)}</h1><div class="empty">🔒<p>${t('lockedChapter')}</p>
      <div class="btn-row" style="justify-content:center"><button class="btn primary" data-action="buy" data-l="${l}">${t(BOOKING.live || whopLink('book-' + l) ? 'buyOnline' : 'buy', { price: usd(EDITIONS.find(e => e.lang === l)?.price || 60) })}</button></div></div>`;
  }
  return `<div class="wrap reader">
    <div class="reader-bar">
      <a href="#/biblioteca" class="btn small"><span class="arr">←</span> ${t('backToLib')}</a>
      <span class="muted">${t('bookTitle')} · ${L(LANG_NAMES[l])}</span>
      <div style="display:flex;gap:.3rem" role="group" aria-label="${t('fontSize')}">
        <button class="btn small" data-action="font" data-d="-0.1" aria-label="${t('fontSize')} −">A−</button>
        <button class="btn small" data-action="font" data-d="0.1" aria-label="${t('fontSize')} +">A+</button>
        <button class="btn small" data-action="bookmark" data-l="${l}" data-ch="${ch}" aria-pressed="${marked}">${marked ? '★' : '☆'} ${t('bookmark')}</button>
      </div>
    </div>
    <article class="reader-text" lang="${l}">${text}</article>
    <nav class="reader-nav">
      ${ch > 0 ? `<a class="btn small" href="#/leer/${l}/${ch - 1}"><span class="arr">←</span> ${t('prev')}</a>` : '<span></span>'}
      ${ch < CHAPTERS.length - 1 ? `<a class="btn small dark" href="#/leer/${l}/${ch + 1}">${t('next')} <span class="arr">→</span></a>` : ''}
    </nav>
  </div>`;
}

/* ---------- Account ---------- */

function pageAccount() {
  const mine = tickets.slice().reverse();
  return `<div class="wrap">
    <section class="section"><h1>${t('accTitle')}</h1><p class="lead" style="margin-top:.6rem">${t('accLead')}</p></section>
    ${typeof accountExtras === 'function' ? accountExtras() : ''}
    <section class="section">
      <h2>${t('myTickets')}</h2>
      ${mine.length ? `<div class="grid three">${mine.map(tk => `<div>${ticketHTML(tk)}
        <div class="btn-row" style="margin-top:.6rem"><button class="btn small" data-action="ics" data-code="${tk.code}">${t('addCal')}</button></div>
        ${tk.status === 'used' ? `<div class="card" style="margin-top:.6rem"><strong>${t('rateTitle')}</strong>
          <div role="group" aria-label="${t('rateTitle')}">${[1, 2, 3, 4, 5].map(n => `<button class="btn small" style="border:0;padding:.2rem;font-size:1.3rem" data-action="rate" data-code="${tk.code}" data-n="${n}" aria-label="${n}/5">${n <= tk.rating ? '★' : '☆'}</button>`).join('')}</div></div>` : ''}
      </div>`).join('')}</div>` : `<p class="empty">${t('noTickets')} <a href="#/visita">${t('ctaTour')}</a></p>`}
    </section>
    <section class="section grid two">
      <div>
        <h2>${t('myPurchases')}</h2>
        ${purchases.length ? `<div class="editions">${purchases.map(p => `<div class="edition"><div><strong>${t('bookTitle')}</strong><br><span class="muted">${L(LANG_NAMES[p.lang])} · ${p.source === 'combo' ? EXPERIENCES[2].name[lang] : usd(p.price)}</span></div>
          <a class="btn small dark" href="#/leer/${p.lang}/0">${t('read')}</a></div>`).join('')}</div>` : `<p class="empty">${t('noPurchases')}</p>`}
      </div>
      <div>
        <h2>${t('myReading')}</h2>
        ${reading.last ? `<div class="card"><p class="muted">${t('lastRead')}</p><p><strong>${chTitle(CHAPTERS[reading.last.ch], reading.last.lang)}</strong> · ${L(LANG_NAMES[reading.last.lang])}</p>
          <div class="btn-row" style="margin-top:.6rem"><a class="btn small primary" href="#/leer/${reading.last.lang}/${reading.last.ch}">${t('resume')}</a></div></div>` : `<p class="empty">${t('noReading')}</p>`}
        ${reading.bookmarks.length ? `<h3 style="margin-top:1rem">${t('bookmarks')}</h3><ul class="toc">${reading.bookmarks.map(b => `<li><a href="#/leer/${b.lang}/${b.ch}"><span>★ ${chTitle(CHAPTERS[b.ch], b.lang)}</span><span class="muted">${b.lang.toUpperCase()}</span></a></li>`).join('')}</ul>` : ''}
      </div>
    </section>
    <section class="section">
      <h2>${t('support')}</h2><p>${t('supportText')}</p>
      <div class="btn-row"><a class="btn" href="mailto:?subject=Museo%20Abreu">${t('contactSupport')}</a>
      ${BOOKING.live ? '' : `<button class="btn small" data-action="reset">${t('resetDemo')}</button>`}</div>
    </section>
  </div>`;
}

/* ---------- Staff ---------- */

function pageStaff() {
  const today = todayPC();
  const todays = tickets.filter(tk => tk.date === today);
  return `<div class="wrap">
    <section class="section"><h1>${t('staffTitle')}</h1><p class="lead" style="margin-top:.6rem">${t('staffLead')}</p>
      <p class="muted" style="margin-top:.4rem">${t('staffNote')}</p></section>
    <section class="section">
      <form data-form="staff" style="display:flex;gap:.5rem;max-width:520px">
        <label for="s-q" class="skip">${t('search')}</label>
        <input id="s-q" class="field" style="flex:1;border:1px solid var(--line);border-radius:10px;padding:.7rem .8rem;background:var(--card);margin:0" placeholder="${t('searchPh')}" autocomplete="off">
        <button class="btn dark">${t('search')}</button>
      </form>
      <div id="staff-results" aria-live="polite" style="margin-top:1rem"></div>
    </section>
    <section class="section">
      <h2>${t('attendeesToday')} · ${fmtDate(today)}</h2>
      ${todays.length ? staffList(todays) : `<p class="empty">${t('noTickets')}</p>`}
    </section>
  </div>`;
}

function staffList(list) {
  return `<div class="editions">${list.map(tk => `<div class="edition">
    <div><strong>${tk.code}</strong> · ${esc(tk.name)}<br><span class="muted">${fmtDate(tk.date, { day: 'numeric', month: 'short' })} ${tk.time} · ${L(EXPERIENCES.find(e => e.id === tk.exp).name)} · ${tk.qty} · ${tk.glang.toUpperCase()}</span></div>
    ${tk.status === 'valid' ? `<button class="btn small primary" data-action="use" data-code="${tk.code}">${t('markUsed')}</button>` : `<span class="status used">${t('statusUsed')}</span>`}
  </div>`).join('')}</div>`;
}

/* ---------- Events ---------- */

const actions = {
  work: el => openWork(el.dataset.id),
  exp: el => { Object.assign(bk, freshBooking(), { exp: el.dataset.id, step: el.dataset.id === 'private' ? 0 : 1 }); rerenderWizard(); },
  date: el => { Object.assign(bk, { date: el.dataset.d, time: null, glang: null, error: '' }); rerenderWizard(false); },
  session: el => { Object.assign(bk, { time: el.dataset.time, glang: el.dataset.gl, error: '' }); rerenderWizard(false); },
  qty: el => { bk.qty += Number(el.dataset.d); rerenderWizard(false); },
  next: () => { bk.step++; bk.error = ''; rerenderWizard(); },
  back: () => {
    if (bk.exp === 'private' || bk.step <= 1) Object.assign(bk, freshBooking());
    else bk.step--;
    bk.error = '';
    rerenderWizard();
  },
  waBook: () => {
    if (!canPay()) return;
    save();
    const exp = EXPERIENCES.find(e => e.id === bk.exp);
    const per = exp.seatsPer === 2 ? t('couplesN', { n: bk.qty }) : t('peopleN', { n: bk.qty });
    openWhatsApp(t('waBookMsg', { exp: L(exp.name), date: fmtDate(bk.date), time: bk.time, glang: L(LANG_NAMES[bk.glang]), qty: per,
      total: usd(exp.price * bk.qty), name: profile.name.trim(), email: profile.email.trim() }));
    Object.assign(bk, { step: 5, requested: true, error: '' });
    rerenderWizard();
  },
  toPay: () => { if (!canPay()) return; save(); bk.step = 4; bk.holdUntil = Date.now() + 10 * 60 * 1000; rerenderWizard(); },
  pay: el => { el.disabled = true; completePayment(); },
  payFail: () => { bk.error = t('payFailed'); bk.step = 3; rerenderWizard(); },
  ics: el => downloadICS(el.dataset.code),
  buy: el => buyEdition(el.dataset.l),
  font: el => {
    reading.fontSize = Math.min(1.8, Math.max(.9, +(reading.fontSize + Number(el.dataset.d)).toFixed(2)));
    $('.reader-text').style.fontSize = reading.fontSize + 'rem';
    save();
  },
  bookmark: el => {
    const l = el.dataset.l, ch = Number(el.dataset.ch);
    const i = reading.bookmarks.findIndex(b => b.lang === l && b.ch === ch);
    if (i >= 0) reading.bookmarks.splice(i, 1); else reading.bookmarks.push({ lang: l, ch });
    save();
    toast(i >= 0 ? t('removeBookmark') : t('bookmarked'));
    route();
  },
  rate: el => { const tk = tickets.find(x => x.code === el.dataset.code); tk.rating = Number(el.dataset.n); save(); toast(t('rateThanks')); route(); },
  use: el => {
    const tk = tickets.find(x => x.code === el.dataset.code);
    if (tk.status !== 'valid') return toast(t('alreadyUsed'));
    tk.status = 'used';
    save();
    route();
  },
  reset: () => {
    ['tickets', 'purchases', 'reading', 'profile', 'member', 'passes', 'bids', 'clubs', 'sponsorships', 'privateRequests'].forEach(k => { try { localStorage.removeItem('ma.' + k); } catch { /* ignore */ } });
    tickets = []; purchases = []; reading = { fontSize: 1.15, last: null, bookmarks: [] }; profile = { name: '', email: '' };
    bk = freshBooking();
    route();
  },
};
if (typeof EXTRA_ACTIONS !== 'undefined') Object.assign(actions, EXTRA_ACTIONS);

main.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (el && el.tagName !== 'INPUT' && actions[el.dataset.action]) actions[el.dataset.action](el);
});

main.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.action === 'layers') {
    // Each step lifts one painting off the stack to show the next.
    const v = Number(el.value);
    LAYER_WORKS.forEach((_, i) => { const l = $(`[data-layer="${i}"]`); if (l) l.style.opacity = v > i ? 0 : 1; });
    el.setAttribute('aria-valuetext', `${t('layer')} ${v + 1}/${LAYER_WORKS.length}`);
  }
  if (el.dataset.bind) {
    if (el.type === 'checkbox') bk[el.dataset.bind] = el.checked;
    else profile[el.dataset.bind] = el.value;
    const btn = $('[data-action="toPay"], [data-action="waBook"]');
    if (btn) btn.disabled = !canPay();
  }
});

main.addEventListener('submit', e => {
  const form = e.target;
  if (typeof EXTRA_FORMS !== 'undefined' && EXTRA_FORMS[form.dataset.form]) {
    e.preventDefault();
    return EXTRA_FORMS[form.dataset.form](form);
  }
  if (form.dataset.form === 'private') {
    e.preventDefault();
    profile.name = $('#p-name').value; profile.email = $('#p-email').value; save();
    if (BOOKING.live) openWhatsApp(t('waPrivateTour', { size: $('#p-size').value, date: $('#p-date').value, name: profile.name, msg: $('#p-msg').value }));
    toast(t('requestSent'));
    bk = freshBooking();
    rerenderWizard();
  }
  if (form.dataset.form === 'staff') {
    e.preventDefault();
    const q = $('#s-q').value.trim().toLowerCase();
    const found = q ? tickets.filter(tk => tk.code.toLowerCase().includes(q) || tk.name.toLowerCase().includes(q)) : [];
    $('#staff-results').innerHTML = found.length ? staffList(found) : `<p class="status bad">${t('notFound')}</p>`;
  }
});

/* ---------- Language ---------- */

const langSelect = document.getElementById('lang-select');
const langFile = {};
function loadLang(l) {
  if (!LAZY_LANGS.includes(l) || TR[l]) return Promise.resolve();
  return langFile[l] ||= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `lang/${l}.js`;
    s.onload = resolve;
    s.onerror = () => { delete langFile[l]; s.remove(); reject(); };
    document.head.appendChild(s);
  });
}
function setLang(l) {
  // Arabic text uses Noto fonts, fetched only for Arabic readers.
  if (l === 'ar' && !document.getElementById('font-ar')) document.head.insertAdjacentHTML('beforeend',
    '<link id="font-ar" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600&family=Noto+Sans+Arabic:wght@400;500;600&display=swap">');
  loadLang(l).then(() => applyLang(l), () => {
    langSelect.value = lang;
    if (!main.firstChild) applyLang(lang = 'en', false); // first visit offline: show English
    toast(t('langOffline'));
  });
}
function applyLang(l, remember = true) {
  if (l !== lang) trackEvent('Language', { lang: l });
  lang = l;
  if (remember) store.set('lang', l);
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  langSelect.value = l;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  // Re-render in place; the booking in progress is kept.
  const y = window.scrollY;
  route();
  window.scrollTo(0, y);
}
langSelect.addEventListener('change', () => setLang(langSelect.value));

window.addEventListener('hashchange', e => {
  if (location.hash === '#main') { // skip link: keep the current page
    history.replaceState(null, '', e.oldURL.includes('#') ? e.oldURL.slice(e.oldURL.indexOf('#')) : '#/');
    return main.focus();
  }
  route();
  window.scrollTo(0, 0);
});
if (BOOKING.live) {
  document.querySelectorAll('.demo-banner, .staff-link').forEach(el => { el.hidden = true; });
}
setLang(lang);

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
