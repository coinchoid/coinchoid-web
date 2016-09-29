
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('coinchoid').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css',
        '/css/vendor.css',
        '/css/app.css',
        '/images',
        '/images/icons',
        '/images/icons/icon-256x256.png',
        '/images/icons/icon-192x192.png',
        '/images/icons/icon-152x152.png',
        '/images/icons/icon.svg',
        '/images/icons/icon-128x128.png',
        '/images/icons/icon-144x144.png',
        '/js/templates.js',
        '/js/vendor.js'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
