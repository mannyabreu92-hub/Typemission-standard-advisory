// Door scanner (#/admin/escanear, staff only): scans the QR of an ART GABANGI ticket bought on Whop
// with the phone camera, or takes the code typed in, and checks it in on the server (api/admin.js,
// "ticket-check"): valid → admitted; already used (with the time), refunded or unknown are shown in
// colour. Uses the browser's BarcodeDetector where it exists, else jsQR (vendor/jsQR.js, loaded here).

Object.assign(I18N.es, {
  scTitle: 'Escanear entradas', scLead: 'Apunte la cámara al código QR de la entrada. También puede escribir el código.',
  scStart: 'Abrir la cámara', scStop: 'Cerrar la cámara', scNoCam: 'No se pudo abrir la cámara. Escriba el código.',
  scCode: 'Código de la entrada', scCheck: 'Comprobar', scCount: 'Han entrado {a} de {b} entradas · personas dentro: {p}',
  scOk: 'Bienvenido', scUsed: 'Ya usada', scUsedAt: 'Entró a las {time}', scVoid: 'Reembolsada: no es válida', scUnknown: 'No es una entrada del museo',
  scAdmits: 'Pueden entrar {n} personas', scAdmits1: 'Puede entrar 1 persona', scUndo: 'Deshacer entrada', scUndone: 'Entrada deshecha.',
  scRecent: 'Últimas lecturas', scErr: 'Sin conexión: no se pudo comprobar.', adScan: 'Escanear entradas',
});
Object.assign(I18N.en, {
  scTitle: 'Scan tickets', scLead: 'Point the camera at the ticket’s QR code. You can also type the code.',
  scStart: 'Open the camera', scStop: 'Close the camera', scNoCam: 'The camera could not be opened. Type the code instead.',
  scCode: 'Ticket code', scCheck: 'Check', scCount: '{a} of {b} tickets checked in · people inside: {p}',
  scOk: 'Welcome', scUsed: 'Already used', scUsedAt: 'Checked in at {time}', scVoid: 'Refunded: not valid', scUnknown: 'Not a museum ticket',
  scAdmits: 'Admits {n} people', scAdmits1: 'Admits 1 person', scUndo: 'Undo check-in', scUndone: 'Check-in undone.',
  scRecent: 'Recent scans', scErr: 'No connection: could not check.', adScan: 'Scan tickets',
});
Object.assign(I18N.fr, {
  scTitle: 'Scanner les billets', scLead: 'Pointez la caméra vers le QR code du billet. Vous pouvez aussi saisir le code.',
  scStart: 'Ouvrir la caméra', scStop: 'Fermer la caméra', scNoCam: 'Impossible d’ouvrir la caméra. Saisissez le code.',
  scCode: 'Code du billet', scCheck: 'Vérifier', scCount: '{a} billets sur {b} enregistrés · personnes entrées : {p}',
  scOk: 'Bienvenue', scUsed: 'Déjà utilisé', scUsedAt: 'Entré à {time}', scVoid: 'Remboursé : non valable', scUnknown: 'Ce n’est pas un billet du musée',
  scAdmits: '{n} personnes peuvent entrer', scAdmits1: '1 personne peut entrer', scUndo: 'Annuler l’entrée', scUndone: 'Entrée annulée.',
  scRecent: 'Dernières lectures', scErr: 'Pas de connexion : vérification impossible.', adScan: 'Scanner les billets',
});

let scStream = null, scLast = { code: '', at: 0 }, scBusy = false, scRecent = [];
const scTier = key => { const gb = EVENTS.find(e => e.id === 'art-gabangi'), tier = gb && gb.tiers.find(x => x.id === String(key).slice(8)); return tier ? L(tier.name) : key; };
const scTime = iso => new Date(iso).toLocaleTimeString(lang, { hour: 'numeric', minute: '2-digit', timeZone: 'America/Santo_Domingo' });

