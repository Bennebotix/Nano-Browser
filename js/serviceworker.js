const sw = new UVServiceWorker();

async function handleRequest(event) {
    if (sw.route(event)) {
        return await sw.fetch(event);
    }
    
    return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});
