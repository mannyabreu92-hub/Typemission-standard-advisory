// Fundamentos del Psico-Expresionismo (Oscar Abreu, 2026) in six editions (Spanish, English, French, Portuguese,
// Italian, German): the second book sold in the app, digital only for now. #/fundamentos opens the visitor's
// edition (the app's language, else the phone's, else English); #/fundamentos/<lang> is an edition's page (cover,
// the author's own words from his note, contents, buy or request it); #/fundamentos/<lang>/<n> reads section n.
// The free sample (sample-fund.js) is the note, the introduction and chapter 1; the rest comes from the server
// (api/book.js, b=fu) for owners of "fund-<lang>" or Pro, once the museum uploads the Word file in Dashboard ›
// Full book. Whop keys: BOOKING.whop['fund-<lang>']; price: FUND_PRICE (one price for every edition).

const FUND_PRICE = null;   // USD; with a Whop link, an edition's page offers Buy. Until then: request it by WhatsApp.
const FUND_FREE = 3;       // sections 0–2 are free
const FUND_LANGS = Object.keys(FUND_EDITIONS);

Object.assign(I18N.es, {
  fuEyebrow: 'Nuevo libro de Oscar Abreu', fuAlso: 'Del mismo autor',
  fuLead: 'Oscar Abreu examina los principios, el vocabulario visual, los procedimientos y los límites del Psico-Expresionismo. Acompaña a Ecce Homo y puede leerse por separado.',
  fuEdition: 'Edición digital · {lang} · ARTFORO Editions, 2026', fuRequest: 'Solicitar la edición digital', fuCredits: 'Créditos de la edición', fuWords: 'En palabras del autor', fuPro: 'Incluido en Pro',
  fuEditions: 'Ediciones', waFund: 'Hola, quiero la edición digital de {title} ({lang}).', fuUpload: 'Fundamentos del Psico-Expresionismo · todas las ediciones',
  fuUploadHelp: 'Elija el archivo Word de una edición; se reconoce su idioma. Se esperan 28 secciones: nota, introducción, 19 capítulos y siete secciones finales.',
  fuFound: 'Encontradas {s} secciones y {p} párrafos.', fuWarn: 'Atención: se esperaban 28 secciones.', fuBad: 'Este archivo no parece Fundamentos del Psico-Expresionismo.',
});
Object.assign(I18N.en, {
  fuEyebrow: 'New book by Oscar Abreu', fuAlso: 'Also by Oscar Abreu',
  fuLead: 'Oscar Abreu examines the principles, visual vocabulary, procedures and limits of Psycho-Expressionism. A companion to Ecce Homo that can be read on its own.',
  fuEdition: 'Digital edition · {lang} · ARTFORO Editions, 2026', fuRequest: 'Request the digital edition', fuCredits: 'Edition credits', fuWords: 'In the author’s words', fuPro: 'Included in Pro',
  fuEditions: 'Editions', waFund: 'Hello, I would like the digital edition of {title} ({lang}).', fuUpload: 'Fundamentos del Psico-Expresionismo · all editions',
  fuUploadHelp: 'Choose the Word file of an edition; its language is recognised. 28 sections are expected: note, introduction, 19 chapters and seven closing sections.',
  fuFound: 'Found {s} sections and {p} paragraphs.', fuWarn: 'Note: 28 sections were expected.', fuBad: 'This file does not look like Fundamentos del Psico-Expresionismo.',
});
Object.assign(I18N.fr, {
  fuEyebrow: 'Nouveau livre d’Oscar Abreu', fuAlso: 'Du même auteur',
  fuLead: 'Oscar Abreu examine les principes, le vocabulaire visuel, les procédés et les limites du Psycho-Expressionnisme. Un compagnon d’Ecce Homo qui peut se lire séparément.',
  fuEdition: 'Édition numérique · {lang} · ARTFORO Editions, 2026', fuRequest: 'Demander l’édition numérique', fuCredits: 'Crédits de l’édition', fuWords: 'Selon l’auteur', fuPro: 'Inclus dans Pro',
  fuEditions: 'Éditions', waFund: 'Bonjour, je souhaite l’édition numérique de {title} ({lang}).', fuUpload: 'Fundamentos del Psico-Expresionismo · toutes les éditions',
  fuUploadHelp: 'Choisissez le fichier Word d’une édition ; sa langue est reconnue. 28 sections sont attendues : note, introduction, 19 chapitres et sept sections finales.',
  fuFound: '{s} sections et {p} paragraphes trouvés.', fuWarn: 'Attention : 28 sections étaient attendues.', fuBad: 'Ce fichier ne ressemble pas à Fundamentos del Psico-Expresionismo.',
});

