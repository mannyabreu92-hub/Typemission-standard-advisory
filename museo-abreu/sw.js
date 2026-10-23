// Offline shell: the app opens without a connection (e.g. to show a ticket QR).
const CACHE = 'museo-abreu-v33';
const SHELL = ['./', 'index.html', 'styles.css', 'i18n.js', 'sample-en.js', 'sample-es.js', 'data.js', 'manifestos.js', 'manifestos-text.js', 'booking-config.js', 'features.js', 'gabangi.js', 'content.js', 'rsvp.js', 'app.js', 'icon.svg', 'manifest.webmanifest',
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
