<template>
    <div class="mainContent__container" v-on:click="postCreator">
        <div class="divContent">
            <div class="divContent__top">
                <router-link to="/profilExample"><img class="divContent__profilImg" src="../assets/logo.png"></router-link>
                <router-link to="/postExample"><h2 class="divContent__header">Example Title</h2></router-link>
                <h2 class="divContent__header divContent__filter"> Work </h2>
            </div>
            <div class="divContent__content">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, veritatis quae recusandae rerum amet nihil magnam ea quod magni laboriosam. Laudantium soluta illum perspiciatis libero, quibusdam perferendis. Nostrum, atque magnam?</p>
            </div>
        </div>
        <div class="divContent">
            <div class="divContent__top">
                <router-link to="/profilExample"><img class="divContent__profilImg" src="../assets/logo.png"></router-link>
                <h2 class="divContent__header">Example Title</h2>
                <h2 class="divContent__header divContent__filter"> Fun </h2>
            </div>
            <div class="divContent__content">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, veritatis quae recusandae rerum amet nihil magnam ea quod magni laboriosam. Laudantium soluta illum perspiciatis libero, quibusdam perferendis. Nostrum, atque magnam?</p>
            </div>
        </div>
        <div class="divContent">
            <div class="divContent__top">
                <router-link to="/profilExample"><img class="divContent__profilImg" src="../assets/logo.png"></router-link>
                <h2 class="divContent__header">Example Title</h2>
                <h2 class="divContent__header divContent__filter"> Fun </h2>
            </div>
            <div class="divContent__content">
                <img src="../assets/logo.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "mainContent",
    data(){
        return {
             posts: [
                 {title: "read", type: "Work", content: "Lorem, ipsum", user: "me", img: "../assets/logo.png"},
                 {title: "seen", type: "Fun", content: "Lorem, quinze", user: "me", img: "../assets/logo.png"},
                 {title: "worked", type: "Work", content: "Lorem, twelve", user: "me", img: "../assets/logo.png"}
            ]
        }
    }, methods: {
        postCreator() {
            console.log("oops")
            for (let n = 0; n < this.posts.length; n++) {
                const baseDiv = document.getElementsByClassName("mainContent__container")[0];
                let mainDiv = document.createElement("div");
                mainDiv.className = "divContent";
                let headerDiv = document.createElement("div");
                headerDiv.className = "divContent__top"
                let contentDiv = document.createElement("div");
                contentDiv.className = "divContent__content";
                let pContent = document.createElement("p");
                pContent.textContent = this.posts[n].content;
                let headerLogo = document.createElement("img");
                headerLogo.className = "divContent__profilImg";
                headerLogo.src = this.posts[n].img;
                let headerTitle = document.createElement("h2");
                headerTitle.className = "divContent__header";
                headerTitle.textContent = this.posts[n].title;
                let headerType = document.createElement("h2");
                headerType.className = "divContent__header divContent__filter";
                headerType.innerText = this.posts[n].type;
                baseDiv.appendChild(mainDiv);
                mainDiv.appendChild(headerDiv);
                headerDiv.appendChild(headerLogo);
                headerDiv.appendChild(headerTitle);
                headerDiv.appendChild(headerType);
                mainDiv.appendChild(contentDiv);
                contentDiv.appendChild(pContent);
            }  
        }
    }
}
</script>

<style>
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