const fuEd = l => FUND_EDITIONS[l] || FUND_EDITIONS.es;
// As for Ecce Homo (myEdition): a phone language the app's menus are not in wins (a Portuguese phone opens the
// Portuguese edition); else the app's language when the book exists in it; else the phone's; else English.
function fuDefault() {
  const d = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']).map(x => String(x).slice(0, 2).toLowerCase()).find(x => FUND_EDITIONS[x]);
  return d && !LANGS.includes(d) ? d : FUND_EDITIONS[lang] ? lang : d || 'en';
}
const fuOwns = l => fx.get('books2', []).includes('fund-' + l) || (typeof isPro === 'function' && isPro());
const fuCanRead = (l, n) => n < FUND_FREE || fuOwns(l);
// The cover's two title lines from the edition's title ("FUNDAMENTOS" / "DEL PSICO-EXPRESIONISMO"), the second
// set smaller when it is long.
const fuCoverLines = l => { const t = fuEd(l).title.toUpperCase(), i = t.indexOf(' '); return [t.slice(0, i), t.slice(i + 1)]; };
const fuCover = l => { const [a, b] = fuCoverLines(l); return `<svg viewBox="0 0 400 600" role="img" aria-label="${esc(fuEd(l).title)}">${artLayer(9, 1).replace('height="500"', 'height="600"')}
  <rect y="360" width="400" height="240" fill="#16120f"/><rect x="28" y="384" width="56" height="2" fill="#c4a76c"/>
  <text x="28" y="430" fill="#f6f1e9" font-family="Cormorant Garamond, serif" font-size="40" font-weight="600" letter-spacing="1.5">${a}</text>
  <text x="28" y="466" fill="#f6f1e9" font-family="Cormorant Garamond, serif" font-size="${Math.min(25, Math.floor((344 / b.length - 1) / 0.61))}" font-weight="600" letter-spacing="1">${b}</text>
  <text x="28" y="502" fill="#e9dfd0" font-family="Cormorant Garamond, serif" font-size="17" font-style="italic">${esc(fuEd(l).subtitle)}</text>
  <text x="28" y="560" fill="#c4a76c" font-family="Work Sans, sans-serif" font-size="16" letter-spacing="4">OSCAR ABREU</text></svg>`; };

// Buy on Whop once there is a price and a link; otherwise a request by WhatsApp. Digital only for now.
function fuBuyButton(l, cls = 'btn primary') {
  if (fuOwns(l)) return '';
  if (FUND_PRICE && whopLink('fund-' + l)) return `<button class="${cls}" data-action="fuBuy" data-l="${l}">${t('buyOnline', { price: usd(FUND_PRICE) })}</button>`;
  const wa = whatsappLink(t('waFund', { title: fuEd(l).title, lang: L(LANG_NAMES[l]) }));
  return wa ? `<a class="${cls}" href="${wa}" target="_blank" rel="noopener">${t('fuRequest')}</a>` : '';
}
EXTRA_ACTIONS.fuBuy = el => checkout({ title: fuEd(el.dataset.l).title, sub: 'Oscar Abreu · ' + t('fuEdition', { lang: L(LANG_NAMES[el.dataset.l]) }),
  price: FUND_PRICE, link: whopLink('fund-' + el.dataset.l), provider: 'Whop' });

