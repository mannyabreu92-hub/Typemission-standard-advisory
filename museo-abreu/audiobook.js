// Dashboard › Audiobook (#/admin/audio): Ecce Homo recorded in Oscar Abreu's voice, cloned with his permission
// in the museum's ElevenLabs account (api/narrate.js). The museum chooses an edition and records the free
// sample, one chapter, or every chapter not yet recorded; each chapter is recorded part by part (a paragraph
// each) from the edition's uploaded text, with progress shown and a Stop button. The reader then plays the
// recordings (listen.js). Before recording the whole edition the dashboard shows how many characters it is,
// which is what ElevenLabs charges for.

Object.assign(I18N.es, {
  abTitle: 'Audiolibro con la voz de Oscar Abreu', adAudio: 'Audiolibro',
  abLead: 'Cada capítulo se graba una vez por edición con la voz clonada de Oscar Abreu (ElevenLabs) y se guarda en privado. La muestra gratuita se puede escuchar sin cuenta; el resto, en Pro.',
  abSetup: 'Falta conectar ElevenLabs: en Vercel › Settings › Environment Variables, añada ELEVENLABS_API_KEY y ELEVENLABS_VOICE_ID (la voz clonada de Oscar) y vuelva a desplegar.',
  abVoice: 'Voz conectada: {name}', abVoiceErr: 'ElevenLabs no reconoce la voz o la clave ({name}). Revise ELEVENLABS_VOICE_ID y ELEVENLABS_API_KEY.',
  abEdition: 'Edición', abSection: 'Capítulo', abSample: 'Grabar la muestra gratuita', abOne: 'Grabar este capítulo', abAll: 'Grabar toda la edición',
  abRemove: 'Borrar la grabación de este capítulo', abStop: 'Detener', abListen: 'Escuchar en el lector',
  abRecorded: 'grabado', abPartial: 'solo la muestra', abNone: 'sin grabar', abCount: '{n} de {total} capítulos grabados',
  abPlanning: 'Preparando el texto…', abWorking: '{sec}: parte {n} de {total}', abDoneOne: 'Grabado: {sec}.', abDoneAll: 'Edición grabada.', abStopped: 'Grabación detenida.',
  abConfirm: 'Grabar {n} capítulos: unos {chars} caracteres (lo que cobra ElevenLabs). ¿Continuar?', abNothing: 'Todos los capítulos de esta edición ya están grabados.',
  abNoText: 'Falta el texto de {sec}: suba esta edición en «Libro completo».', abErrKey: 'ElevenLabs rechazó la clave. Revise ELEVENLABS_API_KEY.',
  abErrVoice: 'ElevenLabs no encuentra la voz. Revise ELEVENLABS_VOICE_ID.', abErrQuota: 'Se acabaron los créditos de ElevenLabs. Amplíe el plan y continúe: lo ya grabado se conserva.',
  abErr: 'No se pudo grabar ({detail}). Inténtelo de nuevo.', abRemoved: 'Grabación borrada.',
});
Object.assign(I18N.en, {
  abTitle: 'Audiobook in Oscar Abreu’s voice', adAudio: 'Audiobook',
  abLead: 'Each chapter is recorded once per edition in Oscar Abreu’s cloned voice (ElevenLabs) and kept privately. The free sample can be heard without an account; the rest is in Pro.',
  abSetup: 'ElevenLabs is not connected yet: in Vercel › Settings › Environment Variables, add ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID (Oscar’s cloned voice), then redeploy.',
  abVoice: 'Voice connected: {name}', abVoiceErr: 'ElevenLabs does not recognise the voice or the key ({name}). Check ELEVENLABS_VOICE_ID and ELEVENLABS_API_KEY.',
  abEdition: 'Edition', abSection: 'Chapter', abSample: 'Record the free sample', abOne: 'Record this chapter', abAll: 'Record the whole edition',
  abRemove: 'Delete this chapter’s recording', abStop: 'Stop', abListen: 'Listen in the reader',
  abRecorded: 'recorded', abPartial: 'sample only', abNone: 'not recorded', abCount: '{n} of {total} chapters recorded',
  abPlanning: 'Preparing the text…', abWorking: '{sec}: part {n} of {total}', abDoneOne: 'Recorded: {sec}.', abDoneAll: 'Edition recorded.', abStopped: 'Recording stopped.',
  abConfirm: 'Record {n} chapters: about {chars} characters (what ElevenLabs charges for). Continue?', abNothing: 'Every chapter of this edition is already recorded.',
  abNoText: 'The text of {sec} is missing: upload this edition in “Full book”.', abErrKey: 'ElevenLabs refused the key. Check ELEVENLABS_API_KEY.',
  abErrVoice: 'ElevenLabs cannot find the voice. Check ELEVENLABS_VOICE_ID.', abErrQuota: 'The ElevenLabs credits have run out. Upgrade the plan and continue: what is recorded is kept.',
  abErr: 'Could not record ({detail}). Try again.', abRemoved: 'Recording deleted.',
});
Object.assign(I18N.fr, {
  abTitle: 'Livre audio avec la voix d’Oscar Abreu', adAudio: 'Livre audio',
  abLead: 'Chaque chapitre est enregistré une fois par édition avec la voix clonée d’Oscar Abreu (ElevenLabs) et conservé en privé. L’extrait gratuit s’écoute sans compte ; le reste, dans Pro.',
  abSetup: 'ElevenLabs n’est pas encore connecté : dans Vercel › Settings › Environment Variables, ajoutez ELEVENLABS_API_KEY et ELEVENLABS_VOICE_ID (la voix clonée d’Oscar), puis redéployez.',
  abVoice: 'Voix connectée : {name}', abVoiceErr: 'ElevenLabs ne reconnaît pas la voix ou la clé ({name}). Vérifiez ELEVENLABS_VOICE_ID et ELEVENLABS_API_KEY.',
  abEdition: 'Édition', abSection: 'Chapitre', abSample: 'Enregistrer l’extrait gratuit', abOne: 'Enregistrer ce chapitre', abAll: 'Enregistrer toute l’édition',
  abRemove: 'Supprimer l’enregistrement de ce chapitre', abStop: 'Arrêter', abListen: 'Écouter dans le lecteur',
  abRecorded: 'enregistré', abPartial: 'extrait seulement', abNone: 'non enregistré', abCount: '{n} chapitres enregistrés sur {total}',
  abPlanning: 'Préparation du texte…', abWorking: '{sec} : partie {n} sur {total}', abDoneOne: 'Enregistré : {sec}.', abDoneAll: 'Édition enregistrée.', abStopped: 'Enregistrement arrêté.',
  abConfirm: 'Enregistrer {n} chapitres : environ {chars} caractères (ce que facture ElevenLabs). Continuer ?', abNothing: 'Tous les chapitres de cette édition sont déjà enregistrés.',
  abNoText: 'Le texte de {sec} manque : téléversez cette édition dans « Livre complet ».', abErrKey: 'ElevenLabs a refusé la clé. Vérifiez ELEVENLABS_API_KEY.',
  abErrVoice: 'ElevenLabs ne trouve pas la voix. Vérifiez ELEVENLABS_VOICE_ID.', abErrQuota: 'Les crédits ElevenLabs sont épuisés. Augmentez le forfait et continuez : ce qui est enregistré est conservé.',
  abErr: 'Enregistrement impossible ({detail}). Réessayez.', abRemoved: 'Enregistrement supprimé.',
});

