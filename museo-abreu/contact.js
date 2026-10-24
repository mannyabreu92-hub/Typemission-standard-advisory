// Contact form on the Contact page (#/contacto): name, email and/or WhatsApp, a subject (general, visit,
// press, collecting) and the message. Messages are kept privately (api/contact.js) and listed in the
// dashboard, newest first, with a reply by email or WhatsApp. A press email shows when VISIT_INFO has one.

Object.assign(I18N.es, {
  cfTitle: 'Escríbanos', cfLead: 'Responderemos por correo o por WhatsApp.', cfTopic: 'Asunto', cfMessage: 'Mensaje',
  cfGeneral: 'Consulta general', cfVisit: 'Visita y VIP Tour', cfPress: 'Prensa', cfCollect: 'Coleccionismo y obras',
  cfSend: 'Enviar mensaje', cfThanks: 'Gracias, {name}. Hemos recibido su mensaje.', cfErr: 'No se pudo enviar. Inténtelo de nuevo o escríbanos por WhatsApp.',
  cfShort: 'Escriba su mensaje.', cfPrivacy: 'Sus datos solo los ve el equipo del museo, para responderle.', cfPressEmail: 'Prensa',
  adMsgs: 'Mensajes', adMsgsHelp: 'Mensajes del formulario de contacto, del más reciente al más antiguo.', adMsgReply: 'Responder', adMsgDone: 'Archivar',
  adMsgDoneT: 'Archivar el mensaje de {name}', adMsgConfirm: '¿Archivar el mensaje de {name}? Dejará de aparecer aquí.',
});
Object.assign(I18N.en, {
  cfTitle: 'Write to us', cfLead: 'We will reply by email or WhatsApp.', cfTopic: 'Subject', cfMessage: 'Message',
  cfGeneral: 'General enquiry', cfVisit: 'Visit & VIP Tour', cfPress: 'Press', cfCollect: 'Collecting and works',
  cfSend: 'Send message', cfThanks: 'Thank you, {name}. We have received your message.', cfErr: 'Could not send. Please try again or write to us on WhatsApp.',
  cfShort: 'Please write your message.', cfPrivacy: 'Only the museum team sees your details, to reply to you.', cfPressEmail: 'Press',
  adMsgs: 'Messages', adMsgsHelp: 'Messages from the contact form, newest first.', adMsgReply: 'Reply', adMsgDone: 'Archive',
  adMsgDoneT: 'Archive the message from {name}', adMsgConfirm: 'Archive the message from {name}? It will no longer appear here.',
});
Object.assign(I18N.fr, {
  cfTitle: 'Écrivez-nous', cfLead: 'Nous vous répondrons par e-mail ou WhatsApp.', cfTopic: 'Objet', cfMessage: 'Message',
  cfGeneral: 'Demande générale', cfVisit: 'Visite et VIP Tour', cfPress: 'Presse', cfCollect: 'Collection et œuvres',
  cfSend: 'Envoyer le message', cfThanks: 'Merci, {name}. Nous avons bien reçu votre message.', cfErr: 'Envoi impossible. Réessayez ou écrivez-nous sur WhatsApp.',
  cfShort: 'Écrivez votre message.', cfPrivacy: 'Seule l’équipe du musée voit vos informations, pour vous répondre.', cfPressEmail: 'Presse',
  adMsgs: 'Messages', adMsgsHelp: 'Messages du formulaire de contact, du plus récent au plus ancien.', adMsgReply: 'Répondre', adMsgDone: 'Archiver',
  adMsgDoneT: 'Archiver le message de {name}', adMsgConfirm: 'Archiver le message de {name} ? Il n’apparaîtra plus ici.',
});

const CF_TOPICS = [['general', 'cfGeneral'], ['visit', 'cfVisit'], ['press', 'cfPress'], ['collect', 'cfCollect']];

function cfSection() {
  const p = profile || {};
  return `<section class="section cf"><h2>${t('cfTitle')}</h2><p class="muted" style="margin-bottom:1rem">${t('cfLead')}</p>
    <form class="nl-form" data-form="contact" novalidate>
      <div class="field"><label for="cf-name">${t('name')}</label><input id="cf-name" required autocomplete="name" value="${esc(p.name || '')}"></div>
      <div class="grid two">
        <div class="field"><label for="cf-email">${t('nlEmail')} <small class="muted">${t('nlOptional')}</small></label><input id="cf-email" type="email" autocomplete="email" value="${esc(p.email || '')}"></div>
        <div class="field"><label for="cf-phone">${t('nlPhone')} <small class="muted">${t('nlOptional')}</small></label><input id="cf-phone" type="tel" autocomplete="tel" value="${esc(p.phone || '')}"></div>
      </div>
      <div class="field"><label for="cf-topic">${t('cfTopic')}</label><select id="cf-topic">${CF_TOPICS.map(([k, label]) => `<option value="${k}">${t(label)}</option>`).join('')}</select></div>
      <div class="field"><label for="cf-msg">${t('cfMessage')}</label><textarea id="cf-msg" rows="5" maxlength="3000" required></textarea></div>
      <div class="visually-hidden" aria-hidden="true"><label for="cf-web">Website</label><input id="cf-web" tabindex="-1" autocomplete="off"></div>
      <p class="status" id="cf-status" role="status" aria-live="polite" hidden></p>
      <div class="btn-row"><button class="btn primary" type="submit">${t('cfSend')}</button></div>
      <p class="muted ad-help">${t('cfPrivacy')}</p>
    </form></section>`;
}

