if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceworker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        go(tab.dataset.url);
    });
});

function go(val = searchBar.value) {
    const url = search(val, "https://www.google.com/search?igu=1&q=%s");
    
    // Send URL to service worker
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'NAVIGATE', url: url });
    }

    searchBar.value = url;

    tabs.forEach(tab => {
        if (tab.classList.contains("active")) {
            tab.dataset.url = val;
        }
    });
}

// Handle messages from service worker
navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.type === 'UPDATE_CONTENT') {
        alert('hi')
        document.getElementById('content').innerHTML = event.data.content;
    }
});
