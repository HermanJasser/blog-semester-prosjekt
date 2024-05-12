import { isLoggedIn, hamburgerMenu } from './utils.js';

window.addEventListener("load", isLoggedIn);

hamburgerMenu();

let slideshowCont = document.getElementById("slideshow-cont");

async function getPostsToIndex() {
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/hermanjasser/`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const indexApi = data.data;
        //console.log(slideApi);
        setSlides(indexApi);
        runSlider();
        listNewposts(indexApi);
    } catch (error){
        console.error("Error message: " + error)
       slideshowCont.innerHTML = `<p>Finner ingen slides</p>`
    }
}

getPostsToIndex();

function setSlides(api){
    slideshowCont.innerHTML = "";
    let container = "";
    for(let i = 0; i < 3; i++){
        container += `
            <div class="single-slide">
                <img class="slider-img" src="${api[i].media.url}" alt="${api[i].media.alt}">
                <div class="single-slide-info-cont">
                    <h2>${api[i].title}</h2>
                    <a class="cta-button" href="./post/singlepost.html?id=${api[i].id}">Les mer</a>
                </div>
            </div>`
    }
    slideshowCont.innerHTML = container;
}

    let slideIndex = 0;
    let intervalId = null;
    let allSlides = [];

function runSlider() {
    allSlides = document.getElementsByClassName("single-slide");
    

    initializeSlider();
};



function initializeSlider(){
    if (allSlides.length > 0) {
        allSlides[slideIndex].classList.add("display-slide");
        intervalId = setInterval(nextSlide, 5000);
    } else {
        console.error("ingen posts funnet");
    }
}

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

function nextSlide(){
    slideIndex++;
    showSlide();
}

next.addEventListener("click", () => {
slideIndex++;
showSlide();

});

prev.addEventListener("click", () => {
slideIndex--;
showSlide();

});

function showSlide() {
    Array.from(allSlides).forEach(slide => {
        slide.classList.remove("display-slide");
    });
    if (slideIndex >= allSlides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = allSlides.length - 1;
    }
    allSlides[slideIndex].classList.add("display-slide");
}

slideshowCont.addEventListener("mouseover", function(){ clearInterval(intervalId)});

// Start a new timer when mouse out
slideshowCont.addEventListener("mouseout", function(){ intervalId = setInterval(nextSlide, 5000);});

let newPostCont = document.getElementById("new-posts-cont");

function listNewposts(api){
    let body1 = api[3].body.slice(0,120); 
    let body2 = api[4].body.slice(0,90); 
    let body3 = api[5].body.slice(0,90); 
    let body4 = api[6].body.slice(0,120); 

    newPostCont.innerHTML = `<a href="./post/singlepost.html?id=${api[3].id}" class="post-1">
        <img src="${api[3].media.url}" alt="${api[3].media.alt}">
        <h2>${api[3].title}</h2>
        <p>${body1}...</p>
      </a>
      <div class="post-2-3-cont">
        <a href="./post/singlepost.html?id=${api[4].id}" class="post-2">
          <h2>${api[4].title}</h2>
          <p>${body2}...</p>
        </a>
        <a href="./post/singlepost.html?id=${api[5].id}" class="post-3">
          <h2>${api[5].title}</h2>
          <p>${body3}...</p>
        </a>
      </div>
      <a href="./post/singlepost.html?id=${api[6].id}" class="post-4">
        <h2>${api[6].title}</h2>
        <p>${body4}...</p>
        <img src="${api[6].media.url}" alt="${api[6].media.url}">
      </a>`;
    
}