// Listen: the museum's audio guide for the books. The phone's own voice (the Web Speech API) reads what is on
// the page, word for word, in the edition's language: the free sample for everyone, the whole book for Pro.
// The voice is a curator guiding visitors through a private exhibition, with the art historian's care and the
// documentary narrator's depth: calm, poetic, thoughtful; never commercial, assistant-like or hurried.
// The visitor chooses one of five museum voices (Curator, Storyteller, Scholar, Narrator, Collector), never a
// technical voice name: each is a delivery (pace, pitch, breaths, expressiveness) given the phone's best voice
// that suits it. The text is prepared as a narrator would read it: each sentence on its own, with a timed
// breath after it and a longer one after a paragraph or a title; colons and dashes as pauses; the artist's
// name, the books, the movement and titles in quotation marks set slightly apart and spoken a little slower.
// The words themselves are never changed. While it reads, the paragraph is lit, the rest of the page steps
// back, the screen stays awake, and the chapter's remaining minutes show. At the end of a chapter the next
// one follows, unless the page ends on the end of the free sample. Pausing resumes at the paragraph's start.

Object.assign(I18N.es, { lsOscar: 'Voz de Oscar Abreu', lsOscarNote: 'Narrado con la voz de Oscar Abreu, recreada con inteligencia artificial con su permiso.', lsAudioErr: 'No se pudo cargar el audio. Revise su conexión.', lsSample: 'Escuchar la muestra', lsVoice: 'Voz', lsListen: 'Escuchar', lsPause: 'Pausa', lsResume: 'Continuar', lsSpeed: 'Ritmo de lectura', lsStop: 'Detener',
  lsNoVoice: 'Este teléfono no tiene voz en {lang}. Puede añadir una en sus ajustes.', lsMin: '{n} min',
  lsPcurator: 'Curador', lsPstoryteller: 'Narrador', lsPscholar: 'Erudito', lsPnarrator: 'Voz documental', lsPcollector: 'Coleccionista',
  lsTcurator: 'Sereno y poético, como una exposición privada.', lsTstoryteller: 'Cálido y cercano.', lsTscholar: 'Pausado y preciso.',
  lsTnarrator: 'Profundo, como un documental.', lsTcollector: 'Lento e íntimo.' });
Object.assign(I18N.en, { lsOscar: 'Oscar Abreu’s voice', lsOscarNote: 'Narrated in Oscar Abreu’s own voice, recreated with AI with his permission.', lsAudioErr: 'The audio could not be loaded. Check your connection.', lsSample: 'Listen to the sample', lsVoice: 'Voice', lsListen: 'Listen', lsPause: 'Pause', lsResume: 'Resume', lsSpeed: 'Reading pace', lsStop: 'Stop',
  lsNoVoice: 'This phone has no voice for {lang}. You can add one in its settings.', lsMin: '{n} min',
  lsPcurator: 'Curator', lsPstoryteller: 'Storyteller', lsPscholar: 'Scholar', lsPnarrator: 'Narrator', lsPcollector: 'Collector',
  lsTcurator: 'Calm and poetic, like a private exhibition.', lsTstoryteller: 'Warm and close.', lsTscholar: 'Unhurried and precise.',
  lsTnarrator: 'Deep, like a documentary.', lsTcollector: 'Slow and intimate.' });
Object.assign(I18N.fr, { lsOscar: 'La voix d’Oscar Abreu', lsOscarNote: 'Lu avec la voix d’Oscar Abreu, recréée par intelligence artificielle avec son accord.', lsAudioErr: 'L’audio n’a pas pu être chargé. Vérifiez votre connexion.', lsSample: 'Écouter l’extrait', lsVoice: 'Voix', lsListen: 'Écouter', lsPause: 'Pause', lsResume: 'Reprendre', lsSpeed: 'Rythme de lecture', lsStop: 'Arrêter',
  lsNoVoice: 'Ce téléphone n’a pas de voix en {lang}. Vous pouvez en ajouter une dans ses réglages.', lsMin: '{n} min',
  lsPcurator: 'Conservateur', lsPstoryteller: 'Conteur', lsPscholar: 'Érudit', lsPnarrator: 'Narrateur', lsPcollector: 'Collectionneur',
  lsTcurator: 'Calme et poétique, comme une exposition privée.', lsTstoryteller: 'Chaleureux et proche.', lsTscholar: 'Posé et précis.',
  lsTnarrator: 'Profond, comme un documentaire.', lsTcollector: 'Lent et intime.' });

