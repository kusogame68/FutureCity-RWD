const img = document.querySelector(".img");

function initRainEffect() {
    const oldCanvas = document.querySelector("canvas");
    
    if (oldCanvas) oldCanvas.remove();

    const rainEffect = new RainyDay({
        image: img,
        gravityAngle: Math.PI / 3,
        fps: 40,
    });

    rainEffect.rain([
        [10, 8, 0.05],
        [7, 7, 0.5],
        [2, 1, 20],
    ], 20);
}
img.onload = () => {
    initRainEffect();
}
img.crossOrigin = "anonymous";

/* === 螢幕縮放問題 === */
window.addEventListener("resize", () => {
    initRainEffect();
});

/* === LOGIN === */ 
const t_account = "admin@future.com";
const t_password = "superuser";
const inputAccount = document.getElementById("email");
const inputPassword = document.getElementById("password");
const login = document.getElementById("login");
const forget = document.getElementById("forget");

if(!localStorage.getItem("account")){
    localStorage.setItem("account",t_account);
    localStorage.setItem("password",t_password);
}

login.addEventListener("click",function(){
    const result = document.getElementById("result");

    if(inputAccount.value === t_account && inputPassword.value === t_password){
        if (document.getElementById("remember").checked) {
            localStorage.setItem("account", inputAccount.value);
            localStorage.setItem("password", inputPassword.value);
        }
        /* === 跨頁面處理登入問題(關鍵) === */
        localStorage.setItem("isLoggedIn", "true");
        result.style.color = "aquamarine";
        result.style.opacity = 1;
        result.textContent = "登入成功";
        setTimeout(function(){
            location.href = "./homepage.html"
        },2000);
    }else if(inputAccount.value === "" || inputPassword.value === ""){
        result.style.opacity = 1;
        result.textContent = "請輸入帳號及密碼";
    }else{
        result.style.opacity = 1;
        result.textContent = "輸入錯誤，請重新輸入";
    }
})

forget.addEventListener("click",function(){
    inputAccount.value = localStorage.getItem("account");
    inputPassword.value = localStorage.getItem("password");
    login.focus();
})

/* === 跨頁面處理登入問題 => RWD.js === */ 