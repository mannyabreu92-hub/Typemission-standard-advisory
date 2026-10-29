// Listen: the reader reads the book aloud with the phone's own voice (the Web Speech API), in the edition's
// language. It reads what is on the page, word for word: the free sample for everyone, the whole book for
// Pro. A row of controls joins the reader's sticky bar (Ecce Homo and Fundamentos alike): listen or pause,
// and the speed. The paragraph being read is marked and kept in view, and at the end of a chapter the next
// one follows, unless the page ends on the end of the free sample. Pausing stops the voice and resumes at the
// start of the same paragraph, which works the same way on every phone.

Object.assign(I18N.es, { lsListen: 'Escuchar', lsPause: 'Pausa', lsResume: 'Continuar', lsSpeed: 'Velocidad de lectura', lsStop: 'Detener',
  lsNoVoice: 'Este teléfono no tiene voz en {lang}. Puede añadir una en sus ajustes.' });
Object.assign(I18N.en, { lsListen: 'Listen', lsPause: 'Pause', lsResume: 'Resume', lsSpeed: 'Reading speed', lsStop: 'Stop',
  lsNoVoice: 'This phone has no voice for {lang}. You can add one in its settings.' });
Object.assign(I18N.fr, { lsListen: 'Écouter', lsPause: 'Pause', lsResume: 'Reprendre', lsSpeed: 'Vitesse de lecture', lsStop: 'Arrêter',
  lsNoVoice: 'Ce téléphone n’a pas de voix en {lang}. Vous pouvez en ajouter une dans ses réglages.' });

const LS_RATES = [1, 1.25, 1.5, 0.8];
const ls = { on: false, i: 0, run: 0, items: [], lang: '', rate: (() => { try { return +localStorage.getItem('ma.lsRate') || 1; } catch (e) { return 1; } })() };
const lsSynth = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window ? window.speechSynthesis : null;

// The voice for the edition's language: a better-sounding one first where the phone has several.
function lsVoice(l) {
  const all = lsSynth.getVoices(), mine = all.filter(v => v.lang.toLowerCase().replace('_', '-').split('-')[0] === l);
  const rank = v => (/premium|enhanced|natural|neural/i.test(v.name) ? 0 : /google/i.test(v.name) ? 1 : 2) + (v.localService ? 0 : .5);
  return { known: all.length > 0, voice: mine.sort((a, b) => rank(a) - rank(b))[0] || null };
}

// What is read: the chapter's title and text, not the notes around it (the end of the sample, credits, loading).
const lsItems = art => [...art.querySelectorAll('h1, h2, p')]
  .filter(el => !el.closest('.empty, .bk-sample-end, details') && !el.classList.contains('muted') && el.textContent.trim());

