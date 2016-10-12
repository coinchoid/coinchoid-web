
var current_version = 'coinchoid-v2';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(current_version).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/vendor.css',
        '/css/app.css',
        '/images/icons/mdi.light.svg',
        '/images/icons/icon.svg',
        '/images/icons/icon-256x256.png',
        '/images/icons/icon-192x192.png',
        '/images/icons/icon-152x152.png',
        '/images/icons/icon-128x128.png',
        '/images/icons/icon-144x144.png',
        '/js/templates.js',
        '/js/app.js',
        '/js/vendor.js'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = [current_version];

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(keyList[key]);
                }
            }));
        })
    );
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
