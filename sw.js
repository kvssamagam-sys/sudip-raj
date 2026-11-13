/**
 * ============================================================================
 * SERVICE WORKER (sw.js) - 100% OFFLINE CAPABILITY
 * ============================================================================
 * Pre-caches all essential static assets on installation.
 * Implements a Cache-First, Network-Fallback strategy so the wedding invitation
 * loads instantly and works completely offline even without internet access.
 */

const CACHE_NAME = 'shubh-vivah-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './config.js',
  './css/style.css',
  './css/tailwind.css',
  './js/main.js',
  './libs/aos.css',
  './libs/aos.js',
  './libs/confetti.browser.min.js',
  './libs/flipdown.css',
  './libs/flipdown.js',
  './fonts/PlayfairDisplay-Regular.woff2',
  './fonts/PlayfairDisplay-Italic.woff2',
  './fonts/Poppins-Regular.woff2',
  './fonts/Poppins-SemiBold.woff2',
  './fonts/Poppins-Bold.woff2',
  './fonts/NotoSansDevanagari-Regular.woff2'
];

// Install Event: Pre-cache all local assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching wedding invitation assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache First, Network Fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache dynamically if valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
