
const loginForm = document.getElementById("login-form");

//console.log(loginForm);

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log("prøver å logge inn");
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim()
    //console.log("email: ", email);
    //console.log("password: ", password);
    if (email && password) {
        //console.log("Going to get token")
        getToken(email, password)
    }
});


async function getToken(email, password) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        };
        //console.log(options);
        const response = await fetch(`https://v2.api.noroff.dev/auth/login/`, options); 
        //console.log(response);
        if (response.ok){
            const data = await response.json();
            //console.log(data.data.accessToken);
            //console.log(data.data.name);
            //console.log(data);
            localStorage.setItem("username", data.data.name);
            localStorage.setItem("token", data.data.accessToken);
            window.location = "index.html";
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(error.message);
    }
}

