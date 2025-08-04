// ===== RESPONSIVE SERVICE WORKER =====

const CACHE_NAME = 'farma-guide-responsive-v2';
const STATIC_CACHE = 'farma-static-v2';
const DYNAMIC_CACHE = 'farma-dynamic-v2';
const IMAGE_CACHE = 'farma-images-v2';

// URLs to cache for different device types
const STATIC_URLS = [
    '/',
    '/index.html',
    '/responsive.css',
    '/responsive.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@400;500;600;700;800&display=swap'
];

const JS_URLS = [
    'https://code.jquery.com/jquery-3.7.1.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://cdn.jsdelivr.net/npm/typed.js@2.0.12',
    'https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js',
    '/js/i18n.js',
    '/js/notifications.js',
    '/js/gamification.js',
    '/js/favorites.js',
    '/js/advanced-search.js',
    '/js/ai-chatbot.js',
    '/js/video-system.js',
    '/js/dashboard.js'
];

// Image optimization based on device capabilities
const IMAGE_URLS = [
    'lab-student-beaker-book.jpg',
    'lab-pipetting-multi-channel.jpg',
    'target-arrow.jpg',
    'lab-robot-arm-flask.jpg',
    'lab-balance-capsules.jpg',
    'lab-tablet-hardness-tester-closeup.jpg',
    'lab-friability-tester-rpm.jpg',
    'lab-disintegration-tester-autobasket.jpg',
    'lab-dissolution-tester-automated.jpg',
    'lab-students-serra-dourada.jpg'
];

// Install event - cache static resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static resources
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Caching static resources');
                return cache.addAll(STATIC_URLS);
            }),
            
            // Cache JavaScript files
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('Caching JavaScript files');
                return cache.addAll(JS_URLS);
            }),
            
            // Cache images with device-specific optimization
            caches.open(IMAGE_CACHE).then(cache => {
                console.log('Caching images');
                return cache.addAll(IMAGE_URLS);
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== DYNAMIC_CACHE && 
                        cacheName !== IMAGE_CACHE &&
                        cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different types of requests
    if (isStaticResource(request)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else if (isJavaScript(request)) {
        event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    } else if (isImage(request)) {
        event.respondWith(imageCacheStrategy(request));
    } else if (isAPIRequest(request)) {
        event.respondWith(networkFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('Cache first strategy failed:', error);
        return new Response('Offline content not available', { status: 503 });
    }
}

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('Network first strategy failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Offline content not available', { status: 503 });
    }
}

// Image cache strategy with device optimization
async function imageCacheStrategy(request) {
    try {
        // Check if we have a cached version
        const cachedResponse = await caches.match(request);
        
        // Try to fetch from network for better quality
        try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
                // Cache the new version
                const cache = await caches.open(IMAGE_CACHE);
                cache.put(request, networkResponse.clone());
                return networkResponse;
            }
        } catch (error) {
            console.log('Network fetch failed for image:', error);
        }
        
        // Return cached version if available
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fallback to a placeholder image
        return new Response('Image not available', { status: 404 });
    } catch (error) {
        console.log('Image cache strategy failed:', error);
        return new Response('Image not available', { status: 503 });
    }
}

// Helper functions to determine request types
function isStaticResource(request) {
    const url = request.url;
    return url.includes('.css') || 
           url.includes('fonts.googleapis.com') ||
           url.includes('unpkg.com/aos') ||
           url.includes('glightbox.min.css');
}

function isJavaScript(request) {
    const url = request.url;
    return url.includes('.js') || 
           url.includes('jquery') ||
           url.includes('bootstrap') ||
           url.includes('typed.js') ||
           url.includes('aos.js') ||
           url.includes('glightbox.min.js');
}

function isImage(request) {
    const url = request.url;
    return url.includes('.jpg') || 
           url.includes('.jpeg') || 
           url.includes('.png') || 
           url.includes('.webp') ||
           url.includes('.gif') ||
           url.includes('.svg');
}

function isAPIRequest(request) {
    const url = request.url;
    return url.includes('/api/') || 
           url.includes('analytics') ||
           url.includes('gtag');
}

// Background sync for offline functionality
self.addEventListener('sync', event => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Sync any pending data when connection is restored
        console.log('Performing background sync...');
        
        // You can add specific sync logic here
        // For example, syncing user preferences, favorites, etc.
        
        return Promise.resolve();
    } catch (error) {
        console.error('Background sync failed:', error);
        return Promise.reject(error);
    }
}

// Push notification handling
self.addEventListener('push', event => {
    console.log('Push notification received:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'Nova atualização disponível!',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver agora',
                icon: '/favicon.ico'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '/favicon.ico'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Guia Farmacêutico', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
    console.log('Service Worker received message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Error handling
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker unhandled rejection:', event.reason);
});

// Performance monitoring
self.addEventListener('fetch', event => {
    const startTime = performance.now();
    
    event.waitUntil(
        event.respondWith(
            (async () => {
                try {
                    const response = await fetch(event.request);
                    const endTime = performance.now();
                    
                    // Log performance metrics
                    console.log(`Fetch ${event.request.url} took ${endTime - startTime}ms`);
                    
                    return response;
                } catch (error) {
                    console.error('Fetch failed:', error);
                    throw error;
                }
            })()
        )
    );
});

console.log('Responsive Service Worker loaded');