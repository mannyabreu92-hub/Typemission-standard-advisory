// Fundamentos del Psico-Expresionismo (Oscar Abreu, 2026, Spanish): the second book sold in the app.
// #/fundamentos is its page (cover, the author's own words from his note, contents, buy or request a copy);
// #/fundamentos/<n> reads section n. The free sample (sample-fund.js) is the note, the introduction and
// chapter 1; the rest comes from the server (api/book.js, b=fu) for owners of "fund-es" or Pro, once the
// museum uploads the Word file in Dashboard › Full book. Whop key: BOOKING.whop['fund-es']; price: FUND_PRICE.

const FUND_PRICE = null;   // USD; with a Whop link, the page offers Buy. Until then: request a copy by WhatsApp.
const FUND_FREE = 3;       // sections 0–2 are free

Object.assign(I18N.es, {
  fuEyebrow: 'Nuevo libro de Oscar Abreu', fuAlso: 'Del mismo autor',
  fuLead: 'Oscar Abreu examina los principios, el vocabulario visual, los procedimientos y los límites del Psico-Expresionismo. Acompaña a Ecce Homo y puede leerse por separado.',
  fuEdition: 'Edición digital en español · ARTFORO Editions, 2026', fuRequest: 'Solicitar la edición digital', fuCredits: 'Créditos de la edición', fuWords: 'En palabras del autor', fuPro: 'Incluido en Pro',
  waFund: 'Hola, quiero la edición digital de Fundamentos del Psico-Expresionismo.', fuUpload: 'Fundamentos del Psico-Expresionismo',
  fuUploadHelp: 'Elija el archivo Word del libro. Se esperan 28 secciones: nota, introducción, 19 capítulos y siete secciones finales.',
  fuFound: 'Encontradas {s} secciones y {p} párrafos.', fuWarn: 'Atención: se esperaban 28 secciones.', fuBad: 'Este archivo no parece Fundamentos del Psico-Expresionismo.',
});
Object.assign(I18N.en, {
  fuEyebrow: 'New book by Oscar Abreu', fuAlso: 'Also by Oscar Abreu',
  fuLead: 'Oscar Abreu examines the principles, visual vocabulary, procedures and limits of Psycho-Expressionism. A companion to Ecce Homo that can be read on its own.',
  fuEdition: 'Digital edition in Spanish · ARTFORO Editions, 2026', fuRequest: 'Request the digital edition', fuCredits: 'Edition credits', fuWords: 'In the author’s words', fuPro: 'Included in Pro',
  waFund: 'Hello, I would like the digital edition of Fundamentos del Psico-Expresionismo.', fuUpload: 'Fundamentos del Psico-Expresionismo',
  fuUploadHelp: 'Choose the book’s Word file. 28 sections are expected: note, introduction, 19 chapters and seven closing sections.',
  fuFound: 'Found {s} sections and {p} paragraphs.', fuWarn: 'Note: 28 sections were expected.', fuBad: 'This file does not look like Fundamentos del Psico-Expresionismo.',
});
Object.assign(I18N.fr, {
  fuEyebrow: 'Nouveau livre d’Oscar Abreu', fuAlso: 'Du même auteur',
  fuLead: 'Oscar Abreu examine les principes, le vocabulaire visuel, les procédés et les limites du Psycho-Expressionnisme. Un compagnon d’Ecce Homo qui peut se lire séparément.',
  fuEdition: 'Édition numérique en espagnol · ARTFORO Editions, 2026', fuRequest: 'Demander l’édition numérique', fuCredits: 'Crédits de l’édition', fuWords: 'Selon l’auteur', fuPro: 'Inclus dans Pro',
  waFund: 'Bonjour, je souhaite l’édition numérique de Fundamentos del Psico-Expresionismo.', fuUpload: 'Fundamentos del Psico-Expresionismo',
  fuUploadHelp: 'Choisissez le fichier Word du livre. 28 sections sont attendues : note, introduction, 19 chapitres et sept sections finales.',
  fuFound: '{s} sections et {p} paragraphes trouvés.', fuWarn: 'Attention : 28 sections étaient attendues.', fuBad: 'Ce fichier ne ressemble pas à Fundamentos del Psico-Expresionismo.',
});

const fuOwns = () => fx.get('books2', []).includes('fund-es') || (typeof isPro === 'function' && isPro());
const fuCanRead = n => n < FUND_FREE || fuOwns();
const fuCover = () => `<svg viewBox="0 0 400 600" role="img" aria-label="${esc(FUND.title)}">${artLayer(9, 1).replace('height="500"', 'height="600"')}
  <rect y="360" width="400" height="240" fill="#16120f"/><rect x="28" y="384" width="56" height="2" fill="#c4a76c"/>
  <text x="28" y="430" fill="#f6f1e9" font-family="Cormorant Garamond, serif" font-size="40" font-weight="600" letter-spacing="1.5">FUNDAMENTOS</text>
  <text x="28" y="466" fill="#f6f1e9" font-family="Cormorant Garamond, serif" font-size="25" font-weight="600" letter-spacing="1">DEL PSICO-EXPRESIONISMO</text>
  <text x="28" y="502" fill="#e9dfd0" font-family="Cormorant Garamond, serif" font-size="17" font-style="italic">La materia, la memoria y la transformación humana</text>
  <text x="28" y="560" fill="#c4a76c" font-family="Work Sans, sans-serif" font-size="16" letter-spacing="4">OSCAR ABREU</text></svg>`;