/* ---------- The five museum voices ---------- */

// rate and pitch: the voice's delivery (1 is the phone's everyday voice). sentence, para, title: the breath
// after a sentence, a paragraph and a title, in milliseconds at 1×. wave: how far each sentence's pitch moves
// (expressiveness). emph: how much slower a name or title is said. first: the museum's chosen voices, in order
// (the Curator's: Samantha, Karen, Daniel (Enhanced), Eddy). like: the other phone voices that suit it.
const LS_PERSONAS = {
  curator: { rate: .88, pitch: .94, sentence: 480, para: 950, title: 1500, wave: .7, emph: .92,
    first: [/^samantha\b/i, /^karen\b/i, /^daniel\b.*enhanced/i, /^eddy\b/i],
    like: /^samantha\b|^karen\b|^daniel\b.*enhanced|^eddy\b|ava|zoe|serena|jorge|mónica|amélie|thomas|anna|alice|milena|luciana|kyoko/i },
  storyteller: { rate: .92, pitch: .97, sentence: 400, para: 800, title: 1300, wave: 1.1, emph: .92,
    like: /karen|moira|tessa|kate|mónica|paulina|audrey|amélie|petra|federica|svetlana|joana|nanami|jenny|aria/i },
  scholar: { rate: .87, pitch: .93, sentence: 500, para: 950, title: 1500, wave: .5, emph: .94,
    like: /daniel|oliver|george|ryan|thomas|jorge|markus|luca|yuri|felipe|otoya|sonia/i },
  narrator: { rate: .88, pitch: .91, sentence: 500, para: 1000, title: 1700, wave: .7, emph: .9,
    like: /arthur|aaron|guy|brian|davis|christopher|andrew|nathan|juan|álvaro|alvaro|diego|henri|conrad|killian|cosimo|dmitry|duarte|keita/i },
  collector: { rate: .84, pitch: .92, sentence: 560, para: 1100, title: 1700, wave: .6, emph: .93,
    like: /serena|kate|martha|stephanie|catherine|libby|sonia|elsa|denise|eloise|helena|katja|isabella|dariya|francisca|mayu/i },
};
const LS_ORDER = ['curator', 'storyteller', 'scholar', 'narrator', 'collector'];
const LS_RATES = [1, 1.1, 1.2, .9];
const LS_WAVE = [0, .035, -.02, .025, -.03, .015];
const lsGet = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
const ls = { on: false, i: 0, run: 0, items: [], lang: '', rate: +lsGet('ma.lsRate', 1) || 1, persona: LS_PERSONAS[lsGet('ma.lsPersona', '')] ? lsGet('ma.lsPersona') : 'curator', lock: null };
const lsSynth = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window ? window.speechSynthesis : null;

// The phone's voices for a language, best first: the premium, natural and enhanced ones; the toy voices some
// phones carry never.
const LS_TOYS = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|grandma|grandpa|rocko|shelley|sandy|flo\b|reed/i;
const lsQuality = v => /premium|natural|neural/i.test(v.name) ? 6 : /enhanced|improved|wavenet|studio/i.test(v.name) ? 5 : /online|network/i.test(v.name) ? 2 : 0;
const lsVoices = l => lsSynth.getVoices().filter(v => v.lang.toLowerCase().replace('_', '-').split('-')[0] === l && !LS_TOYS.test(v.name))
  .sort((a, b) => lsQuality(b) - lsQuality(a));
// Each museum voice gets its own phone voice where the phone has several: the best one that suits it and is not
// already taken, the Curator first; with fewer voices than five, they share and differ by delivery alone.
function lsCast(l) {
  const list = lsVoices(l), cast = {}, used = new Set();
  for (const p of LS_ORDER) {
    const pr = LS_PERSONAS[p];
    const score = v => lsQuality(v) + (i => i < 0 ? 0 : 40 - i * 5)((pr.first || []).findIndex(r => r.test(v.name)))
      + (pr.like.test(v.name) ? 20 : 0) - (used.has(v) ? 50 : 0);
    const v = list.slice().sort((a, b) => score(b) - score(a))[0] || null;
    cast[p] = v; if (v) used.add(v);
  }
  return { known: lsSynth.getVoices().length > 0, cast };
}

