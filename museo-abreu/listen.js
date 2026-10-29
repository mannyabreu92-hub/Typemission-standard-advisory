// Listen: the reader reads the book aloud with the phone's own voice (the Web Speech API), in the edition's
// language. It reads what is on the page, word for word: the free sample for everyone, the whole book for
// Pro. A row of controls joins the reader's sticky bar (Ecce Homo and Fundamentos alike): listen or pause,
// and the speed. The paragraph being read is marked and kept in view, and at the end of a chapter the next
// one follows, unless the page ends on the end of the free sample. Pausing stops the voice and resumes at the
// start of the same paragraph, which works the same way on every phone.

Object.assign(I18N.es, { lsVoice: 'Voz', lsListen: 'Escuchar', lsPause: 'Pausa', lsResume: 'Continuar', lsSpeed: 'Velocidad de lectura', lsStop: 'Detener',
  lsNoVoice: 'Este teléfono no tiene voz en {lang}. Puede añadir una en sus ajustes.' });
Object.assign(I18N.en, { lsVoice: 'Voice', lsListen: 'Listen', lsPause: 'Pause', lsResume: 'Resume', lsSpeed: 'Reading speed', lsStop: 'Stop',
  lsNoVoice: 'This phone has no voice for {lang}. You can add one in its settings.' });
Object.assign(I18N.fr, { lsVoice: 'Voix', lsListen: 'Écouter', lsPause: 'Pause', lsResume: 'Reprendre', lsSpeed: 'Vitesse de lecture', lsStop: 'Arrêter',
  lsNoVoice: 'Ce téléphone n’a pas de voix en {lang}. Vous pouvez en ajouter une dans ses réglages.' });

const LS_RATES = [1, 1.25, 1.5, 0.8];
const ls = { on: false, i: 0, run: 0, items: [], lang: '', rate: (() => { try { return +localStorage.getItem('ma.lsRate') || 1; } catch (e) { return 1; } })() };
const lsSynth = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window ? window.speechSynthesis : null;

// The voice: the museum's chosen voices first, in this order: Samantha, Karen, Daniel (Enhanced), Eddy. Then the
// phone's best voices (the premium, natural and enhanced ones) and the narrators each system is known for;
// the toy voices some phones carry are never chosen. The visitor can pick another of the phone's voices;
// the choice is kept per language.
const LS_PREFERRED = [/^samantha\b/i, /^karen\b/i, /^daniel\b.*enhanced/i, /^eddy\b/i];
const LS_NARRATORS = {
  en: /daniel|arthur|oliver|ryan|guy|thomas|aaron|evan|nathan|uk english male|george|christopher|eric|davis|andrew|brian/i,
  es: /jorge|juan|álvaro|alvaro|diego|pablo|carlos|tomás|tomas/i,
  fr: /thomas|henri|nicolas|daniel|denise|eloise|amélie|amelie|audrey/i,
  de: /markus|yannick|conrad|killian|viktor|stefan|anna|petra|helena/i,
  it: /luca|diego|giuseppe|cosimo|federica|alice|elsa/i,
  ru: /yuri|dmitry|pavel|maxim|milena|svetlana/i,
  pt: /felipe|duarte|antonio|antónio|luciana|joana|francisca/i,
  ja: /otoya|hattori|keita|kyoko|nanami|ayumi/i,
  zh: /yunxi|yunyang|kangkang|tingting|xiaoxiao|meijia/i,
};
const LS_TOYS = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|grandma|grandpa|rocko|shelley|sandy|flo\b|reed/i;
const lsRank = (v, l) => (LS_TOYS.test(v.name) ? -100 : 0) + (i => i < 0 ? 0 : 40 - i * 10)(LS_PREFERRED.findIndex(r => r.test(v.name))) + (/premium|natural|neural/i.test(v.name) ? 6 : /enhanced|improved|wavenet|studio/i.test(v.name) ? 5 : /online|network/i.test(v.name) ? 2 : 0)
  + (LS_NARRATORS[l]?.test(v.name) ? 3 : 0) + (/female|woman|frau/i.test(v.name) ? -1 : /\b(male|man)\b/i.test(v.name) ? 1 : 0);
