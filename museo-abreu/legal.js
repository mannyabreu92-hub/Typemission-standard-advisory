// Privacy (#/privacidad) and Terms (#/terminos), linked from the footer. They describe only what the app
// actually does (what stays on the phone, what the museum keeps privately, who handles payments); nothing
// here promises terms the museum has not set. Spanish, English and French; other languages show English.

Object.assign(I18N.es, { footFollow: 'Síganos', footPrivacy: 'Privacidad', footTerms: 'Condiciones', legalUpdated: 'Actualizado el {date}',
  nfTitle: 'Página no encontrada', nfLead: 'Esta dirección no corresponde a ninguna página del Museo Abreu.', nfHome: 'Ir al inicio' });
Object.assign(I18N.en, { footFollow: 'Follow us', footPrivacy: 'Privacy', footTerms: 'Terms', legalUpdated: 'Updated on {date}',
  nfTitle: 'Page not found', nfLead: 'This address is not a page of Museo Abreu.', nfHome: 'Go to the home page' });
Object.assign(I18N.fr, { footFollow: 'Suivez-nous', footPrivacy: 'Confidentialité', footTerms: 'Conditions', legalUpdated: 'Mis à jour le {date}',
  nfTitle: 'Page introuvable', nfLead: 'Cette adresse ne correspond à aucune page du Museo Abreu.', nfHome: 'Aller à l’accueil' });