function pageFund(l) {
  const e = fuEd(l), note = e.sample.s0.find(b => b[0] === 'p' && /acompaña mi autobiografía|accompanies my autobiography/.test(b[1]));
  const item = (s, i) => fuCanRead(l, i)
    ? `<li><a href="#/fundamentos/${l}/${i}"><span>${esc(s.title)}</span><span class="muted">${i < FUND_FREE ? t('free') : ''}</span></a></li>`
    : `<li><span><span>${esc(s.title)}</span><span>🔒</span></span></li>`;
  let part = '';
  const toc = e.toc.map((s, i) => { const head = s.part && s.part !== part ? `<li class="fu-part" aria-hidden="true">${esc(s.part)}</li>` : ''; part = s.part; return head + item(s, i); }).join('');
  const last = fx.get('fuLast', null), start = last && last.l === l ? last.n : 0;
  return `<div class="wrap">
    <section class="section book">
      <div class="cover">${fuCover(l)}</div>
      <div>
        <p class="eyebrow">${t('fuEyebrow')}</p>
        <h1 lang="${l}">${esc(e.title)}</h1>
        <p lang="${l}" style="font-family:var(--serif);font-size:1.4rem;font-style:italic">${esc(e.subtitle)}</p>
        <p class="muted" style="margin:.3rem 0 1rem">Oscar Abreu · ${t('fuEdition', { lang: L(LANG_NAMES[l]) })}</p>
        <nav class="tabs fu-eds" aria-label="${t('fuEditions')}">${FUND_LANGS.map(x => `<a class="tab" href="#/fundamentos/${x}"${x === l ? ' aria-current="page"' : ''}>${L(LANG_NAMES[x])}</a>`).join('')}</nav>
        <p class="lead" style="margin-top:1rem">${t('fuLead')}</p>
        <div class="btn-row">
          <a class="btn ${fuOwns(l) ? 'primary' : ''}" href="#/fundamentos/${l}/${start}">${fuOwns(l) ? t('read') : t('readSample')}</a>
          ${fuBuyButton(l)}
        </div>
        <p class="muted" style="margin-top:.6rem">${t('fuPro')} · <a href="#/pro">Pro</a></p>
      </div>
    </section>
    ${note ? `<section class="section"><h2 class="h3">${t('fuWords')}</h2><figure class="quote"><blockquote lang="${l}">“${esc(note[1])}”</blockquote>
      <figcaption class="muted">— Oscar Abreu, ${esc(e.toc[0].title)}</figcaption></figure></section>` : ''}
    <section class="section"><h2>${t('contents')}</h2><ol class="toc fu-toc" lang="${l}">${toc}</ol></section>
    <section class="section"><details class="ed-credits"><summary>${t('fuCredits')}</summary>${e.credits.map(c => `<p lang="${l}">${esc(c)}</p>`).join('')}</details></section>
  </div>`;
}

