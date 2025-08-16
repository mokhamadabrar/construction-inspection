self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('mhc-v1').then(c => c.addAll([
      './',
      './index.html',
      './manifest.webmanifest'
    ]))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request, {ignoreSearch:true}).then(r => r || fetch(e.request))
  );
});
