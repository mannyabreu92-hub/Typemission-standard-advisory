// Mailing list: "Keep me informed" on the home page, event pages and the auction (name, email and/or
// WhatsApp, what they are interested in), saved by api/subscribe.js. The dashboard lists everyone, with
// counts per interest, "Remove" and a CSV for an email or WhatsApp tool.

Object.assign(I18N.es, {
  nlTitle: 'Manténgase informado', nlLead: 'Inauguraciones, la subasta y el libro Ecce Homo: le escribiremos cuando haya novedades.',
  nlEmail: 'Correo electrónico', nlPhone: 'WhatsApp', nlOptional: '(opcional)', nlOneOf: 'Indique un correo o un número de WhatsApp.',
  nlTopics: 'Me interesa', nlEvents: 'Eventos', nlAuction: 'La subasta', nlBook: 'El libro Ecce Homo',
  nlSend: 'Suscribirme', nlThanks: 'Gracias, {name}. Le mantendremos informado.', nlJoined: 'Ya está en nuestra lista ✓', nlChange: 'Cambiar mis datos',
  nlPrivacy: 'Solo el museo ve sus datos. Para salir de la lista, responda «baja» a cualquier mensaje.', nlErr: 'No se pudo guardar. Inténtelo de nuevo.',
  adList: 'Lista de contactos', adListHelp: 'Personas que pidieron recibir noticias. Descargue el CSV para su programa de correo o de WhatsApp.',
  adListTopics: 'Intereses', adListLang: 'Idioma', adListRemove: 'Quitar', adListRemoveT: 'Quitar a {name} de la lista', adListConfirm: '¿Quitar a {name} de la lista?',
});
Object.assign(I18N.en, {
  nlTitle: 'Keep me informed', nlLead: 'Openings, the auction and the book Ecce Homo: we’ll write when there is news.',
  nlEmail: 'Email', nlPhone: 'WhatsApp', nlOptional: '(optional)', nlOneOf: 'Give an email or a WhatsApp number.',
  nlTopics: 'I’m interested in', nlEvents: 'Events', nlAuction: 'The auction', nlBook: 'The book Ecce Homo',
  nlSend: 'Sign me up', nlThanks: 'Thank you, {name}. We’ll keep you informed.', nlJoined: 'You’re on our list ✓', nlChange: 'Update my details',
  nlPrivacy: 'Only the museum sees your details. To leave the list, reply “unsubscribe” to any message.', nlErr: 'Could not save. Please try again.',
  adList: 'Mailing list', adListHelp: 'People who asked to hear from the museum. Download the CSV for your email or WhatsApp tool.',
  adListTopics: 'Interests', adListLang: 'Language', adListRemove: 'Remove', adListRemoveT: 'Remove {name} from the list', adListConfirm: 'Remove {name} from the list?',
});
Object.assign(I18N.fr, {
  nlTitle: 'Restez informé', nlLead: 'Vernissages, la vente aux enchères et le livre Ecce Homo : nous vous écrirons quand il y aura du nouveau.',
  nlEmail: 'E-mail', nlPhone: 'WhatsApp', nlOptional: '(facultatif)', nlOneOf: 'Indiquez un e-mail ou un numéro WhatsApp.',
  nlTopics: 'Ça m’intéresse', nlEvents: 'Événements', nlAuction: 'La vente aux enchères', nlBook: 'Le livre Ecce Homo',
  nlSend: 'M’inscrire', nlThanks: 'Merci, {name}. Nous vous tiendrons informé(e).', nlJoined: 'Vous êtes sur notre liste ✓', nlChange: 'Modifier mes coordonnées',
  nlPrivacy: 'Seul le musée voit vos coordonnées. Pour quitter la liste, répondez « désinscription » à n’importe quel message.', nlErr: 'Enregistrement impossible. Réessayez.',
  adList: 'Liste de diffusion', adListHelp: 'Personnes qui souhaitent recevoir des nouvelles. Téléchargez le CSV pour votre outil d’e-mail ou WhatsApp.',
  adListTopics: 'Intérêts', adListLang: 'Langue', adListRemove: 'Retirer', adListRemoveT: 'Retirer {name} de la liste', adListConfirm: 'Retirer {name} de la liste ?',
});

const NL_TOPICS = [['events', 'nlEvents'], ['auction', 'nlAuction'], ['book', 'nlBook']];
const nlJoined = () => { try { return JSON.parse(localStorage.getItem('ma.joined') || 'null'); } catch (e) { return null; } };
let nlEditing = false;

// source: where the form is (home, event id, auction), kept with the sign-up.
function nlSection(source) {
  const me = nlJoined();
  if (me && !nlEditing) return `<section class="section nl"><h2>${t('nlTitle')}</h2>
    <p class="remind-on">${t('nlJoined')}</p><p class="muted">${esc(me.name)}${me.email ? ' · ' + esc(me.email) : ''}${me.phone ? ' · ' + esc(me.phone) : ''}</p>
    <div class="btn-row"><button class="btn small" data-action="nlChange">${t('nlChange')}</button></div></section>`;
  const p = me || { name: profile.name || '', email: profile.email || '', phone: profile.phone || '', topics: NL_TOPICS.map(x => x[0]) };
  return `<section class="section nl"><h2>${t('nlTitle')}</h2><p class="muted" style="margin-bottom:1rem">${t('nlLead')}</p>
    <form class="nl-form" data-form="newsletter" data-source="${esc(source)}" novalidate>
      <div class="field"><label for="nl-name">${t('name')}</label><input id="nl-name" required autocomplete="name" value="${esc(p.name)}"></div>
      <div class="grid two">
        <div class="field"><label for="nl-email">${t('nlEmail')} <small class="muted">${t('nlOptional')}</small></label><input id="nl-email" type="email" autocomplete="email" value="${esc(p.email || '')}"></div>
        <div class="field"><label for="nl-phone">${t('nlPhone')} <small class="muted">${t('nlOptional')}</small></label><input id="nl-phone" type="tel" autocomplete="tel" value="${esc(p.phone || '')}"></div>
      </div>
      <fieldset class="nl-topics"><legend>${t('nlTopics')}</legend>
        ${NL_TOPICS.map(([k, label]) => `<label><input type="checkbox" name="nl-topic" value="${k}"${p.topics.includes(k) ? ' checked' : ''}> ${t(label)}</label>`).join('')}</fieldset>
      <p class="status" id="nl-status" role="status" aria-live="polite" hidden></p>
      <div class="btn-row"><button class="btn primary" type="submit">${t('nlSend')}</button></div>
      <p class="muted ad-help">${t('nlPrivacy')}</p>
    </form></section>`;
}

