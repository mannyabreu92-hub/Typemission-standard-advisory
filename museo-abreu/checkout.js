// One checkout sheet for everything a visitor can pay for: tickets, clubs, Pro, the book, sponsorships.
// With a payment link (Whop or Bókun, booking-config.js) the main button goes straight to card payment;
// without one, the order is sent to the museum's WhatsApp already written, with quantity and total.
Object.assign(I18N.es, {
  coTitle: 'Tu pedido', coQty: 'Cantidad', coTotal: 'Total', coPayCard: 'Pagar {amount} con tarjeta',
  coSecure: 'Pago seguro en {provider}.', coOrWa: '¿Prefiere coordinar el pago con el museo por WhatsApp?',
  coWaBtn: 'Confirmar por WhatsApp · {amount}', coWaNote: 'Su pedido llega ya escrito. El museo lo confirma y coordina el pago con usted.',
  coRemember: 'Se guarda en este dispositivo para la próxima vez.', coPriceTbd: 'Precio confirmado por el museo',
  coLess: 'Uno menos', coMore: 'Uno más',
  coWaOrder: 'Hola, quiero comprar:\n{qty} × {item}{when}\nTotal: {total}\nNombre: {name}\nTeléfono: {phone}',
});
Object.assign(I18N.en, {
  coTitle: 'Your order', coQty: 'Quantity', coTotal: 'Total', coPayCard: 'Pay {amount} by card',
  coSecure: 'Secure payment on {provider}.', coOrWa: 'Prefer to arrange payment with the museum on WhatsApp?',
  coWaBtn: 'Confirm on WhatsApp · {amount}', coWaNote: 'Your order arrives already written. The museum confirms it and arranges payment with you.',
  coRemember: 'Saved on this device for next time.', coPriceTbd: 'Price confirmed by the museum',
  coLess: 'One fewer', coMore: 'One more',
  coWaOrder: 'Hello, I would like to buy:\n{qty} × {item}{when}\nTotal: {total}\nName: {name}\nPhone: {phone}',
});
Object.assign(I18N.fr, {
  coTitle: 'Votre commande', coQty: 'Quantité', coTotal: 'Total', coPayCard: 'Payer {amount} par carte',
  coSecure: 'Paiement sécurisé sur {provider}.', coOrWa: 'Vous préférez régler avec le musée sur WhatsApp ?',
  coWaBtn: 'Confirmer sur WhatsApp · {amount}', coWaNote: 'Votre commande arrive déjà rédigée. Le musée la confirme et organise le paiement avec vous.',
  coRemember: 'Enregistré sur cet appareil pour la prochaine fois.', coPriceTbd: 'Prix confirmé par le musée',
  coLess: 'Un de moins', coMore: 'Un de plus',
  coWaOrder: 'Bonjour, je souhaite acheter :\n{qty} × {item}{when}\nTotal : {total}\nNom : {name}\nTéléphone : {phone}',
});