/* ---------- The text, as a narrator would read it ---------- */

// Said, not shown: a dash is a pause, a chapter's Roman numeral a number ("Chapter I" is not "Chapter eye"),
// a hyphen between words a space, quotation marks one kind.
const LS_ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100 };
const lsRoman = r => [...r].reduce((n, c, i, a) => n + (LS_ROMAN[c] < (LS_ROMAN[a[i + 1]] || 0) ? -LS_ROMAN[c] : LS_ROMAN[c]), 0);
const lsSay = (text, heading) => {
  let x = text.replace(/\s*[—–]\s*/g, ', ').replace(/…/g, '...').replace(/[«»“”„]/g, '"').replace(/(\p{L})-(\p{L})/gu, '$1 $2').replace(/\s+/g, ' ');
  if (heading) x = x.replace(/^([^\s,]+)\s+([IVXLC]+)\b/, (m, w, r) => `${w} ${lsRoman(r)}`);
  return x.trim();
};

// Sentence by sentence (some phones also cut a long utterance short); a point inside a number is not an end,
// and a long sentence is parted at a comma or semicolon near its middle.
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

// What is set slightly apart: the artist's and the museum's names, the books, the movement in every edition's
// spelling, and a short title in quotation marks. One per sentence, so the sentence still flows.
const LS_EMPH = /"[^"]{2,40}"|\b(?:Óscar|Oscar) Abreu\b|\bMuseo Abreu\b|\bEcce Homo\b|\bFundamentos\b|\bPs[iy]ch?o[ -]?[EeÉé]?[xs]+pres+ion+is+m\w*|Психо ?экспрессионизм\w*|サイコ・?エクスプレッショニズム/u;
function lsSegments(s) {
  const m = s.match(LS_EMPH);
  if (!m || s.length < 24) return [{ text: s }];
  // A few words either side stay with the name, so no word stands alone between two pauses.
  let a = s.slice(0, m.index).trim(), e = m[0], b = s.slice(m.index + m[0].length).trim();
  if (a.length < 12) { e = (a + ' ' + e).trim(); a = ''; }
  if (b.length < 12) { e = (e + (/^[.,;:!?"]/.test(b) ? '' : ' ') + b).trim(); b = ''; }
  return [a && { text: a }, { text: e, emph: true }, b && { text: b }].filter(Boolean);
}

// Breaths inside a sentence: a colon or semicolon is said as an ellipsis, which phones read as a pause; the
// stop at the end is a timed breath instead, the same on every phone. Numbers keep their points and colons.
const lsBreaths = s => s.replace(/\.{3,}/g, '…').replace(/(?<!\d)[:;](?!\d)/g, '... ').replace(/[.。]+$/, '')
  .replace(/,(?=\S)/g, ', ').replace(/…/g, '... ').replace(/\s+/g, ' ').trim();

// Each sentence's own tone and pace, calm throughout, as a curator speaks in a private exhibition: a question
// rises a little, an exclamation is warmed, never hurried; a short sentence lands slower; a long one keeps its
// pace; quoted words take a slightly other tone. Nothing speeds up for effect.
function lsTone(s, k, first, p) {
  const end = s.replace(/["')\]\s]+$/, '').slice(-1);
  let pitch = p.pitch + LS_WAVE[k % LS_WAVE.length] * p.wave, rate = p.rate;
  if (end === '?' || end === '？') pitch += .04;
  if (end === '!' || end === '！') pitch += .02;
  if (/^"/.test(s)) pitch += .02;
  if (s.length < 60) rate -= .04;
  if (first) rate -= .02;
  return { pitch: Math.min(1.1, Math.max(.8, pitch)), rate };
}

// What is read: the chapter's title and text, not the notes around it (the end of the sample, credits, loading).
const lsItems = art => [...art.querySelectorAll('h1, h2, p')]
  .filter(el => !el.closest('.empty, .bk-sample-end, details') && !el.classList.contains('muted') && el.textContent.trim());

/* ---------- Playing ---------- */

function lsMark(el) {
  document.querySelectorAll('.ls-now').forEach(x => x.classList.remove('ls-now'));
  document.querySelector('.reader-text')?.classList.toggle('ls-listening', !!el);
  if (!el) return;
  el.classList.add('ls-now');
  const r = el.getBoundingClientRect();
  if (r.top < 160 || r.bottom > innerHeight - 90) el.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function lsSpeak(run) {
  if (run !== ls.run || !ls.on) return;
  const el = ls.items[ls.i];
  if (!el || !el.isConnected) return lsEnd();
  lsMark(el);
  const p = LS_PERSONAS[ls.persona], voice = lsCast(ls.lang).cast[ls.persona], head = /^H/.test(el.tagName);
  const steps = lsChunks(lsSay(el.textContent, head)).flatMap((s, k) => lsSegments(s).map((g, j, all) => ({ ...g, s, k, last: j === all.length - 1 })));
  let n = 0;
  const next = () => {
    if (run !== ls.run || !ls.on) return;
    if (n >= steps.length) { ls.i++; return setTimeout(() => lsSpeak(run), (head ? p.title : p.para) / ls.rate); }
    const st = steps[n++], tone = lsTone(st.s, ls.i + st.k, st.k === 0, p), u = new SpeechSynthesisUtterance(lsBreaths(st.text));
    u.lang = voice ? voice.lang : ls.lang; if (voice) u.voice = voice;
    u.rate = tone.rate * (st.emph ? p.emph : 1) * ls.rate; u.pitch = tone.pitch - (st.emph ? .02 : 0); u.volume = 1;
    // A breath after each sentence, a longer one after a short sentence that should land; none inside one.
    u.onend = () => (ls.spoke = true) && st.last && n < steps.length ? setTimeout(next, (p.sentence + (st.s.length < 60 ? 220 : 0)) / ls.rate) : next();
    u.onstart = () => { ls.spoke = true; };
    u.onerror = e => { if (run === ls.run && e.error !== 'interrupted' && e.error !== 'canceled') lsStop(); };
    lsSynth.speak(u);
  };
  next();
  if (!ls.spoke) setTimeout(() => { if (run === ls.run && ls.on && !ls.spoke && !lsSynth.speaking) lsPause(); }, 4000);
  lsPaint();
}

// The screen stays awake while listening (a locked phone stops the voice), and the phone's lock screen and
// headphone buttons show and control the book where the browser allows it.
async function lsAwake(on, audio) {
  try {
    if (on && !audio && !ls.lock && navigator.wakeLock) ls.lock = await navigator.wakeLock.request('screen');
    if (!on && ls.lock) { await ls.lock.release(); ls.lock = null; }
  } catch (e) { ls.lock = null; }
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.playbackState = on ? 'playing' : ls.items.length ? 'paused' : 'none';
    if (on) navigator.mediaSession.metadata = new MediaMetadata({ title: document.querySelector('.reader-text .ch-title')?.textContent || '',
      artist: 'Oscar Abreu', album: document.querySelector('.reader-bar .muted')?.textContent || 'Museo Abreu',
      artwork: [{ src: new URL('img/ecce-homo-cover-800.jpg', location.href).href, sizes: '800x800', type: 'image/jpeg' }] });
  } catch (e) {}
}

/* ---------- Oscar Abreu's voice: the recorded book ---------- */

// Where a chapter of Ecce Homo is recorded in Oscar Abreu's voice (api/audio.js), Listen plays the recording
// instead of the phone's voice: part by part (a paragraph each), the paragraph being heard lit, at the chosen
// speed, the next part fetched while one plays. It goes on with the screen locked, like any audiobook. The
// free sample's parts are open to everyone; the rest to Pro and owners of the edition (the reading token).
const LS_SILENT = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAABAAAAlgAenp6enp6enp6enp6enp6enp6enp6enp6pqampqampqampqampqampqampqampqamptPT09PT09PT09PT09PT09PT09PT09PT09P/////////////////////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQCcQAAAAAAAAJY+/rsqgAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
let lsIndex = null, lsIndexP = null;
const lsLoadIndex = () => lsIndexP ||= fetch('/api/audio?index=1').then(r => r.ok ? r.json() : {}).catch(() => ({})).then(x => (lsIndex = x || {}));
// The recorded section on screen: Ecce Homo's reader, an edition and chapter in the index.
function lsRecTarget() {
  const m = location.hash.match(/^#\/leer\/([a-z]{2})\/(\d+)/), c = m && typeof CHAPTERS !== 'undefined' && CHAPTERS[+m[2]];
  return c && lsIndex && lsIndex[m[1]] && lsIndex[m[1]][c.key] ? { lang: m[1], sec: c.key } : null;
}
const lsAudio = () => ls.audio ||= Object.assign(new Audio(), { preload: 'auto' });
const lsNorm = x => String(x).replace(/[«»“”"'’‘]/g, '').replace(/\s*[—–]\s*/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().slice(0, 40);
function lsPartUrl(n) {
  const r = ls.rec, rd = typeof fbReader === 'function' ? fbReader() : null;
  if (r.urls[n]) return r.urls[n];
  const q = `lang=${r.lang}&ch=${r.sec}&n=${n}` + (rd ? `&e=${rd.e}&t=${rd.t}` : '');
  return r.urls[n] = fetch('/api/audio?' + q).then(x => { if (!x.ok) throw new Error(x.status); return x.blob(); }).then(b => URL.createObjectURL(b));
}
async function lsRecStart() {
  const a = lsAudio(), target = lsRecTarget();
  // The first sound must start within the tap on an iPhone: a moment of silence unlocks the player for what follows.
  if (!ls.unlocked) { a.src = LS_SILENT; a.play().catch(() => {}); ls.unlocked = true; }
  const art = document.querySelector('.reader-text');
  // Resuming: mid-paragraph where it stopped, or with the next paragraph if it stopped between two.
  if (ls.rec && ls.rec.sec === target.sec && ls.rec.lang === target.lang && ls.rec.started) {
    const run = ++ls.run; ls.on = true;
    if (a.ended || !a.currentTime) return lsRecPlay(run);
    a.onended = () => lsRecNext(run); a.playbackRate = ls.rate; a.play().catch(() => {}); return lsPaint();
  }
  if (art.querySelector('#fb-text .muted')) { if ((ls.wait = (ls.wait || 0) + 1) < 40) setTimeout(lsRecStart, 250); return; }
  ls.wait = 0;
  const rd = typeof fbReader === 'function' ? fbReader() : null;
  ls.on = true; ls.items = lsItems(art); ls.i = 0; lsPaint();
  try {
    const r = await fetch(`/api/audio?lang=${target.lang}&ch=${target.sec}` + (rd ? `&e=${rd.e}&t=${rd.t}` : ''));
    const man = r.ok ? await r.json() : null;
    if (!man) throw new Error('none');
    // A locked chapter for a reader without Pro: nothing to hear here.
    if (!man.parts.length) { ls.on = false; ls.items = []; return lsPaint(); }
    ls.rec = { ...target, parts: man.parts, k: 0, urls: {}, started: false };
    lsRecPlay(ls.run);
  } catch (e) { ls.on = false; ls.items = []; lsPaint(t('lsAudioErr')); }
}
// A breath between paragraphs, a longer one after a title.
function lsRecNext(run) {
  const r = ls.rec;
  if (!r || run !== ls.run) return;
  const head = r.parts[r.k] && r.parts[r.k].head;
  r.k++;
  setTimeout(() => lsRecPlay(run), (head ? 700 : 350) / ls.rate);
}
async function lsRecPlay(run) {
  const r = ls.rec;
  if (!r || run !== ls.run || !ls.on) return;
  const part = r.parts[r.k];
  if (!part) return lsEnd();
  const el = ls.items.find(x => lsNorm(x.textContent).startsWith(lsNorm(part.first).slice(0, 30)));
  if (el) { ls.i = ls.items.indexOf(el); lsMark(el); }
  try {
    const url = await lsPartUrl(part.n);
    if (r.parts[r.k + 1]) lsPartUrl(r.parts[r.k + 1].n).catch(() => {});
    if (run !== ls.run || !ls.on) return;
    const a = lsAudio();
    a.src = url; a.playbackRate = ls.rate; r.started = true;
    a.onended = () => lsRecNext(run);
    await a.play();
    lsAwake(true, true); lsPaint();
  } catch (e) { if (run === ls.run) { ls.on = false; lsPaint(t('lsAudioErr')); } }
}

function lsStart(fromAuto) {
  const art = document.querySelector('.reader-text');
  if (!art) return;
  if (lsRecTarget()) return lsRecStart();
  if (!lsSynth) return;
  ls.lang = (art.getAttribute('lang') || lang).slice(0, 2);
  const { known, cast } = lsCast(ls.lang);
  if (known && !cast.curator) { lsPaint(t('lsNoVoice', { lang: L(LANG_NAMES[ls.lang] || { en: ls.lang }) })); return; }
  // The whole book's text may still be on its way: wait for it a little.
  if (art.querySelector('#fb-text .muted, #fu-text .muted')) {
    if ((ls.wait = (ls.wait || 0) + 1) < 40) setTimeout(() => lsStart(fromAuto), 250);
    return;
  }
  ls.wait = 0;
  const items = lsItems(art);
  if (!items.length) return fromAuto ? lsStop() : undefined;
  if (ls.items[0] !== items[0]) ls.i = 0;
  ls.items = items; ls.on = true; ls.spoke = false;
  lsAwake(true);
  const run = ++ls.run;
  // A voice that was just stopped needs a moment on some phones; the first one must start within the tap (iPhone).
  if (lsSynth.speaking || lsSynth.pending) { lsSynth.cancel(); setTimeout(() => lsSpeak(run), 60); } else lsSpeak(run);
}
const lsRestart = () => {
  if (ls.rec) { lsAudio().playbackRate = ls.rate; return lsPaint(); }
  if (!ls.on) return lsPaint(); const run = ++ls.run; lsSynth.cancel(); setTimeout(() => lsSpeak(run), 60);
};

// A recording pauses where it is and resumes there; the phone's voice resumes at the paragraph's start.
function lsPause() {
  ls.on = false;
  if (ls.rec) { ls.run++; lsAudio().pause(); return lsPaint(); }
  ls.run++; lsSynth && lsSynth.cancel(); lsAwake(false); lsPaint();
}
function lsStop() {
  ls.on = false; ls.run++;
  if (ls.audio) { ls.audio.pause(); ls.audio.onended = null; }
  if (ls.rec) Object.values(ls.rec.urls).forEach(p => p.then(u => URL.revokeObjectURL(u)).catch(() => {}));
  ls.rec = null; lsSynth && lsSynth.cancel();
  ls.i = 0; ls.items = []; lsMark(null); lsAwake(false); lsPaint();
}

// At the end of a chapter the next one follows, when there is one to read.
function lsEnd() {
  const art = document.querySelector('.reader-text'), nextA = document.querySelector('.reader-nav a.dark');
  lsStop();
  if (art && !art.querySelector('.bk-sample-end') && nextA) {
    try { sessionStorage.setItem('ma.lsAuto', '1'); } catch (e) {}
    location.hash = nextA.getAttribute('href');
  }
}

/* ---------- The listening bar ---------- */

// "Listen to the sample" (or "Listen", for a reader of the whole book) on the homepage and in the library: it
// opens the reader and starts the voice there. The tap is what lets the phone speak; where a phone still
// refuses (the voice does not start within a few seconds), the reader waits on its Listen button instead.
const lsLink = (l, cls) => lsSynth ? `<a class="${cls}" href="#/leer/${l}/0" data-ls-start><span aria-hidden="true">▶</span> ${t(typeof readsWhole === 'function' && readsWhole(l) ? 'lsListen' : 'lsSample')}</a>` : '';
document.addEventListener('click', e => { if (e.target.closest('[data-ls-start]')) try { sessionStorage.setItem('ma.lsAuto', '1'); } catch (x) {} }, true);

// The chapter's remaining minutes, at the voice's pace (about 150 words a minute at 1×).
function lsMinutesLeft() {
  const words = ls.items.slice(ls.i).reduce((n, el) => n + (el.textContent.match(/\S+/g) || []).length, 0);
  return Math.max(1, Math.round(words / (150 * (ls.rec ? .95 : LS_PERSONAS[ls.persona].rate) * ls.rate)));
}

function lsPaint(note) {
  const row = document.querySelector('.ls-row');
  if (!row) return;
  const started = ls.items.length > 0, play = row.querySelector('[data-ls="play"]');
  play.innerHTML = ls.on ? `<span aria-hidden="true">❚❚</span> ${t('lsPause')}` : `<span aria-hidden="true">▶</span> ${started ? t('lsResume') : t('lsListen')}`;
  play.setAttribute('aria-pressed', String(ls.on));
  row.querySelector('[data-ls="rate"]').textContent = String(ls.rate).replace('.', lang === 'en' ? '.' : ',') + '×';
  row.querySelector('[data-ls="stop"]').hidden = !started;
  const oscar = !!lsRecTarget(), sel = row.querySelector('.ls-voice');
  sel.value = ls.persona; sel.hidden = oscar;
  row.querySelector('.ls-oscar').hidden = !oscar;
  row.querySelector('.ls-note').textContent = note || (started
    ? `${Math.min(ls.i + 1, ls.items.length)} / ${ls.items.length} · ${t('lsMin', { n: lsMinutesLeft() })}`
    : oscar ? t('lsOscarNote') : t('lsT' + ls.persona));
}

function lsMount() {
  const bar = document.querySelector('.reader-bar');
  if (!bar || bar.querySelector('.ls-row')) return;
  if (!lsSynth && !(lsIndex && lsRecTarget())) return;
  bar.insertAdjacentHTML('beforeend', `<div class="ls-row" role="group" aria-label="${esc(t('lsListen'))}">
    <button type="button" class="btn small dark ls-play" data-ls="play" aria-pressed="false"></button>
    <span class="ls-oscar" hidden>${t('lsOscar')}</span>
    <select class="ls-voice" aria-label="${esc(t('lsVoice'))}">${LS_ORDER.map(p => `<option value="${p}">${t('lsP' + p)}</option>`).join('')}</select>
    <button type="button" class="btn small" data-ls="rate" aria-label="${esc(t('lsSpeed'))}"></button>
    <button type="button" class="btn small" data-ls="stop" aria-label="${esc(t('lsStop'))}" hidden><span aria-hidden="true">■</span></button>
    <span class="ls-note"></span></div>`);
  const row = bar.querySelector('.ls-row');
  row.addEventListener('click', e => {
    const b = e.target.closest('[data-ls]');
    if (!b) return;
    if (b.dataset.ls === 'play') ls.on ? lsPause() : lsStart();
    else if (b.dataset.ls === 'stop') lsStop();
    else {
      ls.rate = LS_RATES[(LS_RATES.indexOf(ls.rate) + 1) % LS_RATES.length] || 1;
      try { localStorage.setItem('ma.lsRate', ls.rate); } catch (e) {}
      lsRestart();
    }
  });
  row.querySelector('.ls-voice').addEventListener('change', e => {
    ls.persona = e.target.value;
    try { localStorage.setItem('ma.lsPersona', ls.persona); } catch (e) {}
    lsRestart();
  });
  lsPaint();
  let auto = false;
  try { auto = sessionStorage.getItem('ma.lsAuto') === '1'; sessionStorage.removeItem('ma.lsAuto'); } catch (e) {}
  if (auto) lsStart(true);
}

if (lsSynth) lsSynth.getVoices();
lsLoadIndex().then(() => { lsMount(); lsPaint(); });
{
  if ('mediaSession' in navigator) try {
    navigator.mediaSession.setActionHandler('play', () => lsStart());
    navigator.mediaSession.setActionHandler('pause', () => lsPause());
    navigator.mediaSession.setActionHandler('stop', () => lsStop());
  } catch (e) {}
  // Leaving the page stops the voice; a new reader page gets its controls; coming back to the app re-asks for
  // the awake screen, which the phone drops when the app is hidden.
  window.addEventListener('hashchange', () => { if (ls.on || ls.items.length) lsStop(); });
  window.addEventListener('pagehide', () => lsSynth && lsSynth.cancel());
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && ls.on && !ls.rec) { ls.lock = null; lsAwake(true); } });
  new MutationObserver(() => {
    if (ls.items.length && !ls.items[0].isConnected) lsStop();
    lsMount();
  }).observe(document.getElementById('main'), { childList: true, subtree: true });
}
