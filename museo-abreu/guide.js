// The audio guide of an artist's room: the phone's voice reads the room aloud — the artist's name, the book's
// headline, the biography and the critique, each in the language it is shown in — with the museum voices of
// the book's reader (listen.js: the same five voices, pace and breaths; the words are never changed). The
// paragraph being read is lit and kept in view; the room does not refresh its bids while the guide speaks.

const gd = { on: false, i: 0, run: 0, items: [] };
const gdOk = () => typeof lsSynth !== 'undefined' && !!lsSynth;
function gdBarHTML() {
  if (!gdOk()) return '';
  return `<div class="gd-bar" role="group" aria-label="${esc(t('gdH'))}">
    <button type="button" class="gd-play" data-action="gdPlay" aria-pressed="false"><span class="gd-icon" aria-hidden="true">▶</span> <span class="gd-label">${t('gdH')}</span></button>
    <select class="gd-voice" aria-label="${esc(t('lsVoice'))}">${LS_ORDER.map(p => `<option value="${p}"${p === ls.persona ? ' selected' : ''}>${t('lsP' + p)}</option>`).join('')}</select>
    <button type="button" class="gd-stop" data-action="gdStop" aria-label="${esc(t('lsStop'))}" hidden><span aria-hidden="true">■</span></button>
    <span class="gd-note">${t('gdLead')}</span></div>`;
}
// What is read, in order, from the room on screen.
const gdItems = () => [...document.querySelectorAll('.au-room .au-room-name, .au-room .au-room-head-line, .au-room .au-about h2, .au-room .au-about p')]
  .filter(el => !el.classList.contains('muted') && el.textContent.trim());
// The words of an element as said: the artist's name without the years printed beside it.
const gdText = el => { const c = el.cloneNode(true); c.querySelectorAll('.au-name-years').forEach(x => x.remove()); return c.textContent.trim(); };
const gdLang = el => ((el.closest('[lang]') || document.documentElement).getAttribute('lang') || lang).slice(0, 2);
function gdPaint(note) {
  const bar = document.querySelector('.gd-bar');
  if (!bar) return;
  const started = gd.items.length > 0;
  bar.querySelector('.gd-icon').textContent = gd.on ? '❚❚' : '▶';
  bar.querySelector('.gd-label').textContent = gd.on ? t('lsPause') : started ? t('lsResume') : t('gdH');
  bar.querySelector('.gd-play').setAttribute('aria-pressed', String(gd.on));
  bar.querySelector('.gd-stop').hidden = !started;
  bar.querySelector('.gd-note').textContent = note || (started ? `${Math.min(gd.i + 1, gd.items.length)} / ${gd.items.length}` : t('gdLead'));
}
function gdMark(el) {
  document.querySelectorAll('.gd-now').forEach(x => x.classList.remove('gd-now'));
  document.querySelector('.au-room')?.classList.toggle('gd-listening', !!el);
  if (!el) return;
  const more = el.closest('details'); if (more) more.open = true;
  el.classList.add('gd-now');
  const r = el.getBoundingClientRect();
  if (r.top < 140 || r.bottom > innerHeight - 100) el.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
function gdSpeak(run) {
  if (run !== gd.run || !gd.on) return;
  // The room may have been drawn again (new bids, a language change): read on from the same place in it.
  if (gd.items[gd.i] && !gd.items[gd.i].isConnected) gd.items = gdItems();
  const el = gd.items[gd.i];
  if (!el) return gdStop();
  gdMark(el);
  const l = gdLang(el), p = LS_PERSONAS[ls.persona], voice = lsCast(l).cast[ls.persona], head = /^H/.test(el.tagName) || el.classList.contains('au-room-head-line');
  const steps = lsChunks(lsSay(gdText(el), false)).flatMap((s, k) => lsSegments(s).map((g, j, all) => ({ ...g, s, k, last: j === all.length - 1 })));
  let n = 0;
  const next = () => {
    if (run !== gd.run || !gd.on) return;
    if (n >= steps.length) { gd.i++; return gd.i >= gd.items.length ? gdStop() : setTimeout(() => gdSpeak(run), (head ? p.title : p.para) / ls.rate); }
    const st = steps[n++], tone = lsTone(st.s, gd.i + st.k, st.k === 0, p), u = new SpeechSynthesisUtterance(lsBreaths(st.text));
    u.lang = voice ? voice.lang : l; if (voice) u.voice = voice;
    u.rate = tone.rate * (st.emph ? p.emph : 1) * ls.rate; u.pitch = tone.pitch - (st.emph ? .02 : 0);
    u.onend = () => st.last && n < steps.length ? setTimeout(next, (p.sentence + (st.s.length < 60 ? 220 : 0)) / ls.rate) : next();
    u.onerror = e => { if (run === gd.run && e.error !== 'interrupted' && e.error !== 'canceled') gdStop(); };
    lsSynth.speak(u);
  };
  next();
  gdPaint();
}
function gdStart() {
  if (!gdOk()) return;
  const items = gdItems();
  if (!items.length) return;
  const l = gdLang(items[items.length - 1]), { known, cast } = lsCast(l);
  if (known && !cast.curator) return gdPaint(t('lsNoVoice', { lang: L(LANG_NAMES[l] || { en: l }) }));
  if (gd.items[0] !== items[0]) gd.i = 0;
  gd.items = items; gd.on = true;
  if (typeof lsAwake === 'function') lsAwake(true);
  const run = ++gd.run;
  if (lsSynth.speaking || lsSynth.pending) { lsSynth.cancel(); setTimeout(() => gdSpeak(run), 60); } else gdSpeak(run);
}
function gdPause() { gd.on = false; gd.run++; lsSynth && lsSynth.cancel(); if (typeof lsAwake === 'function') lsAwake(false); gdPaint(); }
function gdStop() {
  gd.on = false; gd.run++; lsSynth && lsSynth.cancel();
  gd.i = 0; gd.items = []; gdMark(null); if (typeof lsAwake === 'function') lsAwake(false); gdPaint();
}
EXTRA_ACTIONS.gdPlay = () => gd.on ? gdPause() : gdStart();
EXTRA_ACTIONS.gdStop = () => gdStop();
document.addEventListener('change', e => {
  if (!e.target.classList || !e.target.classList.contains('gd-voice')) return;
  ls.persona = e.target.value;
  try { localStorage.setItem('ma.lsPersona', ls.persona); } catch (x) {}
  if (gd.on) { const run = ++gd.run; lsSynth.cancel(); setTimeout(() => gdSpeak(run), 60); }
});
addEventListener('hashchange', () => { if (gd.on || gd.items.length) gdStop(); });
addEventListener('pagehide', () => { if (gd.on) lsSynth.cancel(); });
