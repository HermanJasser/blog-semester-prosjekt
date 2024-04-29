import { hamburgerMenu } from './utils.js';

hamburgerMenu();

/*dette er for å sjekke om du allerede er logget inn*/

const alreadyLoggedIn = () => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
if (token && username){
    window.location = "./mypage.html"; 
}
}

alreadyLoggedIn();

/*brukte demoen din som veilder for å lage login prossesen. link: https://github.com/mitthrawnuruodo/demo-2024-02-06/tree/main*/
const loginForm = document.getElementById("login-form");


//console.log(loginForm);

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
   
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim()
    //console.log("email: ", email);
    //console.log("password: ", password);
    if (email && password) {
    
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
            window.location = "./mypage.html";
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(error.message);
        const wrong = document.getElementById("wrong");

        wrong.innerText = "";
        wrong.innerText = "Feil Email eller passord";


    }
}



