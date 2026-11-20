// After an event: the photo gallery on the event page (uploaded from the dashboard, served by
// api/photos.js), the dashboard's photo page (#/admin/fotos/<event>/<date>) and a WhatsApp
// thank-you for each guest who came, linking to the photos.

Object.assign(I18N.es, { phTitle: 'Fotos de la noche', phCount: '{n} fotos', phPrev: 'Anterior', phNext: 'Siguiente', phOpen: 'Ver foto {n}' });
Object.assign(I18N.en, { phTitle: 'Photos of the evening', phCount: '{n} photos', phPrev: 'Previous', phNext: 'Next', phOpen: 'View photo {n}' });
Object.assign(I18N.fr, { phTitle: 'Photos de la soirée', phCount: '{n} photos', phPrev: 'Précédente', phNext: 'Suivante', phOpen: 'Voir la photo {n}' });

const photoURL = (ev, date, id) => `/api/photos?event=${ev}&date=${date}&id=${id}`;
const galleryCache = {};

/* ---------- Public gallery on the event page ---------- */

async function loadGallery(evId) {
  const box = document.getElementById('ev-photos');
  if (!box) return;
  try {
    const g = galleryCache[evId] || (galleryCache[evId] = await (await fetch(`/api/photos?event=${evId}`)).json());
    if (!g.photos || !g.photos.length) return;
    box.innerHTML = `<h2>${t('phTitle')}</h2><p class="muted">${fmtDate(g.date)} · ${t('phCount', { n: g.photos.length })}</p>
      <div class="ph-grid">${g.photos.map((p, i) => `<button class="ph-thumb" data-action="phOpen" data-ev="${evId}" data-i="${i}" aria-label="${t('phOpen', { n: i + 1 })}">
        <img src="${photoURL(evId, g.date, p.id)}" alt="" loading="lazy" width="${p.w || 600}" height="${p.h || 400}"></button>`).join('')}</div>`;
    box.hidden = false;
  } catch (e) { /* no gallery: the section stays hidden */ }
}

function openPhoto(evId, i) {
  const g = galleryCache[evId], n = g.photos.length;
  let k = (i + n) % n;
  const dlg = document.createElement('dialog');
  dlg.className = 'ph-view';
  const show = () => { dlg.querySelector('img').src = photoURL(evId, g.date, g.photos[k].id); dlg.querySelector('.ph-n').textContent = `${k + 1} / ${n}`; };
  dlg.innerHTML = `<div class="ph-frame"><img alt=""><div class="ph-bar"><button class="btn small" data-d="-1">${t('phPrev')}</button>
    <span class="ph-n" aria-live="polite"></span><button class="btn small" data-d="1">${t('phNext')}</button>
    <button class="btn small" value="close">${t('close')}</button></div></div>`;
  dlg.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (e.target === dlg || (b && b.value === 'close')) return dlg.close();
    if (b && b.dataset.d) { k = (k + Number(b.dataset.d) + n) % n; show(); }
  });
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { k = (k + (e.key === 'ArrowRight' ? 1 : -1) + n) % n; show(); } });
  dlg.addEventListener('close', () => dlg.remove());
  document.body.appendChild(dlg); show(); dlg.showModal();
}

{
  const ev = pageEvent;
  pageEvent = id => {
    setTimeout(() => loadGallery(id), 0);
    return ev(id).replace(/<\/div>\s*$/, `<section class="section" id="ev-photos" hidden></section></div>`);
  };
  EXTRA_ROUTES.evento = pageEvent;
}
EXTRA_ACTIONS.phOpen = el => openPhoto(el.dataset.ev, Number(el.dataset.i));

/* ---------- Dashboard: photos page ---------- */