const lsVoices = l => lsSynth.getVoices().filter(v => v.lang.toLowerCase().replace('_', '-').split('-')[0] === l && !LS_TOYS.test(v.name))
  .sort((a, b) => lsRank(b, l) - lsRank(a, l));
const lsChosen = () => { try { return JSON.parse(localStorage.getItem('ma.lsVoice')) || {}; } catch (e) { return {}; } };
function lsVoice(l) {
  const all = lsSynth.getVoices(), mine = lsVoices(l), pick = lsChosen()[l];
  return { known: all.length > 0, voice: mine.find(v => v.voiceURI === pick) || mine[0] || null };
}
const lsVoiceName = v => v.name.replace(/^(Microsoft|Google|Apple)\s+/, '').replace(/\s*Online\s*/, ' ').replace(/\s+-\s+.*$/, '').trim();

// The narrator's delivery, so that it sounds told rather than recited: a slower, slightly deeper voice at full
// volume, short breaths between paragraphs, and each sentence spoken on its own with its own small rise or
// fall in pitch and pace around that, the way a person tells a story: questions rise, exclamations lift, a
// short sentence lands a little slower, a long one moves on, quoted words take a slightly other tone.
const LS_PACE = { rate: .88, pitch: .95, volume: 1, para: 380, title: 750 };
const LS_WAVE = [0, .035, -.02, .025, -.03, .015];

// What is read: the chapter's title and text, not the notes around it (the end of the sample, credits, loading).
const lsItems = art => [...art.querySelectorAll('h1, h2, p')]
  .filter(el => !el.closest('.empty, .bk-sample-end, details') && !el.classList.contains('muted') && el.textContent.trim());

// The text as a voice should say it: a dash is a pause, not a word, and a chapter's Roman numeral is read as
// a number ("Chapter I" is not "Chapter eye").
const LS_ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100 };
const lsRoman = r => [...r].reduce((n, c, i, a) => n + (LS_ROMAN[c] < (LS_ROMAN[a[i + 1]] || 0) ? -LS_ROMAN[c] : LS_ROMAN[c]), 0);
const lsSay = (text, heading) => {
  let x = text.replace(/\s*[—–]\s*/g, ', ').replace(/…/g, '...').replace(/[«»“”„]/g, '"').replace(/\s+/g, ' ');
  if (heading) x = x.replace(/^([^\s,]+)\s+([IVXLC]+)\b/, (m, w, r) => `${w} ${lsRoman(r)}`);
  return x.trim();
};