// Buy on Whop once there is a price and a link; otherwise a request by WhatsApp. Digital only for now.
function fuBuyButton(cls = 'btn primary') {
  if (fuOwns()) return '';
  if (FUND_PRICE && whopLink('fund-es')) return `<button class="${cls}" data-action="fuBuy">${t('buyOnline', { price: usd(FUND_PRICE) })}</button>`;
  const wa = whatsappLink(t('waFund'));
  return wa ? `<a class="${cls}" href="${wa}" target="_blank" rel="noopener">${t('fuRequest')}</a>` : '';
}
EXTRA_ACTIONS.fuBuy = () => checkout({ title: FUND.title, sub: 'Oscar Abreu · ' + t('fuEdition'), price: FUND_PRICE, link: whopLink('fund-es'), provider: 'Whop' });

function pageFund() {
  const note = FUND.sample.s0.find(b => b[0] === 'p' && /acompaña mi autobiografía/.test(b[1]));
  const item = (s, i) => fuCanRead(i)
    ? `<li><a href="#/fundamentos/${i}"><span>${esc(s.title)}</span><span class="muted">${i < FUND_FREE ? t('free') : ''}</span></a></li>`
    : `<li><span><span>${esc(s.title)}</span><span>🔒</span></span></li>`;
  let part = '';
  const toc = FUND.toc.map((s, i) => { const head = s.part && s.part !== part ? `<li class="fu-part" aria-hidden="true">${esc(s.part)}</li>` : ''; part = s.part; return head + item(s, i); }).join('');
  return `<div class="wrap">
    <section class="section book">
      <div class="cover">${fuCover()}</div>
      <div>
        <p class="eyebrow">${t('fuEyebrow')}</p>
        <h1 lang="es">${esc(FUND.title)}</h1>
        <p lang="es" style="font-family:var(--serif);font-size:1.4rem;font-style:italic">${esc(FUND.subtitle)}</p>
        <p class="muted" style="margin:.3rem 0 1rem">Oscar Abreu · ${t('fuEdition')}</p>
        <p class="lead">${t('fuLead')}</p>
        <div class="btn-row">
          <a class="btn ${fuOwns() ? 'primary' : ''}" href="#/fundamentos/${fx.get('fuLast', 0)}">${fuOwns() ? t('read') : t('readSample')}</a>
          ${fuBuyButton()}
        </div>
        <p class="muted" style="margin-top:.6rem">${t('fuPro')} · <a href="#/pro">Pro</a></p>
      </div>
    </section>
    ${note ? `<section class="section"><h2 class="h3">${t('fuWords')}</h2><figure class="quote"><blockquote lang="es">“${esc(note[1])}”</blockquote>
      <figcaption class="muted">— Oscar Abreu, ${esc(FUND.toc[0].title)}</figcaption></figure></section>` : ''}
    <section class="section"><h2>${t('contents')}</h2><ol class="toc fu-toc" lang="es">${toc}</ol></section>
    <section class="section"><details class="ed-credits"><summary>${t('fuCredits')}</summary>${FUND.credits.map(c => `<p lang="es">${esc(c)}</p>`).join('')}</details></section>
  </div>`;
}

function pageFundReader(nStr) {
  const n = Math.min(Math.max(0, parseInt(nStr, 10) || 0), FUND.toc.length - 1), s = FUND.toc[n];
  let body;
  if (!fuCanRead(n)) body = `<div class="empty">🔒<p>${t('lockedChapter')}</p><div class="btn-row" style="justify-content:center">${fuBuyButton()}<a class="btn" href="#/pro">Pro</a></div></div>`;
  else {
    fx.set('fuLast', n);
    body = n < FUND_FREE ? fbBlocks(FUND.sample['s' + n]) : `<div id="fu-text"><p class="muted">${t('srLoading')}</p></div>`;
    if (n >= FUND_FREE) setTimeout(() => fuLoad(n), 0);
  }
  return `<div class="wrap reader">
    <div class="reader-bar">
      <a href="#/fundamentos" class="btn small"><span class="arr">←</span> ${t('contents')}</a>
      <span class="muted" lang="es">${esc(FUND.title)}</span>
      <div style="display:flex;gap:.3rem" role="group" aria-label="${t('fontSize')}">
        <button class="btn small" data-action="font" data-d="-0.1" aria-label="${t('fontSize')} −">A−</button>
        <button class="btn small" data-action="font" data-d="0.1" aria-label="${t('fontSize')} +">A+</button>
      </div>
    </div>
    <article class="reader-text" lang="es" dir="ltr" style="font-size:${reading.fontSize}rem">
      ${s.part ? `<p class="eyebrow">${esc(s.part)}</p>` : ''}<h1 class="ch-title">${esc(s.title)}</h1>${body}</article>
    <nav class="reader-nav">
      ${n > 0 ? `<a class="btn small" href="#/fundamentos/${n - 1}"><span class="arr">←</span> ${t('prev')}</a>` : '<span></span>'}
      ${n < FUND.toc.length - 1 ? `<a class="btn small dark" href="#/fundamentos/${n + 1}">${t('next')} <span class="arr">→</span></a>` : ''}
    </nav>
  </div>`;
}