EXTRA_FORMS.newsletter = async form => {
  const v = id => form.querySelector('#' + id).value.trim(), out = form.querySelector('#nl-status');
  const say = msg => { out.textContent = msg; out.hidden = false; };
  const name = v('nl-name'), email = v('nl-email'), phone = v('nl-phone');
  if (name.length < 2) { form.querySelector('#nl-name').focus(); return say(form.querySelector('#nl-name').validationMessage || t('nlErr')); }
  if (!email && !phone) { form.querySelector('#nl-email').focus(); return say(t('nlOneOf')); }
  if (email && !form.querySelector('#nl-email').checkValidity()) { form.querySelector('#nl-email').focus(); return say(form.querySelector('#nl-email').validationMessage); }
  const topics = [...form.querySelectorAll('[name="nl-topic"]:checked')].map(x => x.value);
  const btn = form.querySelector('button[type=submit]'); btn.disabled = true;
  try {
    const r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, topics, lang, source: form.dataset.source }) });
    if (!r.ok) throw new Error(r.status);
    try { localStorage.setItem('ma.joined', JSON.stringify({ name, email, phone, topics })); } catch (e) {}
    if (!profile.name) { profile.name = name; save(); }
    if (typeof trackEvent === 'function') trackEvent('Mailing list', { source: form.dataset.source });
    nlEditing = false;
    toast(t('nlThanks', { name: name.split(' ')[0] }));
    const y = window.scrollY; route(); window.scrollTo(0, y);
  } catch (e) { btn.disabled = false; say(t('nlErr')); }
};
EXTRA_ACTIONS.nlChange = () => { nlEditing = true; const y = window.scrollY; route(); window.scrollTo(0, y); };

{
  // Home page, each event page and the auction.
  const home = homeExtras;
  homeExtras = () => home() + nlSection('home');
  const ev = pageEvent;
  pageEvent = id => { const html = ev(id); return ANNUAL_EVENTS.some(e => e.id === id) ? html.replace(/<\/div>\s*$/, nlSection(id) + '</div>') : html; };
  EXTRA_ROUTES.evento = pageEvent;
  const auction = pageAuction;
  pageAuction = id => { const html = auction(id); return id ? html : html.replace(/<\/div>\s*$/, nlSection('auction') + '</div>'); };
  EXTRA_ROUTES.subasta = pageAuction;
}

/* ---------- Dashboard: the list ---------- */

function nlCsv() {
  const q = v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
  const rows = [['name', 'email', 'phone', 'language', 'interests', 'source', 'signed_up'], ...(adData.list || []).map(p => [p.name, p.email, p.phone, p.lang, p.topics.join(' '), p.source, p.at])];
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + rows.map(r => r.map(q).join(',')).join('\r\n')], { type: 'text/csv' }));
  a.download = `museo-abreu-list-${todayPC()}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
Object.assign(EXTRA_ACTIONS, {
  nlCsv: () => nlCsv(),
  nlRemove: async el => {
    const p = adData.list.find(x => x.id === el.dataset.id);
    if (!p || !confirm(t('adListConfirm', { name: p.name }))) return;
    const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() },
      body: JSON.stringify({ action: 'list-remove', id: p.id }) }).catch(() => null);
    if (r && r.ok) { adData.list = adData.list.filter(x => x.id !== p.id); route(); } else toast(t('adSaveErr'));
  },
});
{
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    if (!adData) return html;
    const list = adData.list || [], count = k => list.filter(p => p.topics.includes(k)).length;
    const block = `<section class="section"><div class="section-head"><h2>${t('adList')} <small class="muted">(${list.length})</small></h2>
        <button class="btn small" data-action="nlCsv">${t('adCsv')}</button></div>
      <p class="muted ad-help">${t('adListHelp')}</p>
      <p class="muted">${NL_TOPICS.map(([k, label]) => `${t(label)}: <strong>${count(k)}</strong>`).join(' · ')}</p>
      ${adTable([t('name'), t('contact'), t('adListLang'), t('adListTopics'), t('adWhen'), `<span class="visually-hidden">${t('adListRemove')}</span>`], list.map(p => [esc(p.name), adContact(p.phone, p.email),
        (p.lang || '').toUpperCase(), p.topics.map(k => t(NL_TOPICS.find(x => x[0] === k)[1])).join(', '), adStamp(p.at),
        `<button class="btn small" data-action="nlRemove" data-id="${esc(p.id)}" aria-label="${esc(t('adListRemoveT', { name: p.name }))}">${t('adListRemove')}</button>`]))}</section>`;
    const at = html.indexOf(`<section class="section"><div class="section-head"><h2>${t('adRsvps')}`);
    return at > 0 ? html.slice(0, at) + block + html.slice(at) : html.replace(/<\/div>\s*$/, block + '</div>');
  };
}