function scCounts() {
  const ok = (adData.tickets || []).filter(x => !x.void), inn = ok.filter(x => x.usedAt);
  return t('scCount', { a: inn.length, b: ok.length, p: inn.reduce((n, x) => n + (x.qty || 1), 0) });
}

function pageScan() {
  return `<div class="wrap admin scan">
    <a href="#/admin" class="btn small"><span class="arr">←</span> ${t('adBack')}</a>
    <section class="section"><p class="eyebrow">ART GABANGI</p><h1 class="h2">${t('scTitle')}</h1>
      <p class="muted">${t('scLead')}</p>
      <p class="door-count" id="sc-count">${scCounts()}</p>
      <div class="sc-view"><video id="sc-video" playsinline muted hidden></video>
        <button class="btn primary" data-action="scCam" id="sc-cam">${t(scStream ? 'scStop' : 'scStart')}</button></div>
      <form class="unlock-row sc-form" data-form="scan" novalidate>
        <label class="visually-hidden" for="sc-code">${t('scCode')}</label>
        <input id="sc-code" placeholder="GB-XXXX-XXXX" autocomplete="off" autocapitalize="characters" spellcheck="false">
        <button class="btn" type="submit">${t('scCheck')}</button></form>
      <div id="sc-result" class="sc-result" role="status" aria-live="assertive"></div>
      <h2 class="h3" style="margin-top:1.4rem">${t('scRecent')}</h2>
      <ul class="sc-recent" id="sc-recent">${scRecentHTML()}</ul>
    </section></div>`;
}
const scRecentHTML = () => scRecent.map(r => `<li class="sc-${r.status}"><strong>${esc(r.code)}</strong> · ${esc(r.label)} <span class="muted">${scTime(r.at)}</span></li>`).join('');

async function scCheck(code, admit = true) {
  code = String(code).trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  const out = document.getElementById('sc-result');
  if (!/^GB-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(code)) return scShow({ status: 'unknown', code });
  if (scBusy) return; scBusy = true;
  try {
    const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() },
      body: JSON.stringify({ action: admit ? 'ticket-check' : 'ticket-undo', code, admit }) });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { adData = null; route(); return; }
    if (!r.ok && r.status !== 404) throw new Error(r.status);
    const i = (adData.tickets || []).findIndex(x => x.code === d.code);
    if (i >= 0 && d.code) adData.tickets[i] = { ...adData.tickets[i], usedAt: d.usedAt, void: d.void };
    scShow({ status: r.status === 404 ? 'unknown' : d.status, ...d, code });
  } catch (e) { if (out) { out.className = 'sc-result sc-err'; out.textContent = t('scErr'); } }
  finally { scBusy = false; }
}
function scShow(d) {
  const out = document.getElementById('sc-result'); if (!out) return;
  const title = { admitted: t('scOk'), used: t('scUsed'), void: t('scVoid'), unknown: t('scUnknown'), undone: t('scUndone') }[d.status] || t('scUnknown');
  const ok = d.status === 'admitted';
  out.className = 'sc-result sc-' + d.status;
  out.innerHTML = `<p class="sc-big">${ok ? '✓' : d.status === 'used' ? '!' : d.status === 'undone' ? '↺' : '✕'} ${esc(title)}</p>
    ${d.key ? `<p><strong>${esc(scTier(d.key))}</strong> · ${t(d.qty > 1 ? 'scAdmits' : 'scAdmits1', { n: d.qty })}</p>` : ''}
    ${d.status === 'used' ? `<p>${t('scUsedAt', { time: scTime(d.usedAt) })}</p>` : ''}
    <p class="muted">${esc(d.code)}${d.email ? ' · ' + esc(d.email) : ''}</p>
    ${ok || d.status === 'used' ? `<button class="btn small" data-action="scUndo" data-code="${esc(d.code)}">${t('scUndo')}</button>` : ''}`;
  if (navigator.vibrate) navigator.vibrate(ok ? 80 : [80, 60, 80]);
  if (d.status !== 'undone') { scRecent = [{ code: d.code, status: d.status, label: title, at: new Date().toISOString() }, ...scRecent].slice(0, 10); }
  const rec = document.getElementById('sc-recent'); if (rec) rec.innerHTML = scRecentHTML();
  const cnt = document.getElementById('sc-count'); if (cnt) cnt.textContent = scCounts();
}