const LEGAL_DATE = '2026-10-24';
const LEGAL = {
  privacidad: {
    title: { es: 'Privacidad', en: 'Privacy', fr: 'Confidentialité' },
    blocks: [
      { h: { es: 'En su teléfono', en: 'On your phone', fr: 'Sur votre téléphone' },
        p: { es: 'La app no tiene cuentas ni contraseñas. Su nombre, correo y teléfono, sus reservas, entradas, libros guardados y marcadores se guardan en su propio teléfono para la próxima vez.',
          en: 'The app has no accounts or passwords. Your name, email and phone, your bookings, tickets, saved books and bookmarks are kept on your own phone for next time.',
          fr: 'L’app n’a ni comptes ni mots de passe. Votre nom, votre e-mail et votre téléphone, vos réservations, billets, livres enregistrés et signets restent sur votre propre téléphone pour la prochaine fois.' } },
      { h: { es: 'Lo que recibe el museo', en: 'What the museum receives', fr: 'Ce que reçoit le musée' },
        p: { es: 'Cuando usted lo envía, el museo guarda de forma privada sus respuestas a invitaciones, su inscripción para recibir noticias, sus mensajes del formulario de contacto y sus pujas. Solo el equipo del museo los ve, para atenderle. Puede pedir que se borren escribiendo a info@oscarabreu.com o por WhatsApp.',
          en: 'When you send them, the museum keeps privately your replies to invitations, your sign-up for news, your contact form messages and your bids. Only the museum team sees them, to look after you. You can ask for them to be deleted by writing to info@oscarabreu.com or on WhatsApp.',
          fr: 'Lorsque vous les envoyez, le musée conserve de façon privée vos réponses aux invitations, votre inscription aux nouvelles, vos messages du formulaire de contact et vos enchères. Seule l’équipe du musée les voit, pour vous répondre. Vous pouvez demander leur suppression en écrivant à info@oscarabreu.com ou sur WhatsApp.' } },
      { h: { es: 'Pagos', en: 'Payments', fr: 'Paiements' },
        p: { es: 'Los pagos se hacen en Whop. El museo nunca ve los datos de su tarjeta: Whop le comunica el correo de la compra y el producto, para desbloquear en la app lo que usted compró.',
          en: 'Payments are made on Whop. The museum never sees your card details: Whop tells it the purchase email and the product, to unlock in the app what you bought.',
          fr: 'Les paiements se font sur Whop. Le musée ne voit jamais les données de votre carte : Whop lui communique l’e-mail de l’achat et le produit, pour débloquer dans l’app ce que vous avez acheté.' } },
      { h: { es: 'Estadísticas sin cookies', en: 'Statistics without cookies', fr: 'Statistiques sans cookies' },
        p: { es: 'El museo cuenta las visitas a cada página con Vercel Web Analytics, sin cookies y sin identificarle. Las obras guardadas con el corazón y el avance de lectura se cuentan con un número al azar de su teléfono, nunca con su nombre.',
          en: 'The museum counts visits to each page with Vercel Web Analytics, without cookies and without identifying you. Works saved with the heart and reading progress are counted with a random number for your phone, never with your name.',
          fr: 'Le musée compte les visites de chaque page avec Vercel Web Analytics, sans cookies et sans vous identifier. Les œuvres enregistrées avec le cœur et la progression de lecture sont comptées avec un numéro aléatoire de votre téléphone, jamais avec votre nom.' } },
      { h: { es: 'Notificaciones', en: 'Notifications', fr: 'Notifications' },
        p: { es: 'Solo recibe avisos en el teléfono si usted los activa, y puede desactivarlos en cualquier momento desde la app o desde los ajustes del teléfono.',
          en: 'You only get notifications on your phone if you turn them on, and you can turn them off at any time in the app or in your phone’s settings.',
          fr: 'Vous ne recevez de notifications que si vous les activez, et vous pouvez les désactiver à tout moment dans l’app ou dans les réglages du téléphone.' } },
    ],
  },
  terminos: {
    title: { es: 'Condiciones', en: 'Terms', fr: 'Conditions' },
    blocks: [
      { h: { es: 'El libro digital', en: 'The digital book', fr: 'Le livre numérique' },
        p: { es: 'Cada edición digital de Ecce Homo se paga una sola vez y se lee en esta app con el correo usado en la compra. Es para su lectura personal: el texto es © 2026 Oscar Abreu y no puede copiarse ni compartirse.',
          en: 'Each digital edition of Ecce Homo is paid once and read in this app with the email used for the purchase. It is for your personal reading: the text is © 2026 Oscar Abreu and may not be copied or shared.',
          fr: 'Chaque édition numérique d’Ecce Homo se paie une seule fois et se lit dans cette app avec l’e-mail utilisé lors de l’achat. Elle est destinée à votre lecture personnelle : le texte est © 2026 Oscar Abreu et ne peut être ni copié ni partagé.' } },
      { h: { es: 'Pagos y precios', en: 'Payments and prices', fr: 'Paiements et prix' },
        p: { es: 'Los precios están en dólares estadounidenses. Los pagos los procesa Whop según sus propias condiciones.',
          en: 'Prices are in US dollars. Payments are processed by Whop under its own terms.',
          fr: 'Les prix sont en dollars américains. Les paiements sont traités par Whop selon ses propres conditions.' } },
      { h: { es: 'Entradas y reservas', en: 'Tickets and bookings', fr: 'Billets et réservations' },
        p: { es: 'Cada entrada tiene su propio código QR, válido para las personas que indica y para una sola entrada.',
          en: 'Each ticket has its own QR code, valid for the people it shows and for a single entry.',
          fr: 'Chaque billet a son propre QR code, valable pour les personnes indiquées et pour une seule entrée.' } },
      { h: { es: 'Obras e imágenes', en: 'Works and images', fr: 'Œuvres et images' },
        p: { es: 'Las obras y sus imágenes son © Oscar Abreu. La prensa puede publicar las imágenes del dossier de prensa citando a Oscar Abreu y el título de la obra.',
          en: 'The works and their images are © Oscar Abreu. The press may publish the images of the press kit, crediting Oscar Abreu and the title of the work.',
          fr: 'Les œuvres et leurs images sont © Oscar Abreu. La presse peut publier les images du dossier de presse en citant Oscar Abreu et le titre de l’œuvre.' } },
      { h: { es: 'Contacto', en: 'Contact', fr: 'Contact' },
        p: { es: 'Para cualquier pregunta: info@oscarabreu.com o WhatsApp +1 (809) 840-9588.',
          en: 'For any question: info@oscarabreu.com or WhatsApp +1 (809) 840-9588.',
          fr: 'Pour toute question : info@oscarabreu.com ou WhatsApp +1 (809) 840-9588.' } },
    ],
  },
};

function pageLegal(key) {
  const d = LEGAL[key];
  return `<div class="wrap"><section class="section manifesto legal">
    <p class="eyebrow">Museo Abreu</p><h1>${L(d.title)}</h1>
    <p class="muted" style="margin:.4rem 0 1.2rem">${t('legalUpdated', { date: fmtDate(LEGAL_DATE) })}</p>
    ${d.blocks.map(b => `<h2 class="m-h">${esc(L(b.h))}</h2><p>${esc(L(b.p))}</p>`).join('')}
    <div class="btn-row"><a class="btn" href="#/${key === 'privacidad' ? 'terminos' : 'privacidad'}">${t(key === 'privacidad' ? 'footTerms' : 'footPrivacy')}</a><a class="btn" href="#/contacto">${t('navContact')}</a></div>
  </section></div>`;
}
Object.assign(EXTRA_ROUTES, { privacidad: () => pageLegal('privacidad'), terminos: () => pageLegal('terminos') });
