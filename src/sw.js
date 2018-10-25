const STATIC = "static-1.0.0";
const IMAGE = "image-1.0.0";
const VERSIONS = [STATIC, IMAGE];

self.addEventListener('install', event => {
    const urlsToCache = [
        '/',
        '/index.html',
        '/js/3rdparty/webcomponents-loader.js',
        '/js/3rdparty/bundles/webcomponents-ce.js',
        '/js/3rdparty/bundles/webcomponents-sd-ce-pf.js',
        '/js/3rdparty/bundles/webcomponents-sd-ce.js',
        '/js/3rdparty/bundles/webcomponents-sd.js',
        '/css/main.css',
        '/js/main.js'
    ];

    event.waitUntil(caches.open(STATIC).then(cache => {
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => !VERSIONS.includes(cacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    if(requestUrl.hostname === "i.kinja-img.com") {
        event.respondWith(servePhoto(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(res => res || fetch(event.request))
    );
});

async function servePhoto(request) {
    const cache = await caches.open(IMAGE);
    const res = await cache.match(request.url);
    if (res) {
        return res;
    }
    const networkRes = await fetch(request);
    cache.put(request.url, networkRes.clone());
    return networkRes;
}