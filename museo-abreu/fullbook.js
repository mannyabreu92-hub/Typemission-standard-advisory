// The whole of Ecce Homo inside the app. The museum uploads each edition from its Word file
// (Dashboard › Full book, #/admin/libro): the file is read here in the browser (introduction, 70 chapters
// with their subheadings, acknowledgements, chronology) and sent in batches to api/admin.js, which keeps it
// privately. In the reader, chapters beyond the free sample load from api/book.js for buyers of that
// edition (or Pro), with the reading token the app received when it unlocked the purchase.

Object.assign(I18N.es, {
  fbNotYet: 'El texto completo de esta edición estará aquí muy pronto. Mientras tanto, puede leerlo en su cuenta de Whop.',
  fbNeedUnlock: 'Para leer aquí, active su compra con el correo que usó en Whop.', fbUnlockBtn: 'Activar mi compra',
  fbErr: 'No se pudo cargar el capítulo. Revise su conexión.', fbNotOwned: 'Su compra no incluye esta edición.',
  bkTitle: 'Libro completo en la app', bkLead: 'Suba cada edición desde su archivo Word (.docx). El texto se guarda en privado y solo lo leen quienes compraron esa edición (o los miembros Pro).',
  bkFile: 'Archivo Word de una edición', bkFound: 'Encontrado: {s} secciones · {p} párrafos · primer capítulo: «{first}»', bkLang: 'Edición',
  bkUpload: 'Subir esta edición', bkUploading: 'Subiendo… {n} de {total}', bkDone: 'Edición subida: {lang}.', bkErr: 'No se pudo subir. Revise la conexión e inténtelo de nuevo.',
  bkBad: 'Este archivo no parece una edición de Ecce Homo: no se encontraron capítulos.', bkWarn: 'Atención: se esperaban 73 secciones (introducción, 70 capítulos, agradecimientos y cronología).',
  bkStatus: 'Subida el {date} · {s} secciones', bkMissing: 'Aún no subida', adBook: 'Libro completo', bkPdf: 'Este archivo es un PDF. Elija la versión Word (.docx) del libro.', bkNotWord: 'Este archivo no es un documento Word (.docx). Elija el archivo Word del libro.', bkReading: 'Leyendo el archivo…',
});
Object.assign(I18N.en, {
  fbNotYet: 'The full text of this edition will be here very soon. Meanwhile, you can read it in your Whop account.',
  fbNeedUnlock: 'To read here, unlock your purchase with the email you used on Whop.', fbUnlockBtn: 'Unlock my purchase',
  fbErr: 'The chapter could not be loaded. Check your connection.', fbNotOwned: 'Your purchase does not include this edition.',
  bkTitle: 'The full book in the app', bkLead: 'Upload each edition from its Word file (.docx). The text is kept privately and only buyers of that edition (or Pro members) can read it.',
  bkFile: 'Word file of an edition', bkFound: 'Found: {s} sections · {p} paragraphs · first chapter: “{first}”', bkLang: 'Edition',
  bkUpload: 'Upload this edition', bkUploading: 'Uploading… {n} of {total}', bkDone: 'Edition uploaded: {lang}.', bkErr: 'Could not upload. Check the connection and try again.',
  bkBad: 'This file does not look like an edition of Ecce Homo: no chapters were found.', bkWarn: 'Note: 73 sections were expected (introduction, 70 chapters, acknowledgements and chronology).',
  bkStatus: 'Uploaded on {date} · {s} sections', bkMissing: 'Not uploaded yet', adBook: 'Full book', bkPdf: 'This file is a PDF. Choose the Word (.docx) version of the book.', bkNotWord: 'This file is not a Word document (.docx). Choose the book’s Word file.', bkReading: 'Reading the file…',
});
Object.assign(I18N.fr, {
  fbNotYet: 'Le texte intégral de cette édition sera ici très bientôt. En attendant, vous pouvez le lire dans votre compte Whop.',
  fbNeedUnlock: 'Pour lire ici, activez votre achat avec l’e-mail utilisé sur Whop.', fbUnlockBtn: 'Activer mon achat',
  fbErr: 'Le chapitre n’a pas pu être chargé. Vérifiez votre connexion.', fbNotOwned: 'Votre achat n’inclut pas cette édition.',
  bkTitle: 'Le livre intégral dans l’app', bkLead: 'Téléversez chaque édition depuis son fichier Word (.docx). Le texte est conservé en privé et seuls les acheteurs de cette édition (ou les membres Pro) peuvent le lire.',
  bkFile: 'Fichier Word d’une édition', bkFound: 'Trouvé : {s} sections · {p} paragraphes · premier chapitre : « {first} »', bkLang: 'Édition',
  bkUpload: 'Téléverser cette édition', bkUploading: 'Téléversement… {n} sur {total}', bkDone: 'Édition téléversée : {lang}.', bkErr: 'Téléversement impossible. Vérifiez la connexion et réessayez.',
  bkBad: 'Ce fichier ne ressemble pas à une édition d’Ecce Homo : aucun chapitre trouvé.', bkWarn: 'Attention : 73 sections étaient attendues (introduction, 70 chapitres, remerciements et chronologie).',
  bkStatus: 'Téléversée le {date} · {s} sections', bkMissing: 'Pas encore téléversée', adBook: 'Livre intégral', bkPdf: 'Ce fichier est un PDF. Choisissez la version Word (.docx) du livre.', bkNotWord: 'Ce fichier n’est pas un document Word (.docx). Choisissez le fichier Word du livre.', bkReading: 'Lecture du fichier…',
});

