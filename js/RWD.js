/* === SWITCH(#nav #switch) === */
let switchable=false;
let switchBtn = document.getElementById("switch");
let body = document.getElementsByTagName("body")[0];
switchBtn.addEventListener("click",() => {
    if (switchable){
        switchBtn.classList.replace("fa-moon", "fa-sun");
        body.removeAttribute("class","mode");
    }
    else{
        switchBtn.classList.replace("fa-sun", "fa-moon");
        body.setAttribute("class","mode");
    }    
    switchable = !switchable;
});

/* === MENU(#nav #mobile .navbar) === */
let mobile = document.getElementById("mobile");
let menu = document.getElementsByTagName("menu")[0];
let lilist = document.getElementsByClassName("liList");
let menudisplay = true;
mobile.addEventListener("click",(e) => {
    if (menudisplay){
        menu.style.display = "block";
        e.currentTarget.children[0].style.transform = "rotate(-26deg)";
        e.currentTarget.children[1].style.display = "none";
        e.currentTarget.children[2].style.transform = "rotate(26deg)";
    }
    else{
        menu.style.display = "none";
        e.currentTarget.children[0].style.transform = "rotate(0deg)";
        e.currentTarget.children[1].style.display = "inline";
        e.currentTarget.children[2].style.transform = "rotate(0deg)";
    }
    menudisplay = !menudisplay;
});
for (const lis of lilist) {
    lis.addEventListener("click",(e) => {
        if (window.innerWidth < 768) {
            menu.style.display = "none";
            mobile.children[0].style.transform = "rotate(0deg)";
            mobile.children[1].style.display = "inline";
            mobile.children[2].style.transform = "rotate(0deg)";
            menudisplay = !menudisplay;
        }
    })    
};

/* === TEST MENU === */
window.addEventListener("resize",() => {
    if (window.innerWidth >= 768){
        menu.style.removeProperty("display");
    }
    else{
        menu.style.display = "none";
    }
});

/* === THEME === */
let carousel = document.getElementsByClassName("carousel")[0];
let imgs = document.querySelectorAll(".carousel .pic");
let carouselBtns = document.querySelectorAll(".select .btn");
let imgIndex = 0;
let interval;
const waitT = 3000;

document.getElementById("prepend").addEventListener("click",() => {
    clearInterval(interval);
    prevCarousel();
}); 
document.getElementById("next").addEventListener("click",() => {
    clearInterval(interval);
    nextCarousel();
});

/* === INIT CAROUSEL === */
__init__();
function __init__(){
    updateCarousel();
    startCarousel();
}
function startCarousel(){
    interval = setInterval(() => {
        nextCarousel();
    }, waitT)
};
function prevCarousel(){
    if (imgIndex <= 0) 
        imgIndex = 5;
    imgIndex = (imgIndex - 1) % carouselBtns.length;
    updateCarousel();
    reStart();
};
function nextCarousel(){
    imgIndex = (imgIndex + 1) % carouselBtns.length;
    updateCarousel();
    reStart();
};
function updateCarousel(){
    imgs.forEach((img, index) => {
        /* === another way === */
        // const offset = -imgIndex * 20;
        // carousel.style.transform = `translateX(${offset}%)`;
        const offset = -imgIndex * 100;
        carousel.style.left = `calc(${offset}%)`;
    })
    carouselBtns.forEach((btn, index) => {
        if (index === imgIndex){
            btn.classList.add("active");
        }
        else{
            btn.classList.remove("active");
        }
    })
};
function reStart(){
    if(interval){
        clearInterval(interval);
    };
    __init__();
}
function goToImage(index){
    clearInterval(interval);
    imgIndex = index;
    __init__();
};
imgs.forEach((img, index) => {
    img.addEventListener("mouseover",() => clearInterval(interval));
    // img.addEventListener("mouseout",() => goToImage(index));
    img.addEventListener("mouseout",() => reStart());
});
carouselBtns.forEach((btn, index) => {
    btn.addEventListener("click",() => goToImage(index));
});

/* === MOBILE CAROUSEL === */
let startX = 0;
let endX = 0;
let moveX = 0;

carousel.addEventListener("touchstart",(e) => {
    clearInterval(interval);
    startX = e.touches[0].clientX;
});
carousel.addEventListener("touchend",(e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        carousel.style.transform = `translateX(0px)`;
        nextCarousel();
    } else if (endX - startX > 50) {
        carousel.style.transform = `translateX(0px)`;
        prevCarousel();
    }else{
        carousel.style.transform = `translateX(0px)`;
        reStart();
    }
});
carousel.addEventListener("click",() => {
    reStart();
})
carousel.addEventListener("touchmove",(e) => {
    clearInterval(interval);
    moveX = e.touches[0].clientX;
    carousel.style.transform = `translateX(${moveX - startX}px)`;
});



/* === GOTOP === */
let gotop = document.createElement("a");
gotop.setAttribute("id","gotop");
gotop.setAttribute("class","fa-solid fa-arrow-up");
gotop.setAttribute("href","#");
gotop.style.width = "2em";
gotop.style.height = "2em";
gotop.style.lineHeight = "2em";
gotop.style.fontSize = "2em";
gotop.style.position = "fixed";
gotop.style.right = "1em";
gotop.style.bottom = "2em";
gotop.style.background = "var(--alphaBlack--)";
gotop.style.color = "var(--alphaWhite--)";
gotop.style.borderRadius = "5px";
gotop.style.textAlign = "center";
gotop.style.cursor = "pointer";
gotop.style.zIndex = 20;
body.appendChild(gotop);
gotop.addEventListener("mouseover",(e) => {
    e.target.style.filter = "brightness(1.5)";
});
gotop.addEventListener("mouseout",(e) => {
    e.target.style.filter = "brightness(1)";
});

/* === FOOTER === */
let footerYears = document.getElementsByClassName("year");
for (const year of footerYears) {
    year.textContent = new Date().getFullYear();
}

/* === LOADING === */
let startTime = Date.now();
let loading = document.createElement("div");
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

/* === 跨頁面處理登入問題 === */ 
let homelogin = document.getElementById("homeLogin");

if(localStorage.getItem("isLoggedIn") === "true"){
    homelogin.textContent = "登出";
}

homelogin.addEventListener("click",(e) => {
    if(localStorage.getItem("isLoggedIn") === "true"){
        e.preventDefault();
        localStorage.setItem("isLoggedIn","false");
        location.reload();
    }
})
