import { isLoggedIn, hamburgerMenu } from './utils.js';

window.addEventListener("load", isLoggedIn);

hamburgerMenu();

let slideshowCont = document.getElementById("slideshow-cont");

async function getPostsToSlide() {
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/hermanjasser/`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const slideApi = data.data;
        //console.log(slideApi);
        setSlides(slideApi);
        runSlider()
    } catch (error){
        console.error("Error message: " + error)
       slideshowCont.innerHTML = `<p>Finner ingen slides</p>`
    }
}

getPostsToSlide();

function setSlides(api){
    slideshowCont.innerHTML = "";
    let container = "";
    for(let i = 0; i < 3; i++){
        container += `
            <div class="single-slide">
                <img class="slider-img" src="${api[i].media.url}" alt="${api[i].media.alt}">
                <div class="single-slide-info-cont">
                    <h2>${api[i].title}</h2>
                    <a class="cta-button" href="./singlepost.html?id=${api[i].id}">Les mer</a>
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
        console.error("No slides found.");
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