/* ---------- Reading a Word file in the browser ---------- */

// The Word file's text: a .docx is a zip, opened with fflate (vendor/fflate.js, loaded on first use; it works the
// same in every browser, iPhone included). A PDF or another kind of file is reported as such.
async function readDocx(buf) {
  const u8 = new Uint8Array(buf), head = String.fromCharCode(...u8.subarray(0, 5));
  if (head.startsWith('%PDF')) throw new Error('pdf');
  if (!head.startsWith('PK')) throw new Error('notword');
  if (typeof fflate === 'undefined') await new Promise((ok, fail) => { const sc = document.createElement('script'); sc.src = 'vendor/fflate.js'; sc.onload = ok; sc.onerror = () => fail(new Error('offline')); document.head.appendChild(sc); });
  const want = ['word/document.xml', 'word/styles.xml'];
  const files = fflate.unzipSync(u8, { filter: f => want.includes(f.name) });
  if (!files['word/document.xml']) throw new Error('notword');
  const dec = new TextDecoder();
  return { doc: dec.decode(files['word/document.xml']), styles: files['word/styles.xml'] ? dec.decode(files['word/styles.xml']) : '' };
}

const BOOK_LANG_BY_HEADING = { 'CAPÍTULO': 'es', CHAPTER: 'en', CHAPITRE: 'fr', KAPITEL: 'de', 'ГЛАВА': 'ru', CAPITOLO: 'it' };
const xmlText = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&amp;/g, '&');

