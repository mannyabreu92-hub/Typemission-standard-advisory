// Two reader extras. "Share this passage": select up to 400 characters in the reader and the app draws a
// 1080 × 1920 image (the quote, Oscar Abreu · Ecce Homo, the chapter, the book's link) to share on Instagram or
// WhatsApp, as story.js does for events. "Search in the book" (#/buscar/<edition>/<words>): searches the free
// sample, and for owners the whole edition (the copy saved on the phone, else downloaded once from api/book.js),
// without accents or capitals mattering; a result opens the chapter at the passage, marked.

Object.assign(I18N.es, {
  qsBtn: 'Compartir este pasaje', qsTooLong: 'Seleccione un pasaje más corto (hasta 400 caracteres).',
  srBtn: 'Buscar en el libro', srPh: 'Una palabra o una frase', srGo: 'Buscar', srResults: '{n} resultados', srResult1: '1 resultado', srNone: 'Sin resultados.',
  srSampleOnly: 'La búsqueda incluye solo la muestra gratuita. Con la edición completa, busca en todo el libro.', srLoading: 'Cargando el libro…', srFirst: 'Se muestran los primeros 100.',
});
Object.assign(I18N.en, {
  qsBtn: 'Share this passage', qsTooLong: 'Select a shorter passage (up to 400 characters).',
  srBtn: 'Search in the book', srPh: 'A word or a phrase', srGo: 'Search', srResults: '{n} results', srResult1: '1 result', srNone: 'No results.',
  srSampleOnly: 'The search covers the free sample only. With the full edition, it searches the whole book.', srLoading: 'Loading the book…', srFirst: 'Showing the first 100.',
});
Object.assign(I18N.fr, {
  qsBtn: 'Partager ce passage', qsTooLong: 'Sélectionnez un passage plus court (jusqu’à 400 caractères).',
  srBtn: 'Rechercher dans le livre', srPh: 'Un mot ou une phrase', srGo: 'Rechercher', srResults: '{n} résultats', srResult1: '1 résultat', srNone: 'Aucun résultat.',
  srSampleOnly: 'La recherche porte seulement sur l’extrait gratuit. Avec l’édition complète, elle couvre tout le livre.', srLoading: 'Chargement du livre…', srFirst: 'Les 100 premiers sont affichés.',
});

/* ---------- Share a passage ---------- */

