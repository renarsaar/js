const cacheName = 'v2';

const cahceAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
];

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker Caching Files');
        cache.addAll(cahceAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker Activated');

  // Remove old caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Call fetch event
self.addEventListener('fetch', (e) => {
  console.log('Offline, Service Worker Fetching');

  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  );
});
