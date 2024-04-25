const editPostForm = document.getElementById("edit-post-form");
//console.log(editPostForm);

let params = new URL(document.location).searchParams;
let id = params.get("id");
let username = localStorage.getItem("username"); 

let ref = document.referrer;

async function getEditPostInfo(){
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/${username}/${id}`;
        const response = await fetch(api);
        //console.log(response);
        const data = await response.json();
        //console.log(data.data);
        const postApi = data.data;

        editPostForm.title.value = postApi.title;
        editPostForm.content.value = postApi.body;
        editPostForm.img.value = postApi.media.url;
    } 
    catch{
        console.error("Error message: " + error)
        editPostForm.innerHTML = `Finner ikke posten`;
    }
}

getEditPostInfo();

editPostForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = editPostForm.title.value.trim();
    const content = editPostForm.content.value.trim();
    const  img = editPostForm.img.value.trim();
    if (title && content) {
        //console.log(title, content, img)
        editPostToApi(title, content, img);
    }
});

async function editPostToApi(title, content, img){  
    try{
        let accessToken = localStorage.getItem("token");
        let username = localStorage.getItem("username"); 
        console.log(accessToken);
        const options = {
            method: "PUT",
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
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${id}`, options);
        const data = await response.json();
        console.log(data)
        window.location = "mypage.html";
    }
    catch (error){
        console.log(error.message);
        throw new Error(response.statusText);
        
    }
    }