let qsText = '', qsWhere = null;
function qsCurrent() {
  const m = location.hash.match(/^#\/leer\/([a-z]{2})\/(\d+)/);
  return m && { l: m[1], ch: Math.min(Number(m[2]), CHAPTERS.length - 1) };
}
// The button appears (above the bottom menu) while a passage of the reader is selected.
document.addEventListener('selectionchange', () => {
  const sel = document.getSelection(), box = document.querySelector('.reader-text');
  const text = sel && !sel.isCollapsed && box && box.contains(sel.anchorNode) ? sel.toString().replace(/\s+/g, ' ').trim() : '';
  if (text.length >= 10) { qsText = text; qsWhere = qsCurrent(); }
  let btn = document.getElementById('qs-btn');
  if (text.length >= 10 && !btn) {
    document.body.insertAdjacentHTML('beforeend', `<button type="button" id="qs-btn" class="btn primary qs-btn">${t('qsBtn')}</button>`);
    document.getElementById('qs-btn').addEventListener('click', qsShare);
  } else if (!text && btn && !btn.matches(':focus')) setTimeout(() => { const b = document.getElementById('qs-btn'); if (b && !document.getSelection().toString().trim()) b.remove(); }, 400);
});
window.addEventListener('hashchange', () => { const b = document.getElementById('qs-btn'); if (b) b.remove(); });

async function qsDraw(quote, where) {
  const { w, h } = STORY, f = storyFonts(), c = document.createElement('canvas'); c.width = w; c.height = h;
  await Promise.all([`italic 400 64px ${f.serif}`, `600 64px ${f.serif}`, `500 30px ${f.sans}`].map(x => document.fonts.load(x).catch(() => {})));
  const ctx = c.getContext('2d');
  ctx.fillStyle = STORY.ink; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = STORY.gold; ctx.lineWidth = 2; ctx.strokeRect(60, 60, w - 120, h - 120);
  ctx.textAlign = 'center'; ctx.direction = 'ltr';
  ctx.fillStyle = STORY.gold; ctx.font = `500 30px ${f.sans}`; ctx.letterSpacing = '8px';
  ctx.fillText('ECCE HOMO', w / 2, 220); ctx.letterSpacing = '0px';
  // The largest size at which the quote fits in 13 lines.
  let size = 72, lines;
  do { ctx.font = `italic 400 ${size}px ${f.serif}`; lines = storyLines(ctx, '“' + quote + '”', w - 240, 99); size -= 4; } while (lines.length > 13 && size > 36);
  const lh = Math.round((size + 4) * 1.28);
  let y = (h - lines.length * lh) / 2 + lh * 0.6;
  ctx.fillStyle = STORY.paper;
  for (const line of lines) { ctx.fillText(line, w / 2, y); y += lh; }
  y += 40;
  ctx.strokeStyle = STORY.gold; ctx.beginPath(); ctx.moveTo(w / 2 - 120, y); ctx.lineTo(w / 2 + 120, y); ctx.stroke();
  ctx.fillStyle = STORY.soft; ctx.font = `600 44px ${f.serif}`; ctx.fillText('— Oscar Abreu', w / 2, y + 80);
  ctx.font = `400 32px ${f.sans}`; ctx.fillStyle = 'rgba(246,241,233,.75)';
  for (const [i, line] of storyLines(ctx, 'Ecce Homo · ' + where, w - 240, 2).entries()) ctx.fillText(line, w / 2, y + 140 + i * 44);
  ctx.fillStyle = STORY.gold; ctx.font = `500 30px ${f.sans}`; ctx.fillText(`${storyHost()}/b`, w / 2, h - 150);
  ctx.fillStyle = 'rgba(246,241,233,.6)'; ctx.font = `400 26px ${f.sans}`; ctx.fillText('Museo Abreu · Art Experiences', w / 2, h - 105);
  return new Promise(ok => c.toBlob(ok, 'image/png'));
}
async function qsShare() {
  const btn = document.getElementById('qs-btn');
  if (qsText.length > 400) { toast(t('qsTooLong')); return; }
  const w = qsWhere || qsCurrent() || { l: lang, ch: 0 }, c = CHAPTERS[w.ch];
  const where = (w.ch >= 1 && w.ch <= 70 ? t('chapterN', { n: TOC_EN.nums[w.ch - 1] }) : chTitle(c, w.l)) + ' · ' + L(LANG_NAMES[w.l]);
  try {
    const blob = await qsDraw(qsText, where), file = new File([blob], 'ecce-homo-oscar-abreu.png', { type: 'image/png' });
    if (typeof trackEvent === 'function') trackEvent('Passage shared', { lang: w.l, ch: w.ch });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], text: `“${qsText}” — Oscar Abreu, Ecce Homo · ${location.origin}/b?l=${lang}` }); } catch (e) {}
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast(t('igReady'));
    }
  } catch (e) { toast(t('igErr')); }
  if (btn) btn.remove();
}

/* ---------- Search in the book ---------- */

