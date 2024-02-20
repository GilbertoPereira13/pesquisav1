const cacheName = 'v1.1';
const resourcesToPreload = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  'images/icon-192x192.png',
  'images/icon-512x512.png'
  // Adicione outros recursos que você queira armazenar em cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(resourcesToPreload))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
          return cachedResponse || fetch(event.request);
      })
  );
});