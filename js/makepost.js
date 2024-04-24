const addPostForm = document.getElementById("add-post-form");

//console.log(addPostForm);
addPostForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = addPostForm.title.value.trim();
    const content = addPostForm.content.value.trim();
    const  img = addPostForm.img.value.trim();
    if (title && content) {
        console.log(title, content, img)
        addPostToApi(title, content, img);
    }
});


async function addPostToApi(title, content, img){  
try{
    let accessToken = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
    console.log(accessToken);
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            "title": title,
            "body": content,
            "media": {
                "url": img
            } 
        }),
    };
    console.log(options);
    
    console.log(username);
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/`, options);
    const data = await response.json();
    //window.location = "mypage.html";
}
catch (error){
    console.log(error.message);
    throw new Error(response.statusText);
    
}
}
