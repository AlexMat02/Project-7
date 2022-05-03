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
                image:''
            },
        }
    },
    components: {
        header1,
    },
    methods: {
        fileChange(e) {
            console.log("LOGGED e -> ", e)
            const file = e.target.files[0];
            this.post.image = URL.createObjectURL(file);
            this.post.file = e.target.files[0];
            const imgInput = document.getElementsByClassName("inputBar")[3];
            console.log("LOGGED imgInput -> ", imgInput);
            console.log("LOGGED imgInput.value -> ", imgInput.value);
            console.log("post.image here !")
            console.log("LOGGED this.image -> ", this.post.image);
            console.log("IF TRUE IS BLOB " ,this.post.image instanceof Blob)
            // #WORK maybe this is the key ?
        },
        postCreator() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            console.log("LOGGED USERDATA .USERID -> " , userData.userData.userId)
            console.log("LOGGED USERDATA .USERID -> " , userData.userData.token)
            this.$store.dispatch('expChecker' , {userData})
            const expCheck = localStorage.getItem('expChecking');
            console.log("expChecking -> " , expCheck)
            if (expCheck == "true") {
                console.log("TEST-1 returned true")
                const titleInput = document.getElementsByClassName("inputBar")[0];
                const typeInput = document.getElementsByClassName("inputBar")[1].value;
                console.log("typeINput.value -> " , typeInput);
                const contentInput = document.getElementsByClassName("inputBar")[2];
                const imgInput = document.getElementsByClassName("inputBar")[3];
                if ( titleInput.value != "" && typeInput.value != "" && contentInput.value != "") {
                    let postContent = {
                        title: titleInput.value,
                        type: typeInput,
                        content: contentInput.value,
                        img: this.post.image,
                        userId: userData.userData.userId,
                    }
                    console.log("LOGGED postContent -> " , postContent);
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Accept', 'application/json');
                    myHeaders.append('Authorization', userData.userData.token);
                    fetch("http://localhost:4000/api/posting", {method: 'POST', 
                        headers: myHeaders,
                        body: JSON.stringify({post: postContent}, userData.userData.userId)})
                    .then(console.log("fetch request send"))
                    this.$router.push({name: 'Home'})
                } else if (titleInput.value == ""){
                    titleInput.style.borderColor = "red";
                    console.log("titleInput empty");
                } else if (contentInput.value == "") {
                    contentInput.style.borderColor = "red";
                    console.log("typeInput empty");
                } else {
                    console.log("boucle not found");
                    console.log("LOGGED titleInput -> " , titleInput.value);
                    console.log("LOGGED contentInput -> ", contentInput.value)
                }
            } else {
                console.log("TEST-1 returned false")
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
            console.log("expChecking from header -> " , expCheck);
            const titleInput = document.getElementsByClassName("inputBar")[0];
            const typeInput = document.getElementsByClassName("inputBar")[1].value;
            console.log("typeINput.value -> " , typeInput);
            const contentInput = document.getElementsByClassName("inputBar")[2];
            const imgInput = document.getElementsByClassName("inputBar")[3];
            if (expCheck == "true") {
                // user is logged in
                this.loggedIn = true;
                console.log("loggedIn has been set to true");
                fetch(`http://localhost:4000/api/updatePost/${posts[postNumber].id_Post}`, {method: 'PUT',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userData.userData.token
                    },
                    body: JSON.stringify({title: titleInput.value, type: typeInput, content: contentInput.value, img: posts[postNumber].img, userId: userData.userData.userId})
                })
                this.$router.push({name: 'Home'})
            } else {
                // user is not logged in
                this.loggedIn = false;
                console.log("loggedIn has been set to false");
            }
        }
    },
    mounted() {
        // Checks if it is in use for creating a post or updating one
        const isUpdating = localStorage.getItem("isUpdating");
        console.log("LOGGED isUpdating -> ", isUpdating);
        console.log("LOGGED TYPEOF isUpdating -> ", typeof(isUpdating));
        console.log("LOGGED compar -> ", isUpdating == "true");
        if (isUpdating == "true") {
            console.log("updating Post");
            this.updating = true;
            const posts = JSON.parse(localStorage.getItem("postArray"));
            const postNumber = JSON.parse(localStorage.getItem("postNumber"));
            console.log("LOGGED post -> ", posts[postNumber]);
            const titleInput = document.getElementsByClassName("inputBar")[0];
            const typeInput = document.getElementsByClassName("inputBar")[1];
            const contentInput = document.getElementsByClassName("inputBar")[2];
            titleInput.value = posts[postNumber].title;
            typeInput.value = posts[postNumber].type;
            contentInput.innerHTML = posts[postNumber].content;
        } else {
            console.log("creating Post");
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
    color: blueviolet;
    font-size: large;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 800;
}
.dropDownMenu:hover{
    cursor: pointer;
}
.btn-classic{
    appearance: none;
    border: 2px rgb(155, 190, 255) solid;
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
    100% {background-color: rgb(155, 190, 255);}
}
.inputBar{
    appearance: none;
    border: 2px rgb(155, 190, 255) solid;
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