const ab = { info: null, lang: 'es', sec: 'intro', busy: false, stop: false, msg: '' };
const abPost = body => fetch('/api/narrate', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() }, body: JSON.stringify(body) })
  .then(async r => { const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(d.error || r.status), d); return d; });
const abLoad = () => fetch('/api/narrate', { headers: { Authorization: 'Bearer ' + adPassword() } }).then(r => r.ok ? r.json() : null).catch(() => null)
  .then(d => { ab.info = d || { configured: false, voice: '', index: {} }; route(); });
const abSecName = (key, l) => { const c = CHAPTERS.find(x => x.key === key); return c ? chTitle(c, l) : key; };
const abSay = m => { ab.msg = m; const o = document.getElementById('ab-status'); if (o) { o.textContent = m; o.hidden = !m; } };
const abErrText = (e, sec) => e.message === 'no-text' ? t('abNoText', { sec: abSecName(sec, ab.lang) }) : e.message === 'key' ? t('abErrKey')
  : e.message === 'voice' ? t('abErrVoice') : e.message === 'quota' ? t('abErrQuota') : t('abErr', { detail: [e.message, e.status, e.detail].filter(Boolean).join(' · ').slice(0, 160) });

function pageAudiobook() {
  if (!ab.info) { abLoad(); return `<div class="wrap admin"><p class="muted">${t('loadingText')}</p></div>`; }
  const i = ab.info, idx = (i.index || {})[ab.lang] || {}, langs = EDITIONS.map(e => e.lang);
  const full = CHAPTERS.filter(c => idx[c.key] && !idx[c.key].partial).length;
  const state = k => idx[k] ? (idx[k].partial ? t('abPartial') : t('abRecorded')) : t('abNone');
  const dis = ab.busy || !i.configured ? ' disabled' : '';
  return `<div class="wrap admin">
    <a href="#/admin" class="btn small"><span class="arr">←</span> ${t('adBack')}</a>
    <section class="section"><p class="eyebrow">Ecce Homo</p><h1 class="h2">${t('abTitle')}</h1>
      <p class="muted">${t('abLead')}</p>
      <p class="status">${!i.configured ? t('abSetup') : /^error/.test(i.voice) || !i.voice ? t('abVoiceErr', { name: i.voice || '—' }) : `<span class="remind-on">${esc(t('abVoice', { name: i.voice }))}</span>`}</p>
      <form class="bk-form" data-form="audiobook" novalidate>
        <div class="field"><label for="ab-lang">${t('abEdition')}</label><select id="ab-lang" data-ab="lang">${langs.map(l => `<option value="${l}"${l === ab.lang ? ' selected' : ''}>${L(LANG_NAMES[l])}</option>`).join('')}</select></div>
        <p class="muted">${t('abCount', { n: full, total: CHAPTERS.length })}</p>
        <div class="btn-row"><button class="btn primary" type="button" data-action="abSample"${dis}>${t('abSample')}</button>
          <button class="btn" type="button" data-action="abAll"${dis}>${t('abAll')}</button></div>
        <div class="field"><label for="ab-sec">${t('abSection')}</label><select id="ab-sec" data-ab="sec">${CHAPTERS.map(c => `<option value="${c.key}"${c.key === ab.sec ? ' selected' : ''}>${esc(chTitle(c, ab.lang))} · ${state(c.key)}</option>`).join('')}</select></div>
        <div class="btn-row"><button class="btn" type="button" data-action="abOne"${dis}>${t('abOne')}</button>
          ${idx[ab.sec] ? `<a class="btn" href="#/leer/${ab.lang}/${CHAPTERS.findIndex(c => c.key === ab.sec)}">${t('abListen')}</a>
          <button class="btn" type="button" data-action="abRemove"${ab.busy ? ' disabled' : ''}>${t('abRemove')}</button>` : ''}
          ${ab.busy ? `<button class="btn dark" type="button" data-action="abStop">${t('abStop')}</button>` : ''}</div>
        <p class="status" id="ab-status" role="status" aria-live="polite"${ab.msg ? '' : ' hidden'}>${esc(ab.msg)}</p>
      </form>
    </section></div>`;
}
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.ab;
  if (!k || ab.busy) return;
  ab[k] = e.target.value; ab.msg = ''; route();
});

