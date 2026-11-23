// Reads a Word file of Fundamentos del Psico-Expresionismo or one of its editions (English, French, Portuguese,
// Italian, German, Japanese, Chinese), which all follow the Spanish paragraph by paragraph with the same "heading 1/2/3" styles, into
// sections, the same way in the dashboard upload (fundamentos.js) and in the build of the free samples. It goes by
// that shared structure, not by the words of any one language: the first four "heading 1" are the front matter
// (title, credits, dedication, contents); each later "heading 1" opens a section, except the four part names
// (ORIGEN / ORIGIN…), which follow a "heading 3" ("PRIMERA PARTE", "PART ONE"…) and label the next chapters.
// The back matter (from section 21, the twelve foundations, on) belongs to no part. Subheadings ("heading 2") are
// blocks ['h', text]; paragraphs ['p', text]. The edition's language comes from the heading of its note.
// The Japanese and Chinese editions also set each chapter's number ("第1章") as a "heading 3" before its title: skipped, since
// the contents already give it ("第1章　…").
const FUND_NOTE_LANG = [[/^NOTA A ESTA EDICI[ÓO]N/i, 'es'], [/^NOTA A ESTA EDI[ÇC][ÃA]O/i, 'pt'], [/^A NOTE ON THIS EDITION/i, 'en'],
  [/^NOTE SUR CETTE [ÉE]DITION/i, 'fr'], [/^NOTA A QUESTA EDIZIONE/i, 'it'], [/^ZU DIESER AUSGABE/i, 'de'], [/^本版について/, 'ja'], [/^关于本版/, 'zh']];
// The contents' heading in each edition, which closes the front matter when it is the fifth heading.
const FUND_CONTENTS = /^(ÍNDICE|INDICE|ÍNDICE GERAL|SUMÁRIO|CONTENTS|TABLE DES MATIÈRES|SOMMAIRE|INHALT|INHALTSVERZEICHNIS|INDICE GENERALE|目次|目录)$/i;
function parseFund(doc, styles, text = s => s) {
  const names = {};
  for (const m of styles.matchAll(/<w:style [^>]*w:styleId="([^"]+)"[^>]*>[\s\S]*?<w:name w:val="([^"]+)"/g)) names[m[1]] = m[2].toLowerCase();
  const front = { credits: [], dedication: [], collector: [] }, sections = [], fronts = [];
  let cur = null, part = '', partNext = false, started = false, chapters = 0, paragraphs = 0, lang = '';
  for (const m of doc.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const p = m[0], sid = (p.match(/<w:pStyle w:val="([^"]+)"/) || [])[1], style = sid ? (names[sid] || sid.toLowerCase()) : 'normal';
    const runs = p.replace(/<w:(br|cr)[^>]*\/>/g, '<w:t>\n</w:t>').replace(/<w:tab\/>/g, '<w:t> </w:t>');
    const tx = text([...runs.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map(x => x[1]).join('')).trim();
    if (!tx) continue;
    if (started && style === 'heading 3' && /^第\s*[0-9０-９]+\s*章$/.test(tx)) continue;
    if (started && style === 'heading 3') { part = tx; partNext = true; continue; }
    if (style === 'heading 1') {
      if (partNext) { part = `${part} · ${tx}`; partNext = false; continue; }
      if (!started) {
        // The book begins at its note on the edition; before it, the front matter: title, (in the collector's
        // edition, its notice,) credits, dedication and contents. Four headings without a recognised note: begin.
        const note = FUND_NOTE_LANG.find(([rx]) => rx.test(tx));
        if (!note && (fronts.length < 4 || (fronts.length === 4 && FUND_CONTENTS.test(tx)))) { fronts.push({ heading: tx, lines: [] }); continue; }
        started = true; lang = note ? note[1] : '';
        const at = k => (fronts.at(k) || { lines: [] }).lines;
        front.credits = at(-3); front.dedication = at(-2);
        if (fronts.length >= 5) front.collector = fronts[1].lines;
        // The chapters, as the contents number them ("1. …", "第1章…"): the back matter follows them.
        chapters = at(-1).filter(x => /^\s*(?:\d+[.．]|第\s*[0-9０-９]+\s*章)/.test(x)).length;
      }
      if (sections.length === 2 + (chapters || 19)) part = '';
      cur = { key: 's' + sections.length, heading: tx, part, blocks: [] }; sections.push(cur); continue;
    }
    if (!started) { if (fronts.length && style !== 'heading 2' && style !== 'heading 3') fronts.at(-1).lines.push(tx); continue; }
    if (!cur) continue;
    if (style === 'heading 2' || style === 'heading 3') cur.blocks.push(['h', tx]);
    else { cur.blocks.push(['p', tx]); paragraphs++; }
  }
  return { sections, paragraphs, front, lang };
}
if (typeof module !== 'undefined') module.exports = { parseFund, FUND_NOTE_LANG };