// Same reading as the build scripts: the book's Word styles (Sección, Capítulo número/título/subtítulo,
// Cronología año, Texto) mark the parts. Sections 3–5 are the introduction, acknowledgements and chronology.
function parseBook(doc, styles) {
  const names = {};
  for (const m of styles.matchAll(/<w:style [^>]*w:styleId="([^"]+)"[^>]*>[\s\S]*?<w:name w:val="([^"]+)"/g)) names[m[1]] = m[2];
  const sections = [], SEC = { 2: 'intro', 3: 'ack', 4: 'chrono' };
  let cur = null, secN = -1, chN = 0, firstHeading = '', firstTitle = '', paragraphs = 0, pendingTitle = false;
  for (const m of doc.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const p = m[0], sid = (p.match(/<w:pStyle w:val="([^"]+)"/) || [])[1], style = sid ? (names[sid] || sid) : 'Normal';
    const runs = p.replace(/<w:(br|cr)[^>]*\/>/g, '<w:t>\n</w:t>').replace(/<w:tab\/>/g, '<w:t> </w:t>');
    const tx = xmlText([...runs.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map(x => x[1]).join('')).trim();
    if (!tx) continue;
    if (style === 'Sección') { secN++; cur = SEC[secN] ? { key: SEC[secN], blocks: [] } : null; if (cur) sections.push(cur); continue; }
    if (style === 'Capítulo número') { chN++; if (!firstHeading) firstHeading = tx; cur = { key: 'ch' + chN, blocks: [] }; sections.push(cur); pendingTitle = chN === 1; continue; }
    if (style === 'Capítulo título') { if (pendingTitle) { firstTitle = tx; pendingTitle = false; } continue; }
    if (!cur) continue;
    if (style === 'Texto') { cur.blocks.push(['p', tx]); paragraphs++; }
    else if (style === 'Capítulo subtítulo') cur.blocks.push(['h', tx]);
    else if (style === 'Cronología año') cur.blocks.push(['y', tx]);
  }
  if (!chN) return parseBookByText(doc);
  const word = firstHeading.split(/\s+/)[0].toUpperCase();
  return { sections: sections.filter(s => s.blocks.length), paragraphs, lang: BOOK_LANG_BY_HEADING[word] || '', first: firstTitle };
}

// The same book without its Word styles: chapters are found by their headings ("CAPÍTULO IV", "KAPITEL IV"…),
// the title is the paragraph after; the introduction, acknowledgements and chronology by their capitalised
// headings in each language; chronology years are paragraphs that are just a year. Subheadings read as text.
const BOOK_SECTION_HEADINGS = {
  intro: ['INTRODUCCIÓN', 'INTRODUCTION', 'EINLEITUNG', 'ВВЕДЕНИЕ', 'INTRODUZIONE'],
  ack: ['AGRADECIMIENTOS', 'ACKNOWLEDGMENTS', 'ACKNOWLEDGEMENTS', 'REMERCIEMENTS', 'DANKSAGUNG', 'БЛАГОДАРНОСТИ', 'RINGRAZIAMENTI'],
  chrono: ['CRONOLOGÍA BIOGRÁFICA', 'BIOGRAPHICAL CHRONOLOGY', 'CHRONOLOGIE BIOGRAPHIQUE', 'BIOGRAFISCHE ZEITTAFEL', 'БИОГРАФИЧЕСКАЯ ХРОНИКА', 'CRONOLOGIA BIOGRAFICA'],
};
function parseBookByText(doc) {
  const sections = []; let cur = null, chN = 0, firstHeading = '', firstTitle = '', paragraphs = 0, needTitle = false;
  for (const m of doc.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const runs = m[0].replace(/<w:(br|cr)[^>]*\/>/g, '<w:t>\n</w:t>').replace(/<w:tab\/>/g, '<w:t> </w:t>');
    const tx = xmlText([...runs.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map(x => x[1]).join('')).trim();
    if (!tx) continue;
    const sec = Object.keys(BOOK_SECTION_HEADINGS).find(k => BOOK_SECTION_HEADINGS[k].includes(tx));
    if (sec) { cur = { key: sec, blocks: [] }; sections.push(cur); continue; }
    if (/^(CAPÍTULO|CHAPTER|CHAPITRE|KAPITEL|ГЛАВА|CAPITOLO)\s+[IVXLC]+\.?$/.test(tx)) {
      chN++; if (!firstHeading) firstHeading = tx; cur = { key: 'ch' + chN, blocks: [] }; sections.push(cur); needTitle = true; continue;
    }
    if (needTitle) { if (chN === 1) firstTitle = tx; needTitle = false; continue; }
    if (!cur) continue;
    if (cur.key === 'chrono' && /^\d{4}(\s*[–-]\s*\d{2,4})?$/.test(tx)) cur.blocks.push(['y', tx]);
    else { cur.blocks.push(['p', tx]); paragraphs++; }
  }
  const word = firstHeading.split(/\s+/)[0].toUpperCase();
  return { sections: sections.filter(s => s.blocks.length), paragraphs, lang: BOOK_LANG_BY_HEADING[word] || '', first: firstTitle };
}

/* ---------- Dashboard › Full book ---------- */

let bkParsed = null, bkMsg = '';
function pageBook() {
  const books = adData.books || [], langs = EDITIONS.map(e => e.lang);
  return `<div class="wrap admin">
    <a href="#/admin" class="btn small"><span class="arr">←</span> ${t('adBack')}</a>
    <section class="section"><p class="eyebrow">Ecce Homo</p><h1 class="h2">${t('bkTitle')}</h1>
      <p class="muted">${t('bkLead')}</p>
      <ul class="bk-status">${langs.map(l => { const b = books.find(x => x.lang === l);
        return `<li><strong>${L(LANG_NAMES[l])}</strong> · ${b ? `<span class="remind-on">${t('bkStatus', { date: adStamp(b.at), s: b.sections })}</span>` : `<span class="muted">${t('bkMissing')}</span>`}</li>`; }).join('')}</ul>
      <form class="bk-form" data-form="book" novalidate>
        <div class="field"><label for="bk-file">${t('bkFile')}</label><input id="bk-file" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></div>
        ${bkParsed ? `<p>${esc(t('bkFound', { s: bkParsed.sections.length, p: bkParsed.paragraphs, first: bkParsed.first }))}</p>
          ${bkParsed.sections.length !== 73 ? `<p class="status">${t('bkWarn')}</p>` : ''}
          <div class="field"><label for="bk-lang">${t('bkLang')}</label><select id="bk-lang">${langs.map(l => `<option value="${l}"${l === bkParsed.lang ? ' selected' : ''}>${L(LANG_NAMES[l])}</option>`).join('')}</select></div>
          <div class="btn-row"><button class="btn primary" type="submit">${t('bkUpload')}</button></div>` : ''}
        <p class="status" id="bk-status" role="status" aria-live="polite"${bkMsg ? '' : ' hidden'}>${esc(bkMsg)}</p>
      </form>
    </section></div>`;
}
document.addEventListener('change', async e => {
  if (e.target.id !== 'bk-file' || !e.target.files[0]) return;
  const f = e.target.files[0], out = document.getElementById('bk-status');
  out.textContent = t('bkReading'); out.hidden = false;
  try {
    const { doc, styles } = await readDocx(await f.arrayBuffer());
    const parsed = parseBook(doc, styles);
    if (!parsed.sections.some(s => /^ch\d/.test(s.key))) { bkParsed = null; bkMsg = t('bkBad') + ' (' + f.name + ')'; }
    else { bkParsed = { ...parsed, file: f.name }; bkMsg = ''; }
  } catch (err) {
    bkParsed = null;
    bkMsg = (err.message === 'pdf' ? t('bkPdf') : err.message === 'offline' ? t('bkErr') : t('bkNotWord')) + ' (' + f.name + ')';
  }
  route();
});
EXTRA_FORMS.book = async form => {
  if (!bkParsed) return;
  const lang = form.querySelector('#bk-lang').value, out = form.querySelector('#bk-status'), btn = form.querySelector('button[type=submit]');
  const post = body => fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() }, body: JSON.stringify(body) })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  btn.disabled = true; out.hidden = false;
  try {
    const secs = bkParsed.sections;
    for (let i = 0; i < secs.length; i += 8) {
      out.textContent = t('bkUploading', { n: Math.min(i + 8, secs.length), total: secs.length });
      await post({ action: 'book-put', lang, sections: secs.slice(i, i + 8) });
    }
    const doc = await post({ action: 'book-done', lang, sections: secs.length, paragraphs: bkParsed.paragraphs, file: bkParsed.file });
    adData.books = [...(adData.books || []).filter(b => b.lang !== lang), doc];
    bkParsed = null; bkMsg = t('bkDone', { lang: L(LANG_NAMES[lang]) });
    route();
  } catch (err) { btn.disabled = false; out.textContent = t('bkErr'); }
};
{
  const route0 = EXTRA_ROUTES.admin;
  EXTRA_ROUTES.admin = (sub, ev, date) => sub === 'libro' && adData ? pageBook() : route0(sub, ev, date);
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    return adData ? html.replace('<button class="btn" data-action="adRefresh">', `<a class="btn" href="#/admin/libro">${t('adBook')}</a><button class="btn" data-action="adRefresh">`) : html;
  };
}

