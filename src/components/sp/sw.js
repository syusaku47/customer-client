// Cache name
const CACHE_NAME = 'pwa-sample-caches-v1';
// Cache targets
const urlsToCache = [
  '/',
  '/index.html',
];

/* eslint-disable */

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => (response || fetch(event.request))),
  );
});