const fuCache = {};
async function fuLoad(n) {
  const box = document.getElementById('fu-text'); if (!box) return;
  const key = 's' + n, show = blocks => { fuCache[key] = blocks; if (box.isConnected) box.innerHTML = fbBlocks(blocks); };
  if (fuCache[key]) return show(fuCache[key]);
  const rd = fbReader();
  if (!rd) return (box.innerHTML = fbMsg(t('fbNeedUnlock'), true));
  try {
    const r = await fetch(`/api/book?b=fu&lang=es&ch=${key}&e=${rd.e}&t=${rd.t}`, { cache: 'no-store' });
    const d = await r.json().catch(() => ({}));
    if (r.ok) return show(d.blocks);
    if (r.status === 403) return (box.innerHTML = fbMsg(d.error === 'not-owned' ? t('fbNotOwned') : t('fbNeedUnlock'), true));
    box.innerHTML = fbMsg(d.error === 'not-uploaded' ? t('fbNotYet') : t('fbErr'));
  } catch (e) { box.innerHTML = fbMsg(t('fbErr')); }
}

EXTRA_ROUTES.fundamentos = n => n === undefined || n === '' ? pageFund() : pageFundReader(n);
Object.assign(ROUTE_SECTION, { fundamentos: 'biblioteca' });

// The book in the Library (after Ecce Homo) and in the Shop.
{
  const fuCard = () => `<section class="section"><p class="eyebrow">${t('fuAlso')}</p>
    <a class="card shop-banner" href="#/fundamentos"><div class="cover">${fuCover()}</div>
      <div><h3 lang="es">${esc(FUND.title)}</h3><p class="muted" lang="es">${esc(FUND.subtitle)}</p><p style="margin-top:.4rem">${t('fuLead')}</p></div></a></section>`;
  const lib = libraryExtras;
  libraryExtras = () => fuCard() + lib();
  const shop = pageShop;
  pageShop = () => shop().replace(/<\/div>\s*$/, fuCard() + '</div>');
  EXTRA_ROUTES.tienda = pageShop;
}

/* ---------- Dashboard › Full book: upload this book too ---------- */

let fuParsed = null, fuMsg = '';
{
  const book = pageBook;
  pageBook = () => {
    const f = (adData.fund || [])[0];
    const block = `<section class="section"><p class="eyebrow">Oscar Abreu</p><h2 class="h3" lang="es">${t('fuUpload')}</h2>
      <p class="muted">${t('fuUploadHelp')}</p>
      <ul class="bk-status"><li><strong>${L(LANG_NAMES.es)}</strong> · ${!f ? `<span class="muted">${t('bkMissing')}</span>`
        : f.sections === FUND.toc.length ? `<span class="remind-on">${t('bkStatus', { date: adStamp(f.at), s: f.sections })}</span>` : `<span class="bk-short">${t('fuWarn')}</span>`}${f && f.file ? `<br><span class="muted">${esc(f.file)}</span>` : ''}</li></ul>
      <form class="bk-form" data-form="fund" novalidate>
        <div class="field"><label for="fu-file">${t('bkFile')}</label><input id="fu-file" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></div>
        ${fuParsed ? `<p>${esc(t('fuFound', { s: fuParsed.sections.length, p: fuParsed.paragraphs }))}</p>
          ${fuParsed.sections.length !== FUND.toc.length ? `<p class="status">${t('fuWarn')}</p>` : ''}
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
  const out = form.querySelector('#fu-status'), btn = form.querySelector('button[type=submit]');
  const post = body => fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() }, body: JSON.stringify(body) })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  btn.disabled = true; out.hidden = false;
  try {
    const secs = fuParsed.sections.map(s => ({ key: s.key, blocks: s.blocks }));
    for (let i = 0; i < secs.length; i += 8) {
      out.textContent = t('bkUploading', { n: Math.min(i + 8, secs.length), total: secs.length });
      await post({ action: 'book-put', book: 'fu', lang: 'es', sections: secs.slice(i, i + 8) });
    }
    const doc = await post({ action: 'book-done', book: 'fu', lang: 'es', sections: secs.length, paragraphs: fuParsed.paragraphs, file: fuParsed.file });
    adData.fund = [doc];
    fuParsed = null; fuMsg = t('bkDone', { lang: FUND.title });
    route();
  } catch (err) { btn.disabled = false; out.textContent = t('bkErr'); }
};
