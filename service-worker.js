const cacheName = 'site-static-v1.5';
const assets = [
    '/',
    '/pesquisav1/index.html',
    '/pesquisav1/styles.css',
    '/pesquisav1/script.js',
    '/pesquisav1/manifest.json',
    '/pesquisav1/images/icon-192x192.png',
    '/pesquisav1/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});