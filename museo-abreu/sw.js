// Offline shell: the app opens without a connection (e.g. to show a ticket QR).
const CACHE = 'museo-abreu-v74';
const SHELL = ['./', 'index.html', 'styles.css', 'i18n.js', 'sample-en.js', 'sample-es.js', 'sample-fr.js', 'sample-de.js', 'sample-ru.js', 'data.js', 'manifestos.js', 'manifestos-text.js', 'booking-config.js', 'features.js', 'gabangi.js', 'content.js', 'rsvp.js', 'checkout.js', 'auction-config.js', 'market.js', 'events-page.js', 'admin.js', 'story.js', 'aftercare.js', 'insights.js', 'remind.js', 'wishlist.js', 'alerts.js', 'newsletter.js', 'scanner.js', 'kit.js', 'fullbook.js', 'app.js', 'icon.svg', 'manifest.webmanifest',
  'qrcode.js', 'img/escaping-being.jpg', 'img/passion.jpg', 'img/petrichor.jpg', 'img/resilience.jpg', 'img/limerence.jpg', 'img/echoes-of-memory.jpg',
  'img/time-on-my-face.jpg',
  'img/escaping-being-800.jpg', 'img/icon-180.png', 'img/icon-192.png', 'img/icon-512.png', 'img/icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network first, falling back to cache, so content updates show up when online.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok && (e.request.url.startsWith(self.location.origin) || e.request.url.includes('cdnjs'))) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});

// Event reminders (remind.js, api/push.js): show the notification; a tap opens the event in the app.
self.addEventListener('push', e => {
  let m = {};
  try { m = e.data.json(); } catch (err) { m = { title: 'Museo Abreu', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(m.title || 'Museo Abreu', {
    body: m.body || '', icon: 'img/icon-192.png', badge: 'img/icon-192.png', data: { url: m.url || '/' } }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL(e.notification.data && e.notification.data.url || '/', self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const open = list.find(c => c.url.startsWith(self.location.origin));
    if (open) return open.focus().then(c => c.navigate(url).catch(() => c));
    return self.clients.openWindow(url);
  }));
});
