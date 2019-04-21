// Cache necessary files.
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('kb-v1').then(function (cache) {
            return cache.addAll([
                'index.html',
                'modern-normalize.min.css',
                'icons-512.png',
                'style.css',
                'main.js'
            ]);
        })
    );
});

// Intercept fetch and check the cache before fetching.
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