Object.assign(I18N.es, {
  adPhotos: 'Fotos de eventos', adPhotoDate: 'Fecha del evento', adUpload: 'Subir fotos', adUploading: 'Subiendo {n} de {m}…', adUploaded: '{n} fotos subidas.',
  adPhotosHelp: 'Las fotos se publican en la página del evento, en «Fotos de la noche». Se reducen antes de subirlas.',
  adThank: 'Enviar agradecimiento', adThanked: 'Agradecido ✓',
});
Object.assign(I18N.en, {
  adPhotos: 'Event photos', adPhotoDate: 'Event date', adUpload: 'Upload photos', adUploading: 'Uploading {n} of {m}…', adUploaded: '{n} photos uploaded.',
  adPhotosHelp: 'Photos are published on the event page, under “Photos of the evening”. They are resized before uploading.',
  adThank: 'Send thank-you', adThanked: 'Thanked ✓',
});
Object.assign(I18N.fr, {
  adPhotos: 'Photos des événements', adPhotoDate: 'Date de l’événement', adUpload: 'Ajouter des photos', adUploading: 'Envoi {n} sur {m}…', adUploaded: '{n} photos ajoutées.',
  adPhotosHelp: 'Les photos sont publiées sur la page de l’événement, dans « Photos de la soirée ». Elles sont réduites avant l’envoi.',
  adThank: 'Envoyer un remerciement', adThanked: 'Remercié ✓',
});

let adPhotoDoc = null, adPhotoNote = '';
// The occurrence the photos belong to: the last one if it was within the past 60 days, else the next.
function photoDefaultDate(ev) {
  const next = eventDate(ev), prev = (Number(next.slice(0, 4)) - 1) + next.slice(4);
  return (Date.parse(todayPC()) - Date.parse(prev)) / 864e5 <= 60 ? prev : next;
}

async function adLoadPhotos(ev, date) {
  try { adPhotoDoc = { event: ev, date, ...(await (await fetch(`/api/photos?event=${ev}&date=${date}`, { cache: 'no-store' })).json()) }; }
  catch (e) { adPhotoDoc = { event: ev, date, photos: [] }; }
  if (location.hash.startsWith('#/admin/fotos')) route();
}

function pagePhotos(ev, date) {
  if (!adPhotoDoc || adPhotoDoc.event !== ev || adPhotoDoc.date !== date) { adPhotoDoc = null; setTimeout(() => adLoadPhotos(ev, date), 0); }
  const ps = (adPhotoDoc && adPhotoDoc.photos) || [];
  return `<div class="wrap admin">
    <a href="#/admin" class="btn small"><span class="arr">←</span> ${t('adBack')}</a>
    <section class="section"><p class="eyebrow">${t('adPhotos')}</p><h1 class="h2">${esc(adEventName(ev))}</h1>
      <p class="muted">${t('adPhotosHelp')}</p>
      <div class="field" style="max-width:260px"><label for="ph-date">${t('adPhotoDate')}</label>
        <input id="ph-date" type="date" value="${date}" data-ev="${esc(ev)}"></div>
      <label class="btn primary ph-upload">${t('adUpload')}<input id="ph-files" type="file" accept="image/*" multiple data-ev="${esc(ev)}" data-date="${date}"></label>
      <p class="status" id="ph-status" role="status" aria-live="polite"${adPhotoNote ? '' : ' hidden'}>${esc(adPhotoNote)}</p>
      <div class="ph-grid">${ps.map(p => `<div class="ph-admin"><img src="${photoURL(ev, date, p.id)}" alt="" loading="lazy">
        <button class="btn small" data-action="phRemove" data-ev="${esc(ev)}" data-date="${date}" data-id="${p.id}" aria-label="${t('inRemove')}">×</button></div>`).join('')}</div>
    </section></div>`;
}