const srNorm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ё/g, 'е');
const srBooks = {};
// The edition's text by section key: the whole book for owners (phone copy, else one download), else the sample.
async function srText(l) {
  if (srBooks[l]) return srBooks[l];
  const sample = SAMPLES[l] ? { intro: SAMPLES[l].intro.map(x => ['p', x]), ch1: SAMPLES[l].ch1.map(x => ['p', x]) } : {};
  if (!owns(l) && !(typeof isPro === 'function' && isPro())) return (srBooks[l] = { sections: sample, full: false });
  const copy = await fbOfflineGet(l);
  if (copy && copy.sections) return (srBooks[l] = { sections: { ...sample, ...copy.sections }, full: true });
  const rd = fbReader();
  if (rd) try {
    const r = await fetch(`/api/book?lang=${l}&ch=all&e=${rd.e}&t=${rd.t}`, { cache: 'no-store' });
    if (r.ok) return (srBooks[l] = { sections: { ...sample, ...(await r.json()).sections }, full: true });
  } catch (e) {}
  return { sections: sample, full: false };
}
const srSnippet = (text, i, n) => {
  const a = Math.max(0, i - 70), b = Math.min(text.length, i + n + 90);
  return (a ? '…' : '') + esc(text.slice(a, i)) + '<mark>' + esc(text.slice(i, i + n)) + '</mark>' + esc(text.slice(i + n, b)) + (b < text.length ? '…' : '');
};
function pageSearch(l = lang, q = '') {
  if (!LANG_NAMES[l] || !EDITIONS.some(e => e.lang === l)) l = EDITIONS.some(e => e.lang === lang) ? lang : 'en';
  q = decodeURIComponent(q || '');
  setTimeout(() => srRun(l, q), 0);
  return `<div class="wrap reader search">
    <div class="reader-bar"><a href="#/biblioteca" class="btn small"><span class="arr">←</span> ${t('backToLib')}</a>
      <span class="muted">${t('bookTitle')} · ${L(LANG_NAMES[l])}</span></div>
    <section class="section"><h1 class="h2">${t('srBtn')}</h1>
      <form class="unlock-row sr-form" data-form="search" data-l="${l}" role="search">
        <label class="visually-hidden" for="sr-q">${t('srBtn')}</label>
        <input id="sr-q" type="search" value="${esc(q)}" placeholder="${esc(t('srPh'))}" autocomplete="off">
        <button class="btn primary" type="submit">${t('srGo')}</button></form>
      <div id="sr-out" aria-live="polite"></div></section></div>`;
}
async function srRun(l, q) {
  const out = document.getElementById('sr-out'); if (!out || q.trim().length < 2) return;
  out.innerHTML = `<p class="muted">${t('srLoading')}</p>`;
  const { sections, full } = await srText(l), nq = srNorm(q.trim()), hits = [];
  CHAPTERS.forEach((c, idx) => (sections[c.key] || []).forEach(([kind, text], pi) => {
    if (kind === 'y' || hits.length > 100) return;
    const i = srNorm(text).indexOf(nq);   // NFD keeps the length for these scripts, so i points into text too
    if (i >= 0) hits.push({ idx, pi, title: chTitle(c, l), snip: srSnippet(text, i, q.trim().length) });
  }));
  if (!document.getElementById('sr-out')) return;
  out.innerHTML = `${full ? '' : `<p class="muted">${t('srSampleOnly')}</p>`}
    <p class="sr-count">${hits.length ? (hits.length === 1 ? t('srResult1') : t('srResults', { n: Math.min(hits.length, 100) })) : t('srNone')}${hits.length > 100 ? ' ' + t('srFirst') : ''}</p>
    <ol class="sr-list" lang="${l}" dir="ltr">${hits.slice(0, 100).map(h => `<li><a href="#/leer/${l}/${h.idx}" data-action="srOpen" data-q="${esc(q.trim())}" data-p="${h.pi}">
      <strong>${esc(h.title)}</strong><span>${h.snip}</span></a></li>`).join('')}</ol>`;
}
EXTRA_FORMS.search = form => {
  const q = form.querySelector('#sr-q').value.trim();
  location.hash = `#/buscar/${form.dataset.l}/${encodeURIComponent(q)}`;
};
// Opening a result: the reader marks the passage and scrolls to it once the chapter's text is on the page.
Object.assign(EXTRA_ACTIONS, { srOpen: el => { try { sessionStorage.setItem('ma.find', JSON.stringify({ q: el.dataset.q, p: Number(el.dataset.p) })); } catch (e) {} location.hash = el.getAttribute('href'); } });
function srMark(tries = 0) {
  let f; try { f = JSON.parse(sessionStorage.getItem('ma.find') || 'null'); } catch (e) {}
  if (!f) return;
  const nq = srNorm(f.q), paras = [...document.querySelectorAll('.reader-text p')], target = paras.find(p => srNorm(p.textContent).includes(nq));
  if (!target) { if (tries < 15) setTimeout(() => srMark(tries + 1), 200); return; }
  try { sessionStorage.removeItem('ma.find'); } catch (e) {}
  const i = srNorm(target.textContent).indexOf(nq), tx = target.textContent;
  target.innerHTML = esc(tx.slice(0, i)) + '<mark class="sr-mark">' + esc(tx.slice(i, i + f.q.length)) + '</mark>' + esc(tx.slice(i + f.q.length));
  target.scrollIntoView({ block: 'center' });
}
Object.assign(EXTRA_ROUTES, { buscar: pageSearch });
Object.assign(ROUTE_SECTION, { buscar: 'biblioteca' });

// A search button in the reader's bar and in the library.
(window.APP_HOOKS ||= []).push(() => {
  const reader = pageReader;
  pageReader = (l = 'es', chStr = '0') => {
    setTimeout(() => srMark(), 0);
    return reader(l, chStr).replace(`${t('backToLib')}</a>`, `${t('backToLib')}</a><a class="btn small" href="#/buscar/${LANG_NAMES[l] ? l : 'es'}" aria-label="${esc(t('srBtn'))}">⌕ <span class="sr-label">${t('srGo')}</span></a>`);
  };
  routes.leer = pageReader;
  const library = pageLibrary;
  pageLibrary = () => {
    const html = library(), m = html.match(/href="#\/leer\/([a-z]{2})\/0"/);
    return html.replace('<div class="btn-row">', `<div class="btn-row"><a class="btn" href="#/buscar/${m ? m[1] : lang}">${t('srBtn')}</a>`);
  };
  routes.biblioteca = pageLibrary;
});
