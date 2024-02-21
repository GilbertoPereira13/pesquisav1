const cacheName = 'site-static-v1.3';
const assets = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    'manifest.json',
    '/pesquisav1/images/icon-192x192.png',
    '/pesquisav1/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assets).catch(error => console.log('Falha ao cache assets:', error));
        })
    );
});