/* === LOADING (index) === */
let startTime = Date.now();
let loading = document.createElement("div");
let body = document.getElementsByTagName("body")[0];
loading.setAttribute("id","loading");
for (i = 0 ; i < 5 ; i++){
    let loadingBox = document.createElement("div");
    loadingBox.setAttribute("class","loadingbox");
    loading.appendChild(loadingBox);
}
body.appendChild(loading);

window.addEventListener("load",() => {
    let rangeTime = Date.now() - startTime;
    let remainingTime = Math.max(Math.abs(1000 - rangeTime), 0, 1);

    setTimeout(() => {
        loading.remove();
    }, remainingTime);
});