// o: { title, sub?, when?, img?, price (number or null), period? ('month'), qty? (true = quantity selector),
//      link? (card checkout URL), provider? ('Whop' | 'Bókun') }
function checkout(o) {
  // A card checkout (Bókun, Whop) asks for the quantity itself.
  if (o.link) o.qty = false;
  let qty = 1;
  const amount = () => o.price == null ? t('coPriceTbd') : 'USD ' + money(o.price * qty) + (o.period ? ' ' + t('perMonth') : '');
  const dlg = document.createElement('dialog');
  dlg.className = 'co-sheet';
  dlg.setAttribute('aria-labelledby', 'co-title');
  dlg.innerHTML = `<div class="dlg-body">
    <p class="eyebrow">${t('coTitle')}</p>
    <div class="co-item">${o.img ? `<img src="${o.img}" alt="" width="72" height="72">` : ''}
      <div><h3 id="co-title">${esc(o.title)}</h3>${o.sub ? `<p class="muted">${esc(o.sub)}</p>` : ''}${o.when ? `<p class="muted">${esc(o.when)}</p>` : ''}</div></div>
    ${o.qty ? `<div class="co-row"><span id="co-qty-l">${t('coQty')}</span>
      <div class="co-stepper" role="group" aria-labelledby="co-qty-l">
        <button type="button" class="co-step" data-d="-1" aria-label="${t('coLess')}">−</button>
        <output id="co-qty" aria-live="polite">1</output>
        <button type="button" class="co-step" data-d="1" aria-label="${t('coMore')}">+</button></div></div>` : ''}
    <div class="co-row co-total"><span>${t('coTotal')}</span><strong id="co-amount">${amount()}</strong></div>
    ${o.link ? `<button type="button" class="btn primary co-pay" id="co-card">${t('coPayCard', { amount: '<span class="co-amt">' + amount() + '</span>' })}</button>
      <p class="muted co-secure">🔒 ${t('coSecure', { provider: o.provider })}</p>
      <details class="co-wa-alt"><summary>${t('coOrWa')}</summary>${waBlock()}</details>`
    : waBlock()}
    <button type="button" class="btn co-close" value="cancel">${t('close')}</button>
  </div>`;
  function waBlock() {
    return `<div class="co-wa">
      <div class="field"><label for="co-name">${t('name')}</label><input id="co-name" autocomplete="name" value="${esc(profile.name || '')}"></div>
      <div class="field"><label for="co-phone">${t('phone')}</label><input id="co-phone" type="tel" autocomplete="tel" value="${esc(profile.phone || '')}"></div>
      <p class="muted co-note">${t('coRemember')}</p>
      <button type="button" class="btn primary co-pay" id="co-wa">${o.price == null ? t('coWaBtn').split(' · ')[0] : t('coWaBtn', { amount: '<span class="co-amt">' + amount() + '</span>' })}</button>
      <p class="muted co-note">${t('coWaNote')}</p></div>`;
  }
  const refresh = () => {
    $('#co-amount', dlg).textContent = amount();
    dlg.querySelectorAll('.co-amt').forEach(s => { s.textContent = amount(); });
    if (o.qty) $('#co-qty', dlg).textContent = qty;
  };
  dlg.addEventListener('click', e => {
    const step = e.target.closest('.co-step');
    if (step) { qty = Math.min(10, Math.max(1, qty + Number(step.dataset.d))); return refresh(); }
    if (e.target.closest('.co-close') || e.target === dlg) return dlg.close();
    if (e.target.closest('#co-card')) { dlg.close(); return openCheckout(o.link); }
    if (e.target.closest('#co-wa')) {
      profile.name = $('#co-name', dlg).value.trim();
      profile.phone = $('#co-phone', dlg).value.trim();
      save();
      dlg.close();
      openWhatsApp(t('coWaOrder', { qty, item: o.title + (o.sub ? ' · ' + o.sub : ''), when: o.when ? ' — ' + o.when : '',
        total: amount(), name: profile.name || '—', phone: profile.phone || '—' }));
    }
  });
  dlg.addEventListener('close', () => dlg.remove());
  document.body.appendChild(dlg);
  dlg.showModal();
}

/* ---------- Thank-you page after paying on Whop (#/gracias/<key>) ----------
   Each Whop product's "redirect after purchase" points to https://museo-abreu.vercel.app/?gracias=<key>
   (the key used in BOOKING.whop). The query form survives redirects that drop the #fragment. */