function pageFundReader(l, nStr) {
  const e = fuEd(l), n = Math.min(Math.max(0, parseInt(nStr, 10) || 0), e.toc.length - 1), s = e.toc[n];
  let body;
  if (!fuCanRead(l, n)) body = `<div class="empty">🔒<p>${t('lockedChapter')}</p><div class="btn-row" style="justify-content:center">${fuBuyButton(l)}<a class="btn" href="#/pro">Pro</a></div></div>`;
  else {
    fx.set('fuLast', { l, n });
    body = n < FUND_FREE ? fbBlocks(e.sample['s' + n]) : `<div id="fu-text"><p class="muted">${t('srLoading')}</p></div>`;
    if (n >= FUND_FREE) setTimeout(() => fuLoad(l, n), 0);
  }
  return `<div class="wrap reader">
    <div class="reader-bar">
      <a href="#/fundamentos/${l}" class="btn small"><span class="arr">←</span> ${t('contents')}</a>
      <span class="muted" lang="${l}">${esc(e.title)}</span>
      <div style="display:flex;gap:.3rem" role="group" aria-label="${t('fontSize')}">
        <button class="btn small" data-action="font" data-d="-0.1" aria-label="${t('fontSize')} −">A−</button>
        <button class="btn small" data-action="font" data-d="0.1" aria-label="${t('fontSize')} +">A+</button>
      </div>
    </div>
    <article class="reader-text" lang="${l}" dir="ltr" style="font-size:${reading.fontSize}rem">
      ${s.part ? `<p class="eyebrow">${esc(s.part)}</p>` : ''}<h1 class="ch-title">${esc(s.title)}</h1>${body}</article>
    <nav class="reader-nav">
      ${n > 0 ? `<a class="btn small" href="#/fundamentos/${l}/${n - 1}"><span class="arr">←</span> ${t('prev')}</a>` : '<span></span>'}
      ${n < e.toc.length - 1 ? `<a class="btn small dark" href="#/fundamentos/${l}/${n + 1}">${t('next')} <span class="arr">→</span></a>` : ''}
    </nav>
  </div>`;
}

const fuCache = {};
async function fuLoad(l, n) {
  const box = document.getElementById('fu-text'); if (!box) return;
  const key = 's' + n, id = l + ':' + key, show = blocks => { fuCache[id] = blocks; if (box.isConnected) box.innerHTML = fbBlocks(blocks); };
  if (fuCache[id]) return show(fuCache[id]);
  const rd = fbReader();
  if (!rd) return (box.innerHTML = fbMsg(t('fbNeedUnlock'), true));
  try {
    const r = await fetch(`/api/book?b=fu&lang=${l}&ch=${key}&e=${rd.e}&t=${rd.t}`, { cache: 'no-store' });
    const d = await r.json().catch(() => ({}));
    if (r.ok) return show(d.blocks);
    if (r.status === 403) return (box.innerHTML = fbMsg(d.error === 'not-owned' ? t('fbNotOwned') : t('fbNeedUnlock'), true));
    box.innerHTML = fbMsg(d.error === 'not-uploaded' ? t('fbNotYet') : t('fbErr'));
  } catch (err) { box.innerHTML = fbMsg(t('fbErr')); }
}

// #/fundamentos, #/fundamentos/<l>, #/fundamentos/<l>/<n>; the first links (#/fundamentos/<n>) open the Spanish edition.
EXTRA_ROUTES.fundamentos = (a, b) => /^\d+$/.test(a || '') ? pageFundReader('es', a)
  : FUND_EDITIONS[a] ? (b === undefined || b === '' ? pageFund(a) : pageFundReader(a, b)) : pageFund(fuDefault());
Object.assign(ROUTE_SECTION, { fundamentos: 'biblioteca' });

// The book in the Library (after Ecce Homo) and in the Shop, in the visitor's edition.
{
  const fuCard = () => { const l = fuDefault(), e = fuEd(l); return `<section class="section"><p class="eyebrow">${t('fuAlso')}</p>
    <a class="card shop-banner" href="#/fundamentos/${l}"><div class="cover">${fuCover(l)}</div>
      <div><h3 lang="${l}">${esc(e.title)}</h3><p class="muted" lang="${l}">${esc(e.subtitle)}</p><p style="margin-top:.4rem">${t('fuLead')}</p></div></a></section>`; };
  const lib = libraryExtras;
  libraryExtras = () => fuCard() + lib();
  const shop = pageShop;
  pageShop = () => shop().replace(/<\/div>\s*$/, fuCard() + '</div>');
  EXTRA_ROUTES.tienda = pageShop;
}

/* ---------- Dashboard › Full book: upload each edition of this book too ---------- */

