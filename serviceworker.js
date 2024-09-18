const CACHE_NAME = 'uv-cache-v1';
const redirectUrl = 'https://example.com'; // Target URL

const ASSETS_TO_CACHE = [
    "/",
    "/js/search.js",
    "/serviceworker.js",
    "/manifest.json",
    "/index.html",
    "/images/icon512_maskable.png",
    "/images/icon512_rounded.png"
];

// Install event - caches initial assets if needed
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    // You can add assets to cache here if needed
});

// Activate event - cleans up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - intercepts and handles requests
self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

// Function to handle requests
async function handleRequest(request) {
    const url = new URL(request.url);

    // Construct the new URL to fetch content from
    const newUrl = new URL(redirectUrl);
    newUrl.pathname = url.pathname;
    newUrl.search = url.search;

    try {
        const response = await fetch(newUrl.toString(), {
            method: request.method,
            headers: request.headers,
            body: request.method === 'POST' ? request.body : null,
            redirect: 'manual'
        });

        if (response.ok) {
            const responseClone = response.clone();
            if (url.pathname.endsWith('.html')) {
                // Cache HTML responses
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, responseClone);
                });
            }
            return response;
        } else {
            return new Response('Error fetching the URL', { status: 500 });
        }
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        return new Response('Error fetching the URL', { status: 500 });
    }
}
