// MentoLoop Service Worker for Cache Management
const CACHE_NAME = 'mentoloop-v2';
const STATIC_CACHE_NAME = 'mentoloop-static-v2';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/index.html',
  '/Logo outlined.svg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap'
];

// Install event - cache static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => cache.addAll(STATIC_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external API calls
  if (event.request.url.includes('api/') || 
      event.request.url.includes('supabase') || 
      event.request.url.includes('sendgrid')) {
    return;
  }

  // Handle www subdomain consistently by normalizing URLs
  let requestUrl = event.request.url;
  if (requestUrl.includes('www.mentoloop.com')) {
    requestUrl = requestUrl.replace('www.mentoloop.com', 'mentoloop.com');
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          // For HTML files, also fetch from network to update cache
          if (event.request.url.endsWith('.html')) {
            fetch(event.request).then(networkResponse => {
              if (networkResponse.ok) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
            }).catch(() => {
              // Network failed, use cached version
            });
          }
          return response;
        }

        // Fetch from network and cache if successful
        return fetch(event.request).then(networkResponse => {
          // Don't cache non-successful responses
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch(() => {
          // Network failed and no cache available
          // For HTML requests, return a basic offline page
          if (event.request.headers.get('accept').includes('text/html')) {
            return new Response(`
              <!DOCTYPE html>
              <html>
                <head>
                  <title>MentoLoop - Offline</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: 'Poppins', sans-serif; text-align: center; padding: 40px; }
                    h1 { color: #004aad; }
                  </style>
                </head>
                <body>
                  <h1>MentoLoop - NP Student & Preceptor Platform</h1>
                  <p>You're offline. Please check your connection and try again.</p>
                  <button onclick="location.reload()">Retry</button>
                </body>
              </html>
            `, {
              headers: { 'Content-Type': 'text/html' }
            });
          }
        });
      })
  );
});