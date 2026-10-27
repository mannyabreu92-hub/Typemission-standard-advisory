// Reads a Word file of Fundamentos del Psico-Expresionismo or one of its editions (English, French, Portuguese,
// Italian, German, Japanese), which all follow the Spanish paragraph by paragraph with the same "heading 1/2/3" styles, into
// sections, the same way in the dashboard upload (fundamentos.js) and in the build of the free samples. It goes by
// that shared structure, not by the words of any one language: the first four "heading 1" are the front matter
// (title, credits, dedication, contents); each later "heading 1" opens a section, except the four part names
// (ORIGEN / ORIGIN…), which follow a "heading 3" ("PRIMERA PARTE", "PART ONE"…) and label the next chapters.
// The back matter (from section 21, the twelve foundations, on) belongs to no part. Subheadings ("heading 2") are
// blocks ['h', text]; paragraphs ['p', text]. The edition's language comes from the heading of its note.
// The Japanese edition also sets each chapter's number ("第1章") as a "heading 3" before its title: skipped, since
// the contents already give it ("第1章　…").
const FUND_NOTE_LANG = [[/^NOTA A ESTA EDICI[ÓO]N/i, 'es'], [/^NOTA A ESTA EDI[ÇC][ÃA]O/i, 'pt'], [/^A NOTE ON THIS EDITION/i, 'en'],
  [/^NOTE SUR CETTE [ÉE]DITION/i, 'fr'], [/^NOTA A QUESTA EDIZIONE/i, 'it'], [/^ZU DIESER AUSGABE/i, 'de'], [/^本版について/, 'ja']];
function parseFund(doc, styles, text = s => s) {
  const names = {};
  for (const m of styles.matchAll(/<w:style [^>]*w:styleId="([^"]+)"[^>]*>[\s\S]*?<w:name w:val="([^"]+)"/g)) names[m[1]] = m[2].toLowerCase();
  const front = { credits: [], dedication: [] }, sections = [];
  let cur = null, frontKey = null, part = '', partNext = false, h1 = 0, paragraphs = 0, lang = '';
  for (const m of doc.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const p = m[0], sid = (p.match(/<w:pStyle w:val="([^"]+)"/) || [])[1], style = sid ? (names[sid] || sid.toLowerCase()) : 'normal';
    const runs = p.replace(/<w:(br|cr)[^>]*\/>/g, '<w:t>\n</w:t>').replace(/<w:tab\/>/g, '<w:t> </w:t>');
    const tx = text([...runs.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map(x => x[1]).join('')).trim();
    if (!tx) continue;
    const started = h1 > 4;
    if (started && style === 'heading 3' && /^第\s*[0-9０-９]+\s*章$/.test(tx)) continue;
    if (started && style === 'heading 3') { part = tx; partNext = true; continue; }
    if (style === 'heading 1') {
      if (partNext) { part = `${part} · ${tx}`; partNext = false; continue; }
      h1++;
      if (h1 <= 4) { frontKey = h1 === 2 ? 'credits' : h1 === 3 ? 'dedication' : null; continue; }
      if (h1 === 5) lang = (FUND_NOTE_LANG.find(([rx]) => rx.test(tx)) || [, ''])[1];
      if (sections.length === 21) part = '';
      cur = { key: 's' + sections.length, heading: tx, part, blocks: [] }; sections.push(cur); continue;
    }
    if (h1 <= 4) { if (frontKey && style !== 'heading 2' && style !== 'heading 3') front[frontKey].push(tx); continue; }
    if (!cur) continue;
    if (style === 'heading 2' || style === 'heading 3') cur.blocks.push(['h', tx]);
    else { cur.blocks.push(['p', tx]); paragraphs++; }
  }
  return { sections, paragraphs, front, lang };
}
if (typeof module !== 'undefined') module.exports = { parseFund, FUND_NOTE_LANG };
