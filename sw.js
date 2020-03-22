const cacheName = 'kb-v1.1.3';

// Cache necessary files.
self.addEventListener('install', function (event) {
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
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

// Clear out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Intercept fetch and check the cache before fetching, otherwise fetch and cache it.
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + event.request.url);
            return r || fetch(event.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + event.request.url);
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