Object.assign(I18N.es, {
  tyTitle: 'Gracias', tyLead: 'Su compra está completa. El recibo de Whop llega a su correo.',
  tyClub: 'Bienvenido al {name}. El museo le escribirá con el calendario.',
  tyBook: 'El museo enviará su acceso al libro al correo que usó en la compra.',
  tyTicket: 'Su entrada: {name}. Lleve el recibo y el nombre de la compra a la entrada.',
  tyPro: 'Bienvenido a Museo Abreu Pro. El museo activará sus beneficios de miembro.',
  tySponsor: 'Su aporte patrocina una clase de pintura para un estudiante que no puede pagarla.',
  tyQuestions: '¿Preguntas? Escriba al museo por WhatsApp.', tyWa: 'Escribir al museo', tyHome: 'Volver al inicio',
  waAfterPurchase: 'Hola, acabo de completar una compra: {item}.',
});
Object.assign(I18N.en, {
  tyTitle: 'Thank you', tyLead: 'Your purchase is complete. Your receipt from Whop is on its way to your email.',
  tyClub: 'Welcome to the {name}. The museum will contact you with the schedule.',
  tyBook: 'The museum will send your access to the book to the email you used for the purchase.',
  tyTicket: 'Your ticket: {name}. Bring your receipt and the name on the purchase to the entrance.',
  tyPro: 'Welcome to Museo Abreu Pro. The museum will activate your member benefits.',
  tySponsor: 'Your contribution sponsors a painting class for a student who cannot afford it.',
  tyQuestions: 'Questions? Write to the museum on WhatsApp.', tyWa: 'Message the museum', tyHome: 'Back to home',
  waAfterPurchase: 'Hello, I just completed a purchase: {item}.',
});
Object.assign(I18N.fr, {
  tyTitle: 'Merci', tyLead: 'Votre achat est terminé. Le reçu de Whop arrive dans votre boîte mail.',
  tyClub: 'Bienvenue au {name}. Le musée vous écrira avec le calendrier.',
  tyBook: 'Le musée enverra votre accès au livre à l’adresse e-mail utilisée pour l’achat.',
  tyTicket: 'Votre billet : {name}. Présentez le reçu et le nom de l’achat à l’entrée.',
  tyPro: 'Bienvenue dans Museo Abreu Pro. Le musée activera vos avantages de membre.',
  tySponsor: 'Votre contribution offre un cours de peinture à un élève qui n’a pas les moyens de le payer.',
  tyQuestions: 'Des questions ? Écrivez au musée sur WhatsApp.', tyWa: 'Écrire au musée', tyHome: 'Retour à l’accueil',
  waAfterPurchase: 'Bonjour, je viens de finaliser un achat : {item}.',
});

function purchaseInfo(key) {
  const club = CLUBS.find(c => c.id === key);
  if (club) return { item: L(club.name), text: t('tyClub', { name: L(club.name) }) };
  if (key.startsWith('book-') && LANG_NAMES[key.slice(5)]) return { item: 'Ecce Homo · ' + L(LANG_NAMES[key.slice(5)]), text: t('tyBook') };
  const gb = EVENTS.find(e => e.id === 'art-gabangi'), tier = key.startsWith('gabangi-') && gb.tiers.find(x => x.id === key.slice(8));
  if (tier) return { item: L(tier.name) + ' · ' + eventTitle(gb), text: t('tyTicket', { name: L(tier.name) + ' · ' + eventTitle(gb) }) };
  if (key === 'pro') return { item: 'Museo Abreu Pro', text: t('tyPro') };
  if (key.startsWith('sponsor-')) return { item: t('sponsorTitle') + ' · USD ' + key.slice(8), text: t('tySponsor') };
  return { item: '', text: '' };
}

function pageThanks(key = '') {
  const p = purchaseInfo(key);
  const wa = whatsappLink(t('waAfterPurchase', { item: p.item || 'Museo Abreu' }));
  return `<div class="wrap"><section class="section thanks">
    <p class="eyebrow">Museo Abreu</p>
    <h1>${t('tyTitle')}</h1>
    ${p.item ? `<p class="thanks-item">${esc(p.item)}</p>` : ''}
    <p class="lead">${t('tyLead')}</p>
    ${p.text ? `<p>${esc(p.text)}</p>` : ''}
    <p class="muted">${t('tyQuestions')}</p>
    <div class="btn-row">${wa ? `<a class="btn wa" href="${wa}" target="_blank" rel="noopener">${t('tyWa')}</a>` : ''}<a class="btn primary" href="#/">${t('tyHome')}</a></div>
  </section></div>`;
}

Object.assign(EXTRA_ROUTES, { gracias: pageThanks });
(() => {
  const key = new URLSearchParams(location.search).get('gracias');
  if (key == null) return;
  history.replaceState(null, '', location.pathname + '#/gracias/' + encodeURIComponent(key));
  // trackEvent is defined in app.js, which loads after this file.
  setTimeout(() => { if (typeof trackEvent === 'function') trackEvent('Purchase', { product: key }); }, 0);
})();

/* ---------- Unlock Whop purchases in this app ----------
   Whop tells the server (api/whop-webhook.js) about each payment; here the buyer enters the email
   used on Whop and the app turns on what that email owns: book editions, Pro, clubs. */
