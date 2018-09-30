const VERSION = "v1.0.0"

self.addEventListener('install', event => {
    const urlsToCache = [
        '/',
        '/index.html',
        '/js/3rdparty/webcomponents-loader.js',
        '/js/3rdparty/polyfill.js',
        '/js/3rdparty/bundles/webcomponents-ce.js',
        '/js/3rdparty/bundles/webcomponents-sd-ce-pf.js',
        '/js/3rdparty/bundles/webcomponents-sd-ce.js',
        '/js/3rdparty/bundles/webcomponents-sd.js',
        '/css/main.css',
        '/js/main.js',
        '/js/main.es5.js'
    ];

    event.waitUntil(caches.open(VERSION).then(cache => {
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(res => res || fetch(event.request))
    );
});