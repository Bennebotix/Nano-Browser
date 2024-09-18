const redirectUrl = 'https://google.com';

const CACHE_NAME = 'my-cache-v1'; // Change this version string to invalidate old caches
const ASSETS_TO_CACHE = [
    "/",
    "/js/search.js",
    "/serviceworker.js",
    "/manifest.json",
    "/index.html",
    "/images/icon512_maskable.png",
    "/images/icon512_rounded.png"
];

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        handleRequest(event.request)
    );
});

async function handleRequest(request) {
    try {
        const newUrl = new URL(redirectUrl);
        newUrl.pathname = new URL(request.url).pathname;
        newUrl.search = new URL(request.url).search;

        const response = await fetch(newUrl.toString(), {
            method: request.method,
            headers: request.headers,
            body: request.method === 'POST' || request.method === 'PUT' ? request.body : null,
            redirect: 'manual'
        });

        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        return new Response('Error fetching the redirect URL', { status: 500 });
    }
}

async function handleRequest(request) {
    try {
        const newUrl = new URL(redirectUrl);
        newUrl.pathname = new URL(request.url).pathname;
        newUrl.search = new URL(request.url).search;

        let response;
        if (request.url.endsWith('.js') || request.url.endsWith('.css')) {
            // Example: handle JavaScript and CSS files
            response = await fetch(newUrl.toString(), {
                method: request.method,
                headers: request.headers,
                body: request.method === 'POST' || request.method === 'PUT' ? request.body : null,
                redirect: 'manual'
            });
        } else {
            // Handle other types of requests or assets
            response = await fetch(newUrl.toString(), {
                method: request.method,
                headers: request.headers,
                body: request.method === 'POST' || request.method === 'PUT' ? request.body : null,
                redirect: 'manual'
            });
        }

        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        return new Response('Error fetching the redirect URL', { status: 500 });
    }
}