// A paragraph is spoken sentence by sentence (some phones also cut a long utterance short); a long sentence
// is parted at a comma or semicolon near its middle.
function lsChunks(text) {
  const parts = (text.match(/(?:[^.!?。！？]|\.(?=\d))+(?:\.\.\.|[.!?。！？])*["')\]]*\s*/g) || [text]).map(s => s.trim()).filter(Boolean), out = [];
  for (const s of parts) {
    if (out.length && s.length < 2) { out[out.length - 1] += s; continue; }
    if (s.length <= 240) { out.push(s); continue; }
    const mid = s.length / 2, cuts = [...s.matchAll(/[,;:]\s/g)].map(m => m.index + 1);
    const at = cuts.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))[0];
    if (at) out.push(s.slice(0, at), s.slice(at).trim()); else out.push(s);
  }
  return out;
}

// Longer breaths: a full stop and a colon are said as an ellipsis, which phones read as a pause, and a comma
// always has its space. Numbers keep their points and colons (3.5, 10:30), and an ellipsis stays one.
const lsBreaths = s => s.replace(/\.{3,}/g, '…').replace(/(?<!\d)[.:](?!\d)|…/g, '... ')
  .replace(/,(?=\S)/g, ', ').replace(/\.\.\. (?=["')\]])/g, '...').replace(/\s+/g, ' ').trim();

// Each sentence's own tone and pace.
function lsTone(s, k, first) {
  const end = s.replace(/["')\]\s]+$/, '').slice(-1);
  let pitch = LS_PACE.pitch + LS_WAVE[k % LS_WAVE.length], rate = LS_PACE.rate;
  if (end === '?' || end === '？') pitch += .07;
  if (end === '!' || end === '！') { pitch += .05; rate += .03; }
  if (/^"/.test(s)) pitch += .03;
  if (s.length < 60) rate -= .04; else if (s.length > 170) rate += .04;
  if (first) rate -= .02;
  return { pitch: Math.min(1.25, Math.max(.8, pitch)), rate };
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
  const head = /^H/.test(el.tagName), { voice } = lsVoice(ls.lang), chunks = lsChunks(lsSay(el.textContent, head));
  let k = 0;
  const next = () => {
    if (run !== ls.run || !ls.on) return;
    if (k >= chunks.length) { ls.i++; return setTimeout(() => lsSpeak(run), (head ? LS_PACE.title : LS_PACE.para) / ls.rate); }
    const tone = lsTone(chunks[k], ls.i + k, k === 0), u = new SpeechSynthesisUtterance(lsBreaths(chunks[k++]));
    u.lang = voice ? voice.lang : ls.lang; if (voice) u.voice = voice;
    u.rate = tone.rate * ls.rate; u.pitch = tone.pitch; u.volume = LS_PACE.volume;
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

const lsLangOf = () => (document.querySelector('.reader-text')?.getAttribute('lang') || lang).slice(0, 2);
// The voice menu lists the phone's voices for the edition's language, the chosen narrator first.
function lsFillVoices() {
  const sel = document.querySelector('.ls-voice');
  if (!sel) return;
  const l = lsLangOf(), list = lsVoices(l), cur = lsVoice(l).voice;
  sel.innerHTML = list.map(v => `<option value="${esc(v.voiceURI)}"${v === cur ? ' selected' : ''}>${esc(lsVoiceName(v))}</option>`).join('');
  sel.hidden = list.length < 2;
}

function lsMount() {
  const bar = document.querySelector('.reader-bar');
  if (!lsSynth || !bar || bar.querySelector('.ls-row')) return;
  bar.insertAdjacentHTML('beforeend', `<div class="ls-row" role="group" aria-label="${esc(t('lsListen'))}">
    <button type="button" class="btn small dark" data-ls="play" aria-pressed="false"></button>
    <button type="button" class="btn small" data-ls="rate" aria-label="${esc(t('lsSpeed'))}"></button>
    <button type="button" class="btn small" data-ls="stop" hidden>${t('lsStop')}</button>
    <select class="ls-voice" aria-label="${esc(t('lsVoice'))}" hidden></select>
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
  const sel = bar.querySelector('.ls-voice');
  sel.addEventListener('change', () => {
    const l = lsLangOf(), c = lsChosen(); c[l] = sel.value;
    try { localStorage.setItem('ma.lsVoice', JSON.stringify(c)); } catch (e) {}
    if (ls.on) { const run = ++ls.run; lsSynth.cancel(); setTimeout(() => lsSpeak(run), 60); }
  });
  lsFillVoices();
  lsPaint();
  let auto = false;
  try { auto = sessionStorage.getItem('ma.lsAuto') === '1'; sessionStorage.removeItem('ma.lsAuto'); } catch (e) {}
  if (auto) lsStart(true);
}

if (lsSynth) {
  lsSynth.getVoices();
  lsSynth.addEventListener?.('voiceschanged', lsFillVoices);
  // Leaving the page stops the voice; a new reader page gets its controls.
  window.addEventListener('hashchange', () => { if (ls.on || ls.items.length) lsStop(); });
  window.addEventListener('pagehide', () => lsSynth.cancel());
  new MutationObserver(() => {
    if (ls.items.length && !ls.items[0].isConnected) lsStop();
    lsMount();
  }).observe(document.getElementById('main'), { childList: true, subtree: true });
}