/* ---------- The reader: full chapters for owners ---------- */

const fbCache = {};
const fbReader = () => fx.get('reader', null);
const fbBlocks = blocks => blocks.map(([k, x]) => k === 'p' ? `<p>${esc(x)}</p>` : k === 'y' ? `<h2 class="chrono-year">${esc(x)}</h2>` : `<h2 class="ch-sub">${esc(x)}</h2>`).join('');
async function fbLoad(l, key) {
  const box = document.getElementById('fb-text'); if (!box) return;
  const rd = fbReader();
  if (!rd) { box.innerHTML = `<div class="empty"><p>${t('fbNeedUnlock')}</p><div class="btn-row" style="justify-content:center"><a class="btn primary" href="#/cuenta">${t('fbUnlockBtn')}</a></div></div>`; return; }
  try {
    const r = await fetch(`/api/book?lang=${l}&ch=${key}&e=${rd.e}&t=${rd.t}`, { cache: 'no-store' });
    const d = await r.json().catch(() => ({}));
    if (r.ok) { fbCache[l + ':' + key] = d.blocks; if (box.isConnected) box.innerHTML = fbBlocks(d.blocks); return; }
    box.innerHTML = `<div class="empty"><p>${d.error === 'not-uploaded' ? t('fbNotYet') : d.error === 'not-owned' ? t('fbNotOwned') : d.error === 'token' ? t('fbNeedUnlock') : t('fbErr')}</p>
      ${d.error === 'token' || d.error === 'not-owned' ? `<div class="btn-row" style="justify-content:center"><a class="btn primary" href="#/cuenta">${t('fbUnlockBtn')}</a></div>` : ''}</div>`;
  } catch (e) { box.innerHTML = `<div class="empty"><p>${t('fbErr')}</p></div>`; }
}
// pageReader is defined in app.js, which loads last: it is wrapped from app.js's hook, and the route updated.
(window.APP_HOOKS ||= []).push(() => {
  const reader = pageReader;
  pageReader = (l = 'es', chStr = '0') => {
    const html = reader(l, chStr);
    const ch = Math.min(Math.max(0, parseInt(chStr, 10) || 0), CHAPTERS.length - 1), c = CHAPTERS[ch];
    if (!LANG_NAMES[l]) l = 'es';
    const mark = `<p class="muted" style="font-family:var(--sans);font-size:.9rem">${t('chapterPlaceholder')}</p>`;
    if (!html.includes(mark)) return html;
    const cached = fbCache[l + ':' + c.key];
    if (!cached) setTimeout(() => fbLoad(l, c.key), 0);
    return html.replace(mark, `<div id="fb-text">${cached ? fbBlocks(cached) : `<p class="muted">${t('loadingText')}</p>`}</div>`);
  };
  routes.leer = pageReader;
});
