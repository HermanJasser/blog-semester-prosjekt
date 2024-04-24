let username = localStorage.getItem("username"); 
let postOverviewCont = document.getElementById("posts-overview")
//console.log(postOverviewCont);


async function findPostsFromApi() {
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/${username}/`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        postsApi = data.data;
        //console.log(postsApi);
        listPostsMyPage(postsApi)

    } catch (error){
        console.error("Error message: " + error)
        postOverviewCont.innerHTML = `<p>Finner ingen posts</p>`
    }
}

findPostsFromApi();

function listPostsMyPage(api) {
    postOverviewCont.innerHTML = "";
    let postContainer = "";
    for (let post of api) {
      postContainer += `
      <div class="single-post-overview">
      <img class="posts-overview-img" src="${post.media.url}" alt=""></img>
     <h2>${post.title}</h2>
     <button id="${post.id}">Slett</button>
     
    </div>`;
    }
    postOverviewCont.innerHTML = postContainer;

    api.forEach((item) => {
        addEventListenerDeletePost(item.id);
      });
    }
 


 //Dette er for å slette posts fra apiet

 function addEventListenerDeletePost(id) {
    let slett = document.getElementById(id);
    slett.addEventListener("click", () => {
        deletePostsFromApi(id);
    });
  }

  async function deletePostsFromApi(id){  
    try{
        let accessToken = localStorage.getItem("token");
        let username = localStorage.getItem("username"); 
        const options = {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json"
            },
        };
        //console.log(options);
        
        //console.log(username);
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${id}/`, options);
        //window.location.reload();
    }
    catch (error){
        console.log(error.message);
        throw new Error(response.statusText);
        
    }
    }