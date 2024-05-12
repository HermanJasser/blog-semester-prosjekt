

 export let isLoggedIn = () => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
    let loggedInOut = document.getElementById("logged-in-out");
    let logOutBtn = document.getElementById("log-out-btn-cont")
    //console.log({token: token, username: username});

    if (token && username) {
        //console.log ("Logged in");
        if(window.location.pathname.includes("/index.html") || window.location.pathname === "/blog-semester-prosjekt/" || window.location.pathname == "/blog-semester-prosjekt"){
            loggedInOut.innerHTML = `<a href="./account/mypage.html">Min side</a>`;
        } else{
        loggedInOut.innerHTML = `<a href="../account/mypage.html">Min side</a>`;
        }
        logOutBtn.innerHTML = `<button id="logout">Log out</button>`;
        logOutBtn.style.display = "block";
        document.querySelector("button#logout").addEventListener("click", () => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            window.location = "./index.html";
        });
    } else {
        //console.log ("NOT Logged in");
        if(window.location.pathname.includes("/index.html") || window.location.pathname === "/blog-semester-prosjekt/" || window.location.pathname == "/blog-semester-prosjekt"){
        loggedInOut.innerHTML = `<a href="./account/login.html">Log inn</a>`;
        } else{
            loggedInOut.innerHTML = `<a href="../account/login.html">Log inn</a>`
        }
    }
}



export const loggedInAccess = () => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
if (!token && !username){
    //console.log("not logged in");
    window.location = "../account/login.html"; // Automatic
}
}


//Dette er for hamburgermenyen

export function hamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    hamburger.addEventListener("click", mobileMenu);
    
    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    const navLink = document.querySelectorAll(".nav-link");

    navLink.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    }

}




