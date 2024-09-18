const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const tabs = document.querySelectorAll(".tab");
const iframe = document.getElementById("webpageFrame");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        go(tab.dataset.url);
    });
});

function go(val = searchBar.value) {
    const url = search(val, "https://www.google.com/search?igu=1&q=%s");
    iframe.src = url;
    searchBar.value = url;

    tabs.forEach(tab => {
        if (tab.classList[1] == "active") {
            tab.dataset.url = val;
        }
    });
}