// One section: its text in parts, each part recorded with the text around it, then the list of parts.
async function abRecord(sec) {
  const c = CHAPTERS.find(x => x.key === sec);
  abSay(t('abPlanning'));
  const p = await abPost({ action: 'plan', lang: ab.lang, sec, title: chTitle(c, ab.lang),
    sample: (sec === 'intro' || sec === 'ch1') && typeof SAMPLES !== 'undefined' && SAMPLES[ab.lang] ? SAMPLES[ab.lang][sec] : undefined });
  for (const part of p.parts) {
    if (ab.stop) throw new Error('stopped');
    abSay(t('abWorking', { sec: abSecName(sec, ab.lang), n: part.n + 1, total: p.parts.length }));
    await abPost({ action: 'make', lang: ab.lang, sec, n: part.n, text: part.text,
      prev: p.parts[part.n - 1] && p.parts[part.n - 1].text, next: p.parts[part.n + 1] && p.parts[part.n + 1].text });
  }
  const d = await abPost({ action: 'done', lang: ab.lang, sec, partial: p.partial, parts: p.parts.map(({ n, first, free, head }) => ({ n, first, free, head })) });
  ab.info.index = d.index;
}
async function abRun(secs, doneMsg) {
  ab.busy = true; ab.stop = false; route();
  let cur = secs[0];
  try {
    for (cur of secs) await abRecord(cur);
    ab.msg = doneMsg(cur);
  } catch (e) { ab.msg = e.message === 'stopped' ? t('abStopped') : abErrText(e, cur); }
  ab.busy = false; route();
}

Object.assign(EXTRA_ACTIONS, {
  abSample: () => abRun(['intro', 'ch1'], () => t('abDoneOne', { sec: `${abSecName('intro', ab.lang)} · ${abSecName('ch1', ab.lang)}` })),
  abOne: () => abRun([ab.sec], s => t('abDoneOne', { sec: abSecName(s, ab.lang) })),
  abAll: async () => {
    const idx = (ab.info.index || {})[ab.lang] || {}, todo = CHAPTERS.map(c => c.key).filter(k => !idx[k] || idx[k].partial);
    if (!todo.length) return abSay(t('abNothing'));
    abSay(t('abPlanning'));
    let chars = 0;
    try {
      for (const k of todo) chars += (await abPost({ action: 'plan', lang: ab.lang, sec: k, title: abSecName(k, ab.lang),
        sample: (k === 'intro' || k === 'ch1') && typeof SAMPLES !== 'undefined' && SAMPLES[ab.lang] ? SAMPLES[ab.lang][k] : undefined })).chars;
    } catch (e) { return abSay(abErrText(e, '')); }
    abSay('');
    if (!confirm(t('abConfirm', { n: todo.length, chars: chars.toLocaleString(lang) }))) return;
    abRun(todo, () => t('abDoneAll'));
  },
  abStop: () => { ab.stop = true; },
  abRemove: async () => {
    try { ab.info.index = (await abPost({ action: 'remove', lang: ab.lang, sec: ab.sec })).index; ab.msg = t('abRemoved'); }
    catch (e) { ab.msg = abErrText(e, ab.sec); }
    route();
  },
});
{
  const route0 = EXTRA_ROUTES.admin;
  EXTRA_ROUTES.admin = (sub, ev, date) => sub === 'audio' && adData ? pageAudiobook() : route0(sub, ev, date);
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    return adData ? html.replace('<button class="btn" data-action="adRefresh">', `<a class="btn" href="#/admin/audio">${t('adAudio')}</a><button class="btn" data-action="adRefresh">`) : html;
  };
}