let fuParsed = null, fuMsg = '';
{
  const book = pageBook;
  pageBook = () => {
    const status = l => { const f = (adData.fund || []).find(x => x.lang === l);
      return `<li><strong>${L(LANG_NAMES[l])}</strong> · ${!f ? `<span class="muted">${t('bkMissing')}</span>`
        : f.sections === FUND_EDITIONS[l].toc.length ? `<span class="remind-on">${t('bkStatus', { date: adStamp(f.at), s: f.sections })}</span>` : `<span class="bk-short">${t('fuWarn')}</span>`}${f && f.file ? `<br><span class="muted">${esc(f.file)}</span>` : ''}</li>`; };
    const block = `<section class="section"><p class="eyebrow">Oscar Abreu</p><h2 class="h3">${t('fuUpload')}</h2>
      <p class="muted">${t('fuUploadHelp')}</p>
      <ul class="bk-status">${FUND_LANGS.map(status).join('')}</ul>
      <form class="bk-form" data-form="fund" novalidate>
        <div class="field"><label for="fu-file">${t('bkFile')}</label><input id="fu-file" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></div>
        ${fuParsed ? `<p>${esc(t('fuFound', { s: fuParsed.sections.length, p: fuParsed.paragraphs }))}</p>
          ${fuParsed.sections.length !== 28 ? `<p class="status">${t('fuWarn')}</p>` : ''}
          <div class="field"><label for="fu-lang">${t('bkLang')}</label><select id="fu-lang">${FUND_LANGS.map(l => `<option value="${l}"${l === fuParsed.lang ? ' selected' : ''}>${L(LANG_NAMES[l])}</option>`).join('')}</select></div>
          <div class="btn-row"><button class="btn primary" type="submit">${t('bkUpload')}</button></div>` : ''}
        <p class="status" id="fu-status" role="status" aria-live="polite"${fuMsg ? '' : ' hidden'}>${esc(fuMsg)}</p>
      </form></section>`;
    return book().replace(/<\/div>\s*$/, block + '</div>');
  };
}
document.addEventListener('change', async e => {
  if (e.target.id !== 'fu-file' || !e.target.files[0]) return;
  const f = e.target.files[0], out = document.getElementById('fu-status');
  out.textContent = t('bkReading'); out.hidden = false;
  try {
    const { doc, styles } = await readDocx(await f.arrayBuffer());
    const parsed = parseFund(doc, styles, xmlText);
    if (parsed.sections.length < 10) { fuParsed = null; fuMsg = t('fuBad') + ' (' + f.name + ')'; }
    else { fuParsed = { ...parsed, file: f.name }; fuMsg = ''; }
  } catch (err) {
    fuParsed = null;
    fuMsg = (err.message === 'pdf' ? t('bkPdf') : err.message === 'offline' ? t('bkErr') : t('bkNotWord')) + ' (' + f.name + ')';
  }
  route();
});
EXTRA_FORMS.fund = async form => {
  if (!fuParsed) return;
  const l = form.querySelector('#fu-lang').value, out = form.querySelector('#fu-status'), btn = form.querySelector('button[type=submit]');
  const post = body => fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() }, body: JSON.stringify(body) })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  btn.disabled = true; out.hidden = false;
  try {
    const secs = fuParsed.sections.map(s => ({ key: s.key, blocks: s.blocks }));
    for (let i = 0; i < secs.length; i += 8) {
      out.textContent = t('bkUploading', { n: Math.min(i + 8, secs.length), total: secs.length });
      await post({ action: 'book-put', book: 'fu', lang: l, sections: secs.slice(i, i + 8) });
    }
    const doc = await post({ action: 'book-done', book: 'fu', lang: l, sections: secs.length, paragraphs: fuParsed.paragraphs, file: fuParsed.file });
    adData.fund = [...(adData.fund || []).filter(x => x.lang !== l), doc];
    fuParsed = null; fuMsg = t('bkDone', { lang: `${FUND_EDITIONS[l].title} · ${L(LANG_NAMES[l])}` });
    route();
  } catch (err) { btn.disabled = false; out.textContent = t('bkErr'); }
};
