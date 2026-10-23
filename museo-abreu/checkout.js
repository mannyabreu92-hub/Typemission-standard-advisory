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
  const amount = () => o.price == null ? t('coPriceTbd') : 'USD ' + (o.price * qty).toLocaleString('en-US') + (o.period ? ' ' + t('perMonth') : '');
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
