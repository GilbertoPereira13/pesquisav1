const cacheName = 'site-static-v1.6';
const assets = [
    '/pesquisav1/',
    '/pesquisav1/index.html',
    '/pesquisav1/styles.css',
    '/pesquisav1/script.js',
    '/pesquisav1/manifest.json',
    '/pesquisav1/images/icon-192x192.png',
    '/pesquisav1/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

// Cache on install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(assets);
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});