Object.assign(I18N.es, {
  unTitle: 'Activar en esta app', unLead: 'Escriba el correo que usó para pagar en Whop.', unBtn: 'Activar',
  unDone: 'Activado: {items}.', unNone: 'Aún no encontramos una compra con este correo. Si acaba de pagar, espere un minuto e inténtelo de nuevo.',
  unError: 'No se pudo comprobar ahora. Inténtelo de nuevo.', unAccountTitle: 'Compras hechas en Whop',
});
Object.assign(I18N.en, {
  unTitle: 'Unlock in this app', unLead: 'Enter the email you used to pay on Whop.', unBtn: 'Unlock',
  unDone: 'Unlocked: {items}.', unNone: 'We can’t find a purchase for this email yet. If you just paid, wait a minute and try again.',
  unError: 'Could not check right now. Please try again.', unAccountTitle: 'Purchases made on Whop',
});
Object.assign(I18N.fr, {
  unTitle: 'Activer dans cette app', unLead: 'Saisissez l’e-mail utilisé pour payer sur Whop.', unBtn: 'Activer',
  unDone: 'Activé : {items}.', unNone: 'Nous ne trouvons pas encore d’achat pour cet e-mail. Si vous venez de payer, patientez une minute et réessayez.',
  unError: 'Vérification impossible pour le moment. Réessayez.', unAccountTitle: 'Achats effectués sur Whop',
});

function unlockForm(id) {
  return `<form class="unlock" data-form="unlock" novalidate>
    <label for="un-${id}">${t('unLead')}</label>
    <div class="unlock-row"><input id="un-${id}" type="email" required autocomplete="email" value="${esc(profile.email || '')}">
      <button class="btn primary" type="submit">${t('unBtn')}</button></div>
    <p class="status" role="status" aria-live="polite" hidden></p>
  </form>`;
}

// Turns on in this app what the server says the email owns.
function applyPurchases(keys, email) {
  const names = [];
  for (const key of keys) {
    const l = key.startsWith('book-') && key.slice(5);
    if (l && LANG_NAMES[l]) {
      if (!owns(l)) purchases.push({ lang: l, price: EDITIONS.find(e => e.lang === l)?.price || 0, source: 'whop', date: new Date().toISOString() });
      names.push('Ecce Homo · ' + L(LANG_NAMES[l]));
    } else if (key === 'pro') {
      if (!isPro()) fx.set('member', { id: proCode(), name: profile.name.trim() || email, since: new Date().toISOString(), source: 'whop' });
      names.push('Museo Abreu Pro');
    } else if (CLUBS.some(c => c.id === key)) {
      const clubs = fx.get('clubs', []);
      if (!clubs.includes(key)) fx.set('clubs', [...clubs, key]);
      names.push(L(CLUBS.find(c => c.id === key).name));
    }
  }
  profile.email = email;
  save();
  return names;
}

EXTRA_FORMS.unlock = async form => {
  const input = form.querySelector('input'), out = form.querySelector('.status'), btn = form.querySelector('button');
  const say = (msg, ok) => { out.textContent = msg; out.hidden = false; out.classList.toggle('ok', !!ok); };
  if (!input.checkValidity()) { input.focus(); return say(input.validationMessage); }
  btn.disabled = true;
  try {
    const r = await fetch('/api/purchases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: input.value.trim() }) });
    if (!r.ok) throw new Error(r.status);
    const { keys } = await r.json();
    const names = applyPurchases(keys || [], input.value.trim());
    say(names.length ? t('unDone', { items: names.join(' · ') }) : t('unNone'), names.length);
  } catch (e) { say(t('unError')); }
  btn.disabled = false;
};

// The unlock form appears on the thank-you page and in Account.
{
  const thanks = pageThanks;
  pageThanks = key => thanks(key).replace('</section></div>', `<div class="unlock-box"><h2 class="h3">${t('unTitle')}</h2>${unlockForm('ty')}</div></section></div>`);
  EXTRA_ROUTES.gracias = pageThanks;
  const acc = accountExtras;
  accountExtras = () => acc() + `<section class="section"><h2>${t('unAccountTitle')}</h2>${unlockForm('acc')}</section>`;
}