// Camera: BarcodeDetector where available, else jsQR on a small canvas, a few frames a second.
async function scCamOn() {
  const video = document.getElementById('sc-video');
  try {
    scStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
  } catch (e) { scShowMsg(t('scNoCam')); return; }
  video.srcObject = scStream; video.hidden = false; await video.play().catch(() => {});
  document.getElementById('sc-cam').textContent = t('scStop');
  let detect;
  if ('BarcodeDetector' in window && (await BarcodeDetector.getSupportedFormats().catch(() => [])).includes('qr_code')) {
    const bd = new BarcodeDetector({ formats: ['qr_code'] });
    detect = async () => ((await bd.detect(video).catch(() => []))[0] || {}).rawValue;
  } else {
    if (typeof jsQR === 'undefined') await new Promise((ok, fail) => { const s = document.createElement('script'); s.src = 'vendor/jsQR.js'; s.onload = ok; s.onerror = fail; document.head.appendChild(s); }).catch(() => {});
    const c = document.createElement('canvas'), ctx = c.getContext('2d', { willReadFrequently: true });
    detect = async () => {
      if (typeof jsQR === 'undefined' || !video.videoWidth) return;
      const k = 480 / Math.max(video.videoWidth, video.videoHeight); c.width = video.videoWidth * k; c.height = video.videoHeight * k;
      ctx.drawImage(video, 0, 0, c.width, c.height);
      const r = jsQR(ctx.getImageData(0, 0, c.width, c.height).data, c.width, c.height, { inversionAttempts: 'dontInvert' });
      return r && r.data;
    };
  }
  const loop = async () => {
    if (!scStream || !location.hash.startsWith('#/admin/escanear')) return scCamOff();
    const code = await detect();
    // The same ticket held in front of the camera is read once every few seconds, not on every frame.
    if (code && !scBusy && (code !== scLast.code || Date.now() - scLast.at > 5000)) { scLast = { code, at: Date.now() }; await scCheck(code); }
    setTimeout(loop, 250);
  };
  loop();
}
function scCamOff() {
  if (scStream) scStream.getTracks().forEach(tr => tr.stop());
  scStream = null;
  const v = document.getElementById('sc-video'); if (v) { v.srcObject = null; v.hidden = true; }
  const b = document.getElementById('sc-cam'); if (b) b.textContent = t('scStart');
}
const scShowMsg = msg => { const out = document.getElementById('sc-result'); if (out) { out.className = 'sc-result sc-err'; out.textContent = msg; } };

EXTRA_FORMS.scan = form => { const i = form.querySelector('#sc-code'); scCheck(i.value); i.value = ''; i.focus(); };
Object.assign(EXTRA_ACTIONS, {
  scCam: () => (scStream ? scCamOff() : scCamOn()),
  scUndo: el => scCheck(el.dataset.code, false),
});
window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#/admin/escanear')) scCamOff(); });

{
  const route0 = EXTRA_ROUTES.admin;
  EXTRA_ROUTES.admin = (sub, ev, date) => sub === 'escanear' && adData ? pageScan() : route0(sub, ev, date);
  // Dashboard: a "Scan tickets" button next to Refresh.
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    return adData ? html.replace('<button class="btn" data-action="adRefresh">', `<a class="btn primary" href="#/admin/escanear">${t('adScan')}</a><button class="btn" data-action="adRefresh">`) : html;
  };
}
