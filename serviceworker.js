self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'NAVIGATE') {
        console.log('"NAVIGATE" recived!')
        fetch(event.data.url)
            .then(response => response.text())
            .then(text => {
                event.source.postMessage({
                    type: 'UPDATE_CONTENT',
                    content: text
                });
            })
            .catch(error => {
                console.error('Fetching failed:', error);
            });
    }
});