// Resizes to at most 1600 px on the long side and JPEG, then uploads one by one.
function shrink(file) {
  return new Promise((ok, fail) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      ok({ data: c.toDataURL('image/jpeg', 0.82).split(',')[1], w: c.width, h: c.height });
    };
    img.onerror = fail; img.src = url;
  });
}
async function adPost(body) {
  const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(r.status);
  return r.json();
}
document.addEventListener('change', async e => {
  if (e.target.id === 'ph-date') return void (location.hash = `#/admin/fotos/${e.target.dataset.ev}/${e.target.value}`);
  if (e.target.id !== 'ph-files') return;
  const files = [...e.target.files], { ev, date } = e.target.dataset, out = document.getElementById('ph-status');
  let done = 0;
  for (const f of files) {
    out.hidden = false; out.textContent = t('adUploading', { n: done + 1, m: files.length });
    try { const p = await shrink(f); const doc = await adPost({ action: 'photo-add', event: ev, date, ...p }); adPhotoDoc = { event: ev, date, photos: doc.photos }; done++; }
    catch (err) { /* a failed photo is skipped; the count shows it */ }
  }
  adPhotoNote = t('adUploaded', { n: done }) + (done < files.length ? ' ' + t('adSaveErr') : '');
  route();
});
EXTRA_ACTIONS.phRemove = async el => {
  try { const doc = await adPost({ action: 'photo-remove', event: el.dataset.ev, date: el.dataset.date, id: el.dataset.id }); adPhotoDoc = { event: el.dataset.ev, date: el.dataset.date, photos: doc.photos }; delete galleryCache[el.dataset.ev]; route(); }
  catch (e) { adPhotoNote = t('adSaveErr'); route(); }
};

/* ---------- Thank-you on WhatsApp, from the door list ---------- */

const THANKS = {
  es: '{name}, gracias por acompañarnos en {event}. Fue un honor recibirle en el Museo Abreu. Vea las fotos de la noche aquí: {link}',
  en: 'Dear {name}, thank you for joining us at {event}. It was an honour to welcome you to Museo Abreu. See the photos of the evening here: {link}',
  fr: '{name}, merci de nous avoir accompagnés lors de {event}. Ce fut un honneur de vous accueillir au Museo Abreu. Retrouvez les photos de la soirée ici : {link}',
};
function thankText(r) {
  const gl = THANKS[r.lang] ? r.lang : 'en', w = eventWords(r.event, r.date, gl);
  return THANKS[gl].replace('{name}', (r.name || '').split(' ')[0]).replace('{event}', w.title).replace('{link}', `${location.origin}/e/${r.event}?l=${gl}`);
}
{
  const row = doorRow;
  doorRow = r => {
    const phone = (r.phone || '').replace(/\D/g, '');
    if (!r.arrived || !phone) return row(r);
    const done = adSentList().includes('ty:' + r.id);
    const btn = `<a class="btn small ${done ? '' : 'wa'}" data-action="adRemind" data-id="ty:${esc(r.id)}" href="https://wa.me/${phone}?text=${encodeURIComponent(thankText(r))}" target="_blank" rel="noopener">${done ? t('adThanked') : t('adThank')}</a>`;
    return row(r).replace(/(<button class="btn small[^>]*data-action="adCheckin"[^>]*>[^<]*<\/button>)/, `<div class="ad-actions">${btn}$1</div>`);
  };
}
// adRemind marks the button "Sent"; for thank-you buttons say "Thanked".
{
  const remind = EXTRA_ACTIONS.adRemind;
  EXTRA_ACTIONS.adRemind = el => { remind(el); if (el.dataset.id.startsWith('ty:')) setTimeout(() => { el.textContent = t('adThanked'); }, 350); };
}

// Dashboard block: a "Photos" button per yearly event; route for the photo page.
{
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    if (!adData) return html;
    const block = `<section class="section"><h2>${t('adPhotos')}</h2><div class="btn-row">${ANNUAL_EVENTS.map(ev =>
      `<a class="btn" href="#/admin/fotos/${ev.id}/${photoDefaultDate(ev)}">${esc(L(ev.name))}</a>`).join('')}</div></section>`;
    const at = html.indexOf(`<section class="section"><div class="section-head"><h2>${t('adBids')}`);
    return at > 0 ? html.slice(0, at) + block + html.slice(at) : html + block;
  };
  const route0 = EXTRA_ROUTES.admin;
  EXTRA_ROUTES.admin = (sub, ev, date) => sub === 'fotos' && adData ? pagePhotos(ev, date) : route0(sub, ev, date);
}
