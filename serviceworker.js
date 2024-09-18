// const CACHE_NAME = 'nano-borwser-cache-v1';
// const redirectUrl = 'https://raw.githubusercontent.com/Bennebotix/Nano-Browser/main/manifest.json'; // Change to your desired redirect URL

// self.addEventListener('install', (event) => {
//     console.log('[Service Worker] Installing...');
//     // Cache any assets you need here if necessary
// });

// self.addEventListener('activate', (event) => {
//     console.log('[Service Worker] Activating...');
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (cacheName !== CACHE_NAME) {
//                         console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

// self.addEventListener('fetch', (event) => {
//     //event.respondWith(handleRequest(event.request));
//     event.respondWith(event.request);
// });

// async function handleRequest(request) {
//     const url = new URL(request.url);

//     // Construct the new URL to fetch content from
//     const newUrl = new URL(redirectUrl);
//     newUrl.pathname = url.pathname;
//     newUrl.search = url.search;

//     console.log(`Fetching URL: ${newUrl.toString()}`);

//     try {
//         const response = await fetch(newUrl.toString(), {
//             method: request.method,
//             headers: request.headers,
//             body: request.method === 'POST' ? request.body : null,
//             redirect: 'manual'
//         });

//         if (!response.ok) {
//             console.error(`Failed to fetch ${newUrl.toString()}: ${response.statusText}`);
//             return new Response('Error fetching the URL', { status: 500 });
//         }

//         const responseClone = response.clone();
//         if (url.pathname.endsWith('.html')) {
//             // Cache HTML responses
//             caches.open(CACHE_NAME).then((cache) => {
//                 cache.put(request, responseClone);
//             });
//         }

//         return response;
//     } catch (error) {
//         console.error(`Fetch error: ${error}`);
//         return new Response('Error fetching the URL', { status: 500 });
//     }
// }
