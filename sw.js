const CACHE_NAME = 'guia-farmaceutico-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@400;500;600;700;800&display=swap',
  'https://code.jquery.com/jquery-3.7.1.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdn.jsdelivr.net/npm/typed.js@2.0.12',
  'https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js'
];

// Cache all lab images
const imageFiles = [
  'lab-students-serra-dourada.jpg',
  'lab-visual-inspection-magnifier.jpg',
  'lab-viscometer-helipath.jpg',
  'lab-texture-analyzer-toothpaste.jpg',
  'lab-tackiness-test-gel.jpg',
  'lab-tablet-hardness-tester-closeup.jpg',
  'lab-tablet-comparison-lots.jpg',
  'lab-student-beaker-book.jpg',
  'lab-robot-arm-flask.jpg',
  'lab-rheometer-cto.jpg',
  'lab-rheometer-cream-concentric.jpg',
  'lab-rheometer-cream-plate.jpg',
  'lab-ph-meter-setup.jpg',
  'lab-pipetting-multi-channel.jpg',
  'lab-petri-dishes-microbiology.jpg',
  'lab-mortar-pestle-powder.jpg',
  'lab-melting-point-tubes.jpg',
  'lab-melting-point-apparatus-screen.jpg',
  'lab-incubator-microplate-reader.jpg',
  'lab-hplc-injection.jpg',
  'lab-hplc-system.jpg',
  'lab-friability-tester-rpm.jpg',
  'lab-friability-tester-pills.jpg',
  'lab-dissolution-tester-beaker.jpg',
  'lab-extrusion-test-syringe.jpg',
  'lab-dissolution-tester-automated.jpg',
  'lab-disintegration-tester-autobasket.jpg',
  'lab-differential-weighing.jpg',
  'lab-density-meter-setup.jpg',
  'lab-cream-application-hand.jpg',
  'lab-colony-counter-maldi.jpg',
  'lab-balance-capsules.jpg',
  'Pycnometer.jpg',
  'Agar-plate-with-bacterial-colonies...png',
  'lal_reagent_water_3.png',
  'target-arrow.jpg'
];

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll([...urlsToCache, ...imageFiles]);
      })
      .then(() => {
        console.log('Service Worker: Files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching files', error);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Cached new resource', event.request.url);
              });
            
            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed', error);
            // Return offline page or fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handling
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Novo conteúdo disponível no Guia Farmacêutico!',
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="0.9em" font-size="90"%3E⚕️%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="0.9em" font-size="90"%3E💊%3C/text%3E%3C/svg%3E',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explorar',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="0.9em" font-size="90"%3E🔬%3C/text%3E%3C/svg%3E'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="0.9em" font-size="90"%3E❌%3C/text%3E%3C/svg%3E'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Guia Farmacêutico', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/index.html')
    );
  }
});

// Background sync function
function doBackgroundSync() {
  return new Promise((resolve, reject) => {
    // Perform background sync tasks
    console.log('Service Worker: Performing background sync');
    
    // Example: Check for updates
    fetch('/index.html', { cache: 'no-cache' })
      .then(response => {
        if (response.ok) {
          console.log('Service Worker: Background sync completed');
          resolve();
        } else {
          throw new Error('Background sync failed');
        }
      })
      .catch(error => {
        console.error('Service Worker: Background sync error', error);
        reject(error);
      });
  });
}