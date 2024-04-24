const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
    let loggedInOut = document.getElementById("logged-in-out");
    //console.log({token: token, username: username});

    if (token && username) {
        //console.log ("Logged in");
        loggedInOut.innerHTML = `Hei, <strong>${username}<strong>
        <a href="./mypage.html">Min side</a>
        <button id="logout">Log out</button>`;
        document.querySelector("button#logout").addEventListener("click", () => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            window.location = "index.html"; // Automatic
        });
    } else {
        //console.log ("NOT Logged in");
        loggedInOut.innerHTML = `<a href="login.html">Log in</a>`;
        //window.location = "login.html"; // Automatic
    }
}

window.addEventListener("load", isLoggedIn);

