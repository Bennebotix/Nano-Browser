document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("searchButton");
    const tabs = document.querySelectorAll(".tab");
    const iframe = document.getElementById("webpageFrame");

    searchButton.addEventListener("click", () => {
        const url = searchBar.value;
        iframe.src = search(url);
    });

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            iframe.src = tab.dataset.url;
        });
    });
});
