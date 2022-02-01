<template>
    <div class="mainContent__container">
    </div>
</template>

<script>
export default {
    name: "mainContent",
    data(){
        return {
        }
    }, methods: {
    },
    mounted() {
        // fetch allUser
        fetch("http://localhost:4000/auth/users", {method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(res => localStorage.setItem("allUserArray", JSON.stringify(res)))
        .then(console.log("AllUsers Array -> " , JSON.parse(localStorage.getItem("allUserArray"))))
        // fetch Allposts
        fetch("http://localhost:4000/api/posts", {method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(res => localStorage.setItem("postArray", JSON.stringify(res)))
        .then(console.log(" localstorage item ->  " , JSON.parse(localStorage.getItem('postArray'))))
        let posts = JSON.parse(localStorage.getItem('postArray'));
        for (let n = 0; n < posts.length; n++) {
            const baseDiv = document.getElementsByClassName("mainContent__container")[0];
            let mainDiv = document.createElement("div");
            mainDiv.className = "divContent";
            let headerDiv = document.createElement("div");
            headerDiv.className = "divContent__top"
            let contentDiv = document.createElement("div");
            contentDiv.className = "divContent__content";
            let pContent = document.createElement("p");
            pContent.textContent = posts[n].content;
            let headerLogoLink = document.createElement("a");
            headerLogoLink.href = "/profilExample"
            headerLogoLink.id = "logo" + n; 
            let headerLogo = document.createElement("img");
            headerLogo.className = "divContent__profilImg";
            let headerTitle = document.createElement("h2");
            headerTitle.className = "divContent__header";
            headerTitle.textContent = posts[n].title;
            let headerType = document.createElement("h2");
            headerType.className = "divContent__header divContent__filter";
            headerType.innerText = posts[n].type;
            let link = document.createElement("a");
            link.href = "/postExample"
            link.id = n;
            baseDiv.appendChild(mainDiv);
            mainDiv.appendChild(headerDiv);
            headerDiv.appendChild(headerLogoLink);
            headerLogoLink.appendChild(headerLogo);
            headerDiv.append(link);
            link.appendChild(headerTitle);
            headerDiv.appendChild(headerType);
            mainDiv.appendChild(contentDiv);
            contentDiv.appendChild(pContent);

            let currentPost = document.getElementById(n);
            currentPost.addEventListener("click", () => {
                let postChosen = JSON.stringify(n);
                localStorage.setItem("postNumber" , postChosen);
                console.log("LOGGED postNumber -> " , JSON.parse(localStorage.getItem("postNumber")));
            })
            let currentProfil = document.getElementById("logo" + n);
            currentProfil.addEventListener("click", () => {
                let profilChosen = posts[n].userId;
                localStorage.setItem("profilNumber", profilChosen);
            })
        }
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.$store.dispatch('expChecker' , {userData});
    }
}
</script>

<style>
a, a:hover, a:visited, a:active{
    text-decoration: none;
}
.mainContent__container {
    margin-right: auto;
    margin-left: auto;
    margin-top: 25px;
    margin-bottom: 10px;
    border-radius: 15px;
    width: 80vw;
    min-width: 300px;
    padding: 20px;
    background-color: rgb(155, 190, 255);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.divContent{
    border: solid black 2px;
    background-color: white;
    border-radius: 12px;
    margin: 5px;
    width: inherit;
}
.divContent__top{
    display: flex;
    flex-direction: row;
    padding: 3px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    justify-content: space-between;
}
.divContent__header{
    margin: 5px;
    padding: 0px;
    color: black;
    text-decoration: none;
}
.divContent__filter{
    color: blueviolet !important;
}
.divContent__profilImg{
    margin-left: 5px;
    margin-right: 5px;
    object-fit: scale-down;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    border-radius: 50%;
    background-color: white;
}
.divContent__content{
    margin: 5px;
}
</style>