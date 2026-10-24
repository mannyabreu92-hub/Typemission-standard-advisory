// Reads the Word file of Fundamentos del Psico-Expresionismo (its "heading 1/2/3" styles) into sections, the
// same way in the dashboard upload (fundamentos.js) and in the build of the free sample. The front matter
// (title, credits, dedication, contents) is kept apart; each "heading 1" after it opens a section, except the
// four part names (ORIGEN, MEDIOS…), which follow a "heading 3" ending in PARTE and label the next chapters.
// Subheadings ("heading 2") are blocks ['h', text]; paragraphs ['p', text].
function parseFund(doc, styles, text = s => s) {
  const names = {};
  for (const m of styles.matchAll(/<w:style [^>]*w:styleId="([^"]+)"[^>]*>[\s\S]*?<w:name w:val="([^"]+)"/g)) names[m[1]] = m[2].toLowerCase();
  const front = { credits: [], dedication: [] }, sections = [];
  let cur = null, frontKey = null, part = '', partNext = false, started = false, paragraphs = 0;
  for (const m of doc.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const p = m[0], sid = (p.match(/<w:pStyle w:val="([^"]+)"/) || [])[1], style = sid ? (names[sid] || sid.toLowerCase()) : 'normal';
    const runs = p.replace(/<w:(br|cr)[^>]*\/>/g, '<w:t>\n</w:t>').replace(/<w:tab\/>/g, '<w:t> </w:t>');
    const tx = text([...runs.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map(x => x[1]).join('')).trim();
    if (!tx) continue;
    if (style === 'heading 3' && /PARTE$/i.test(tx)) { part = tx; partNext = true; continue; }
    if (style === 'heading 1') {
      if (partNext) { part = `${part} · ${tx}`; partNext = false; continue; }
      if (!started && /^NOTA A ESTA EDICI/i.test(tx)) started = true;
      if (!started) { frontKey = /^CR[ÉE]DITOS/i.test(tx) ? 'credits' : /^DEDICATORIA/i.test(tx) ? 'dedication' : null; continue; }
      // The back matter (from "Doce fundamentos" on) belongs to no part.
      if (/^DOCE FUNDAMENTOS/i.test(tx)) part = '';
      cur = { key: 's' + sections.length, heading: tx, part, blocks: [] }; sections.push(cur); continue;
    }
    if (!started) { if (frontKey && style !== 'heading 2' && style !== 'heading 3') front[frontKey].push(tx); continue; }
    if (!cur) continue;
    if (style === 'heading 2' || style === 'heading 3') cur.blocks.push(['h', tx]);
    else { cur.blocks.push(['p', tx]); paragraphs++; }
  }
  return { sections, paragraphs, front };
}
if (typeof module !== 'undefined') module.exports = { parseFund };
