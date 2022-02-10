<template>
    <div class="mainContent__container">
        <div class="divContent">
            <div class="divContent__top">
                <router-link to="/profilExample"><img class="divContent__profilImg" src="../assets/logo.png"></router-link>
                <h2 class="divContent__header" id="postTitle">Example Title</h2>
                <h2 class="divContent__header divContent__filter" id="postType"> Fun </h2>
            </div>
            <p id="postText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto, harum expedita dolorum quo repellat vel labore magni, magnam ipsa, ducimus inventore est. Perferendis assumenda nam ex recusandae natus maiores.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur debitis qui, totam earum, dolore impedit atque exercitationem quidem eveniet facilis ipsam, doloribus sequi accusamus cum consequuntur tenetur nesciunt at. Consequatur.
            </p>
            <div class="divContent__top">
                <input class="input-classic" placeholder="Share your thoughts..." v-on:keyup.enter="commentCreator">
                <div class="divContent__btnstack">
                    <h3> {{ postLikes }} </h3>
                    <button class="btn__like btn__like-green" @click="LikeRequest()"><h3> Like </h3></button>
                    <h3> {{ postDislikes }} </h3>
                    <button class="btn__like btn__like-red" @click="DislikeRequest()"><h3> Dislike </h3></button>
                    <button class="btn__like btn__like-delete" v-if="loggedIn == true" @click="deleteRequest()"><h3> Delete</h3></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "postTemplate",
    data() {
        return {
            commentText: "",
            loggedIn: false,
            liked: false,
            disliked: false,
            postLikes: 0,
            postDislikes: 0,
        }
    },
    methods: {
        commentCreator() {
            const mainDiv = document.getElementsByClassName("divContent")[0];
            const pCreator = document.createElement("p");
            const inputValue = document.getElementsByClassName("input-classic")[0];
            pCreator.innerText = inputValue.value;
            pCreator.classList.add("pComment");
            if (inputValue.value == "") {
                console.log("empty input");
            } else {
                mainDiv.appendChild(pCreator);
                inputValue.value = "";
            }
        },
        deleteRequest() {
            console.log("delete Post has been requested");
            const userData = JSON.parse(localStorage.getItem('userData'));
            const posts = JSON.parse(localStorage.getItem("postArray"));
            const postNumber = JSON.parse(localStorage.getItem("postNumber"));
            console.log("LOGGED -> " , posts[postNumber]);
            fetch(`http://localhost:4000/api/posts/${posts[postNumber]._id}`, {method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'authorization': userData.userData.token
            }})
            this.$router.push({name: 'Home'})
        },
        LikeRequest() {
            /* Problem is -> localstorage data is not uploaded so it sends in the wrong data */
            if (this.loggedIn == true) {
                console.log("like Request has been sent");
                const userData = JSON.parse(localStorage.getItem('userData'));
                const posts = JSON.parse(localStorage.getItem("postArray"));
                const postNumber = JSON.parse(localStorage.getItem("postNumber"));
                console.log("LOGGED -> " , posts[postNumber]);
                for (let n = 0; n < posts[postNumber].usersLiked.length; n++) {
                    // Checks inside the usersLiked array of the post if the user has already liked the post
                    // console.log this loop because it doesn't send the right thing to the backend
                    if (posts[postNumber].usersLiked[n] == userData.userData.userId) {
                        console.log("userData.userData.userId -> " , userData.userData.userId);
                        console.log("posts[MACHIN].machin -> " , posts[postNumber].usersLiked[n]);
                        this.liked = true;  
                        console.log("this.liked set to true");
                    }
                }
                console.log("LOGGED this.liked -> " , this.liked);
                if (this.liked == true) {
                    console.log("fetch request like 0 sent");
                    fetch(`http://localhost:4000/api/likedPost/${posts[postNumber]._id}`, {method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userData.userData.token
                    },
                        body: JSON.stringify({like: 0, post: posts[postNumber], userId: userData.userData.userId})
                    })
                } else {
                    console.log("fetch request like 1 sent");
                    fetch(`http://localhost:4000/api/likedPost/${posts[postNumber]._id}`, {method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userData.userData.token
                    },
                        body: JSON.stringify({like: 1, post: posts[postNumber], userId: userData.userData.userId})
                    })
                }
            } else {
                console.log("not connected")
            }
        },
        DislikeRequest(){
            if (this.loggedIn == true) {
                console.log("like Request has been sent");
                const userData = JSON.parse(localStorage.getItem('userData'));
                const posts = JSON.parse(localStorage.getItem("postArray"));
                const postNumber = JSON.parse(localStorage.getItem("postNumber"));
                console.log("LOGGED -> " , posts[postNumber]);
                fetch(`http://localhost:4000/api/likedPost/${posts[postNumber]._id}`, {method: 'POST',
                headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'authorization': userData.userData.token
            },
             body: JSON.stringify({like: -1, post: posts[postNumber], userId: userData.userData.userId})
            })
            } else {
                console.log("not connected")
            }
        }
    },
    mounted() {
        // getting post data from backend
        fetch("http://localhost:4000/api/posts", {method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(res => localStorage.setItem("postArray", JSON.stringify(res)))
        .then(console.log(" localstorage item ->  " , JSON.parse(localStorage.getItem('postArray'))))
        let posts = JSON.parse(localStorage.getItem('postArray'));
        // getting the index of the post that the user chose
        console.log("LOGGED postNumber -> " , JSON.parse(localStorage.getItem("postNumber")));
        const postNumber = JSON.parse(localStorage.getItem("postNumber"));
        console.log("LOGGED const postNumber -> " , postNumber);
        // setting up the correct data to display
        const title = document.getElementById("postTitle");
        const type = document.getElementById("postType");
        const text = document.getElementById("postText");
        this.postLikes = posts[postNumber].likes;
        this.postDislikes = posts[postNumber].dislikes;
        title.innerHTML = posts[postNumber].title;
        type.innerHTML = posts[postNumber].type;
        text.innerHTML = posts[postNumber].content;
        // getting userData and checking if user's logged in
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.$store.dispatch('expChecker' , {userData})
        const expCheck = localStorage.getItem('expChecking');
        console.log("expChecking -> " , expCheck)
        console.log("LOGGED userData -> " , userData);
        if (userData != null && posts[postNumber].userId == userData.userData.userId) {
            console.log("user has created this")
            if (expCheck == "true") {
                // user is logged in
                this.loggedIn = true;
                console.log("loggedIn set to true");
                // This part is for unread posts
                /// fetch the userData
                // fetches all User Data
                fetch("http://localhost:4000/auth/users", {method: 'GET', 
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'}})
                .then(response => response.json())
                .then(res => localStorage.setItem("allUserArray", JSON.stringify(res)))
                .then(console.log("AllUsers Array -> " , JSON.parse(localStorage.getItem("allUserArray"))))
                let allUserArray = JSON.parse(localStorage.getItem("allUserArray"));
                // find the correct user
                let correctUserIndex = 0;
                for (let a = 0; a < allUserArray.length; a++) {
                    if (allUserArray[a]._id == userData.userData.userId) {
                        correctUserIndex = a;
                    }
                }
                /// use a for loop to check if the user has seen this post
                let postSighted = false;
                console.log("postSighted BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
                console.log("machin machin -> " , allUserArray[correctUserIndex].postsSighted);
                for (let b = 0; b < allUserArray[correctUserIndex].postsSighted.length; b++) {
                    console.log("read for loop b");
                    if (allUserArray[correctUserIndex].postsSighted[b] == posts[postNumber]._id) {
                        // user has seen the post
                        postSighted = true;
                        console.log("postSighted = true");
                    }
                }
                /// if he did do nothing
                /// if he didnt add it inside postsSighted Array
                if (postSighted === false) {
                    console.log("postSighted = false");
                    console.log("logged userData.userData.userId -> " , userData.userData.userId);
                    fetch(`http://localhost:4000/auth/postSighted/${userData.userData.userId}`, {method: 'POST', 
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userData.userData.token}
                        ,body: JSON.stringify({post: posts[postNumber]})})
                    .then(response => response.json())
                    .then(res => console.log("LOGGED ANSWER -> " , res))
                }
            } else {
                // user is not logged in
                this.loggedIn = false;
                console.log("loggedIn set to false");
            }
        } else {
            console.log("not the right user or not connected")
        }
    }
}
</script>

<style>
.input-classic{
    width: 65vw;
    margin: 5px;
    border-radius: 1rem;
    border: 1px solid black;
}
.input-classic:hover{
    background-color: whitesmoke;
}
.btn__like{
    appearance: none;
    margin: 5px;
    border: 1px solid black;
    border-radius: 1rem;
    width: 4rem;
    box-sizing: border-box;
}
.btn__like-red{
    background-color: rgb(209, 69, 69);
}
.btn__like-red:hover{
    background-color: lightcoral;
    cursor: pointer;
}
.btn__like-green{
    background-color: rgb(60, 209, 60);
}
.btn__like-green:hover{
    background-color: lightgreen;
    cursor: pointer;
}
.btn__like-delete{
    background-color: purple;
}
.btn__like-delete:hover{
    background-color: rgb(173, 0, 173);
    cursor: pointer;
}
.pComment{
    border: 1px solid black;
    border-radius: 1em;
    margin: 1em;
    padding: 1em;
}
.divContent__btnstack{
    display: flex;
}
</style>