// A paragraph is spoken in pieces of a sentence or a few, as some phones cut a long utterance short.
function lsChunks(text) {
  const parts = text.match(/[^.!?。！？…]+[.!?。！？…]*[»”"’')\]]*\s*/g) || [text], out = [];
  for (const s of parts) if (out.length && (out[out.length - 1] + s).length < 220) out[out.length - 1] += s; else out.push(s);
  return out.map(s => s.trim()).filter(Boolean);
}

function lsMark(el) {
  document.querySelectorAll('.ls-now').forEach(x => x.classList.remove('ls-now'));
  if (!el) return;
  el.classList.add('ls-now');
  const r = el.getBoundingClientRect();
  if (r.top < 140 || r.bottom > innerHeight - 90) el.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function lsSpeak(run) {
  if (run !== ls.run || !ls.on) return;
  const el = ls.items[ls.i];
  if (!el || !el.isConnected) return lsEnd();
  lsMark(el);
  const { voice } = lsVoice(ls.lang), chunks = lsChunks(el.textContent);
  let k = 0;
  const next = () => {
    if (run !== ls.run || !ls.on) return;
    if (k >= chunks.length) { ls.i++; return lsSpeak(run); }
    const u = new SpeechSynthesisUtterance(chunks[k++]);
    u.lang = voice ? voice.lang : ls.lang; if (voice) u.voice = voice; u.rate = ls.rate;
    u.onend = next;
    u.onerror = e => { if (run === ls.run && e.error !== 'interrupted' && e.error !== 'canceled') lsStop(); };
    lsSynth.speak(u);
  };
  next();
  lsPaint();
}

function lsStart(fromAuto) {
  const art = document.querySelector('.reader-text');
  if (!art) return;
  ls.lang = (art.getAttribute('lang') || lang).slice(0, 2);
  const { known, voice } = lsVoice(ls.lang);
  if (known && !voice) { lsPaint(t('lsNoVoice', { lang: L(LANG_NAMES[ls.lang] || { en: ls.lang }) })); return; }
  // The whole book's text may still be on its way: wait for it a little.
  if (art.querySelector('#fb-text .muted, #fu-text .muted')) {
    if ((ls.wait = (ls.wait || 0) + 1) < 40) setTimeout(() => lsStart(fromAuto), 250);
    return;
  }
  ls.wait = 0;
  const items = lsItems(art);
  if (!items.length) return fromAuto ? lsStop() : undefined;
  if (ls.items[0] !== items[0]) ls.i = 0;
  ls.items = items; ls.on = true;
  const run = ++ls.run;
  // A voice that was just stopped needs a moment on some phones; the first one must start within the tap (iPhone).
  if (lsSynth.speaking || lsSynth.pending) { lsSynth.cancel(); setTimeout(() => lsSpeak(run), 60); } else lsSpeak(run);
}

function lsPause() { ls.on = false; ls.run++; lsSynth.cancel(); lsPaint(); }
function lsStop() { lsPause(); ls.i = 0; ls.items = []; lsMark(null); lsPaint(); }

// At the end of a chapter the next one follows, when there is one to read.
function lsEnd() {
  const art = document.querySelector('.reader-text'), nextA = document.querySelector('.reader-nav a.dark');
  lsStop();
  if (art && !art.querySelector('.bk-sample-end') && nextA) {
    try { sessionStorage.setItem('ma.lsAuto', '1'); } catch (e) {}
    location.hash = nextA.getAttribute('href');
  }
}

function lsPaint(note) {
  const row = document.querySelector('.ls-row');
  if (!row) return;
  const started = ls.items.length > 0;
  const play = row.querySelector('[data-ls="play"]');
  play.textContent = ls.on ? `❚❚ ${t('lsPause')}` : `▶ ${started ? t('lsResume') : t('lsListen')}`;
  play.setAttribute('aria-pressed', String(ls.on));
  row.querySelector('[data-ls="rate"]').textContent = String(ls.rate).replace('.', lang === 'en' ? '.' : ',') + '×';
  row.querySelector('[data-ls="stop"]').hidden = !started;
  const n = row.querySelector('.ls-note');
  n.textContent = note || (started ? `${Math.min(ls.i + 1, ls.items.length)} / ${ls.items.length}` : '');
}

function lsMount() {
  const bar = document.querySelector('.reader-bar');
  if (!lsSynth || !bar || bar.querySelector('.ls-row')) return;
  bar.insertAdjacentHTML('beforeend', `<div class="ls-row" role="group" aria-label="${esc(t('lsListen'))}">
    <button type="button" class="btn small dark" data-ls="play" aria-pressed="false"></button>
    <button type="button" class="btn small" data-ls="rate" aria-label="${esc(t('lsSpeed'))}"></button>
    <button type="button" class="btn small" data-ls="stop" hidden>${t('lsStop')}</button>
    <span class="ls-note muted"></span></div>`);
  bar.querySelector('.ls-row').addEventListener('click', e => {
    const b = e.target.closest('[data-ls]');
    if (!b) return;
    if (b.dataset.ls === 'play') ls.on ? lsPause() : lsStart();
    else if (b.dataset.ls === 'stop') lsStop();
    else {
      ls.rate = LS_RATES[(LS_RATES.indexOf(ls.rate) + 1) % LS_RATES.length];
      try { localStorage.setItem('ma.lsRate', ls.rate); } catch (e) {}
      if (ls.on) { const run = ++ls.run; lsSynth.cancel(); setTimeout(() => lsSpeak(run), 60); } else lsPaint();
    }
  });
  lsPaint();
  let auto = false;
  try { auto = sessionStorage.getItem('ma.lsAuto') === '1'; sessionStorage.removeItem('ma.lsAuto'); } catch (e) {}
  if (auto) lsStart(true);
}

if (lsSynth) {
  lsSynth.getVoices();
  // Leaving the page stops the voice; a new reader page gets its controls.
  window.addEventListener('hashchange', () => { if (ls.on || ls.items.length) lsStop(); });
  window.addEventListener('pagehide', () => lsSynth.cancel());
  new MutationObserver(() => {
    if (ls.items.length && !ls.items[0].isConnected) lsStop();
    lsMount();
  }).observe(document.getElementById('main'), { childList: true, subtree: true });
}
