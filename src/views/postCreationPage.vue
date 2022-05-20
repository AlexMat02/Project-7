<template>
    <div>
        <header-1/>
        <div>
            <div>
                <h2> Title </h2>
                <input class="inputBar">
                <h2> Type </h2>
                <select class="inputBar dropDownMenu">
                    <option> Work </option>
                    <option> Fun </option>
                </select>
                <h2> Content </h2>
                <textarea class="inputBar" id="textarea"></textarea>
                <h2> Image URL </h2>
                <form enctype="multipart/form-data" method="post">
                    <input type="file" class="inputBar" @change="fileChange($event)">
                    <img v-if="post.image" :src="post.image">
                </form>
            </div>
            <button class="btn-classic" id="btn-post" @click="postCreator()" v-if="this.updating === false"> Submit Post </button>
            <button class="btn-classic" id="btn-post" @click="updatePost()" v-if="this.updating === true"> Update Post </button>
        </div>
    </div>
</template>

<script>
import header1 from '@/components/header1.vue'

export default ({
    name: "postCreationPage",
    data() {
        return {
            updating: false,
            post: {
                image:'',
                file: null
            },
        }
    },
    components: {
        header1,
    },
    methods: {
        fileChange(e) {
            const file = e.target.files[0];
            this.post.image = URL.createObjectURL(file);
            this.post.file = e.target.files[0];
            const imgInput = document.getElementsByClassName("inputBar")[3];
            let data = new FormData()
            data.append('file', imgInput.files[0])
        },
        postCreator() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            this.$store.dispatch('expChecker' , {userData})
            const expCheck = localStorage.getItem('expChecking');
            if (expCheck == "true") {
                const titleInput = document.getElementsByClassName("inputBar")[0];
                const typeInput = document.getElementsByClassName("inputBar")[1].value;
                const contentInput = document.getElementsByClassName("inputBar")[2];
                const imgInput = document.getElementsByClassName("inputBar")[3];
                if ( titleInput.value != "" && typeInput.value != "" && contentInput.value != "") {
                    let postContent = {
                        title: titleInput.value,
                        type: typeInput,
                        content: contentInput.value,
                        img: this.post.image,
                        imgURL: imgInput.files[0].name,
                        userId: userData.userData.userId,
                    }
                    let fd = new FormData()
                    fd.append('file', this.post.file, this.post.file.name);
                    fd.append('post', JSON.stringify(postContent));
                    fd.append('title', postContent.title); 
                    fd.append('type', postContent.type); 
                    fd.append('content', postContent.content); 
                    fd.append('img', postContent.img); 
                    fd.append('imgURL', postContent.imgURL); 
                    fd.append('userId', postContent.userId); 
                    fd.append('user', userData.userData.userId);
                    const myHeaders = new Headers();
                    myHeaders.append('Accept', 'multipart/form-data');
                    myHeaders.append('Authorization', userData.userData.token);
                    fetch("http://localhost:4000/api/posting", {method: 'POST', 
                        headers: myHeaders,
                        body: fd}) 
                    this.$router.push({name: 'Home'})
                } else if (titleInput.value == ""){
                    titleInput.style.borderColor = "red";
                } else if (contentInput.value == "") {
                    contentInput.style.borderColor = "red";
                } else {
                    console.log("boucle not found");
                }
            } else {
                return false;
            }
        },
        updatePost() {
            localStorage.removeItem("isUpdating");
            const posts = JSON.parse(localStorage.getItem("postArray"));
            const postNumber = JSON.parse(localStorage.getItem("postNumber"));
            const userData = JSON.parse(localStorage.getItem('userData'));
            this.$store.dispatch('expChecker' , {userData});
            const expCheck = localStorage.getItem('expChecking');
            const titleInput = document.getElementsByClassName("inputBar")[0];
            const typeInput = document.getElementsByClassName("inputBar")[1].value;
            const contentInput = document.getElementsByClassName("inputBar")[2];
            let fd = new FormData();
            if (this.post.file) {
                fd.append('file', this.post.file, this.post.file.name); 
            }
            fd.append('title', titleInput.value); 
            fd.append('type', typeInput); 
            fd.append('content', contentInput.value); 
            fd.append('userId', userData.userData.userId);  
            if (expCheck == "true") {
                // user is logged in
                this.loggedIn = true;
                fetch(`http://localhost:4000/api/updatePost/${posts[postNumber].id_Post}`, {method: 'PUT',
                    headers: {
                        'authorization': userData.userData.token
                    },
                    body: fd, userId: userData.userData.userId
                })
                this.$router.push({name: 'Home'})
            } else {
                // user is not logged in
                this.loggedIn = false;
            }
        }
    },
    mounted() {
        // Checks if it is in use for creating a post or updating one
        const isUpdating = localStorage.getItem("isUpdating");
        if (isUpdating == "true") {
            this.updating = true;
            const posts = JSON.parse(localStorage.getItem("postArray"));
            const postNumber = JSON.parse(localStorage.getItem("postNumber"));
            const titleInput = document.getElementsByClassName("inputBar")[0];
            const typeInput = document.getElementsByClassName("inputBar")[1];
            const contentInput = document.getElementsByClassName("inputBar")[2];
            titleInput.value = posts[postNumber].title;
            typeInput.value = posts[postNumber].type;
            contentInput.innerHTML = posts[postNumber].content;
        }
    }
})
</script>

<style>
#textarea{
    width: 40rem;
    height: 8rem;
}
#btn-post{
    width: 8rem;
    height: 3rem;
    font-size: large;
}
.dropDownMenu {
    margin: 10px;
    background-color: white;
    border: solid 2px white;
    appearance: none;
    border-radius: 15%;
    color: #D1515A;
    font-size: large;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 800;
}
.dropDownMenu:hover{
    cursor: pointer;
}
.btn-classic{
    appearance: none;
    border: 2px #D1515A solid;
    border-radius: 30%;
    background-color: white;
    margin: 1rem;
    width: fit-content;
    height: fit-content;
}
.btn-classic:hover{
    animation-name: buttonHover;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    cursor: pointer;
}
@keyframes buttonHover {
    0% {background-color: white;}
    100% {background-color: #D1515A;}
}
.inputBar{
    appearance: none;
    border: 2px #D1515A solid;
    width: 19rem;
    height: 2rem;
    font-size: large;
    resize: none;
    overflow: auto;
}
.linkFIX, .linkFIX:visited, .linkFIX:hover, .linkFIX:link{
    appearance: none;
    border: none;
    text-decoration: none;
    color: black;
}
</style>
