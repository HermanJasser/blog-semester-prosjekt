import { isLoggedIn, hamburgerMenu } from './utils.js';

hamburgerMenu();

window.addEventListener("load", isLoggedIn);

let mainSinglePost = document.getElementById("main-single-post")

let params = new URL(document.location).searchParams;
let id = params.get("id");

//console.log(id);

async function getSinglePost() {
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/hermanjasser/${id}`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const postApi = data.data;
        //console.log(postApi);
        let longDate = postApi.created;
        //console.log(longDate)
        let shortDate = longDate.slice(0,10)
        //console.log(shortDate);
        let splitDate = shortDate.split('-');
        let date = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
        //console.log(Date);
        mainSinglePost.innerHTML = `
        <div>
            <img src="${postApi.media.url}" alt="${postApi.media.alt}">
            <div class="single-post-info">
            <p>${postApi.author.name}</p>
            <p>Publisert: ${date}</p>
            </div>
            <h1>${postApi.title}</h1>
            <p>${postApi.body}</p>
        </div>
        `;



    } catch (error){
        console.error("Error message: " + error)
       allPostsCont.innerHTML = `<p>Finner ikke posten</p>`
    }
}

getSinglePost();

