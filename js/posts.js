import { isLoggedIn, hamburgerMenu } from './utils.js';

hamburgerMenu();

window.addEventListener("load", isLoggedIn);

let allPostsCont = document.getElementById("all-posts");
console.log(allPostsCont);

async function getAllPosts() {
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/hermanjasser/`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const postsApi = data.data;
        //console.log(postsApi);
        listAllposts(postsApi);
    } catch (error){
        console.error("Error message: " + error)
       allPostsCont.innerHTML = `<p>Finner ingen posts</p>`
    }
}

getAllPosts();

function listAllposts(api){
    allPostsCont.innerHTML = "";
    let cont = "";
    //console.log(api)
    for (let post of api) {
        //console.log(post.title);
        cont += `
        <a class="single-post" href="./singlepost.html?id=${post.id}">
            <img class="single-post-img" src="${post.media.url}" alt="${post.media.alt}">
            <h2 class="single-post-title">${post.title}</h2>
        </a>`;
    }
    allPostsCont.innerHTML = cont;
}