EXTRA_FORMS.contact = async form => {
  const f = id => form.querySelector('#' + id), out = f('cf-status');
  const say = msg => { out.textContent = msg; out.hidden = false; };
  const name = f('cf-name').value.trim(), email = f('cf-email').value.trim(), phone = f('cf-phone').value.trim(), message = f('cf-msg').value.trim();
  if (name.length < 2) { f('cf-name').focus(); return say(f('cf-name').validationMessage || t('nlErr')); }
  if (!email && !phone) { f('cf-email').focus(); return say(t('nlOneOf')); }
  if (email && !f('cf-email').checkValidity()) { f('cf-email').focus(); return say(f('cf-email').validationMessage); }
  if (message.length < 5) { f('cf-msg').focus(); return say(t('cfShort')); }
  const btn = form.querySelector('button[type=submit]'); btn.disabled = true;
  try {
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, topic: f('cf-topic').value, message, lang, website: f('cf-web').value }) });
    if (!r.ok) throw new Error(r.status);
    if (typeof trackEvent === 'function') trackEvent('Contact form', { topic: f('cf-topic').value });
    form.outerHTML = `<p class="remind-on" role="status">${esc(t('cfThanks', { name: name.split(' ')[0] }))}</p>`;
  } catch (e) { btn.disabled = false; say(t('cfErr')); }
};

{
  // The form under the contact details; a press email line when the museum has one.
  const contact = pageContact;
  pageContact = () => {
    let html = contact();
    const press = visitInfo('pressEmail');
    if (press) html = html.replace('</ul>', `<li><span class="muted">${t('cfPressEmail')}</span><a href="mailto:${esc(press)}">${esc(press)}</a></li></ul>`);
    return html.replace(/<\/div>\s*$/, cfSection() + '</div>');
  };
  EXTRA_ROUTES.contacto = pageContact;
}

/* ---------- Dashboard: messages ---------- */

Object.assign(EXTRA_ACTIONS, {
  cfDone: async el => {
    const m = (adData.messages || []).find(x => x.id === el.dataset.id);
    if (!m || !confirm(t('adMsgConfirm', { name: m.name }))) return;
    const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() },
      body: JSON.stringify({ action: 'msg-remove', id: m.id }) }).catch(() => null);
    if (r && r.ok) { adData.messages = adData.messages.filter(x => x.id !== m.id); route(); } else toast(t('adSaveErr'));
  },
});
{
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    if (!adData) return html;
    const msgs = (adData.messages || []).slice().sort((a, b) => String(b.at).localeCompare(String(a.at)));
    const topic = k => t((CF_TOPICS.find(x => x[0] === k) || CF_TOPICS[0])[1]);
    const reply = m => m.email ? `mailto:${encodeURI(m.email)}?subject=${encodeURIComponent('Museo Abreu · ' + topic(m.topic))}` : whatsappLinkTo(m.phone);
    const block = `<section class="section"><h2>${t('adMsgs')} <small class="muted">(${msgs.length})</small></h2>
      <p class="muted ad-help">${t('adMsgsHelp')}</p>
      ${msgs.map(m => `<article class="card ad-msg"><p><strong>${esc(m.name)}</strong> · ${esc(topic(m.topic))} · <span class="muted">${adStamp(m.at)} · ${esc((m.lang || '').toUpperCase())}</span></p>
        <p class="muted">${adContact(m.phone, m.email)}</p><p class="ad-msg-text">${esc(m.message)}</p>
        <div class="btn-row">${reply(m) ? `<a class="btn small primary" href="${reply(m)}" target="_blank" rel="noopener">${t('adMsgReply')}</a>` : ''}
          <button class="btn small" data-action="cfDone" data-id="${esc(m.id)}" aria-label="${esc(t('adMsgDoneT', { name: m.name }))}">${t('adMsgDone')}</button></div></article>`).join('')}</section>`;
    const at = html.indexOf(`<section class="section"><div class="section-head"><h2>${t('adList')}`);
    return at > 0 ? html.slice(0, at) + block + html.slice(at) : html.replace(/<\/div>\s*$/, block + '</div>');
  };
}
// WhatsApp link to a visitor's number (digits only).
const whatsappLinkTo = phone => { const d = String(phone || '').replace(/\D/g, ''); return d.length >= 7 ? 'https://wa.me/' + d : ''; };
