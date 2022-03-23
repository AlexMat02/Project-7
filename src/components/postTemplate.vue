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
                <div class="divContent__btnstack">
                    <h3> {{ postLikes }} </h3>
                    <button class="btn__like btn__like-green" @click="LikeRequest()"><h3> Like </h3></button>
                    <h3> {{ postDislikes }} </h3>
                    <button class="btn__like btn__like-red" @click="DislikeRequest()"><h3> Dislike </h3></button>
                    <button class="btn__like btn__like-delete" v-if="loggedIn == true" @click="deleteRequest()"><h3> Delete</h3></button>
                    <button class="btn__like btn__like-update" v-if="loggedIn == true" ><h3> Update</h3></button>
                </div>
            </div>
            <img id="imgHTML">
        </div>
    </div>
</template>

<script>
export default {
    name: "postTemplate",
    data() {
        return {
            loggedIn: false,
            liked: false,
            disliked: false,
            postLikes: 0,
            postDislikes: 0,
        }
    },
    methods: {
        deleteRequest() {
            console.log("delete Post has been requested");
            const userData = JSON.parse(localStorage.getItem('userData'));
            const posts = JSON.parse(localStorage.getItem("postArray"));
            const postNumber = JSON.parse(localStorage.getItem("postNumber"));
            console.log("LOGGED -> " , posts[postNumber]);
            console.log("LOGGED -> " , posts[postNumber].User_id_User);
            fetch(`http://localhost:4000/api/posts/${posts[postNumber].User_id_User}`, {method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'authorization': userData.userData.token
            }})
            this.$router.push({name: 'Home'})
        },
        LikeRequest() {
            if (this.loggedIn == true) {
                console.log("like Request has been sent");
                const userData = JSON.parse(localStorage.getItem('userData'));
                const posts = JSON.parse(localStorage.getItem("postArray"));
                const postNumber = JSON.parse(localStorage.getItem("postNumber"));
                console.log("LOGGED -> " , posts[postNumber]);
                for (let n = 0; n < posts[postNumber].usersLiked.length; n++) {
                    // Checks inside the usersLiked array of the post if the user has already liked the post
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
                    .then(fetch("http://localhost:4000/api/posts", {method: 'GET', 
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'}})
                        .then(response => response.json())
                        .then(res => localStorage.setItem("postArray", JSON.stringify(res)))
                        .then(console.log(" localstorage item ->  " , JSON.parse(localStorage.getItem('postArray'))))
                    )
                    this.postLikes = posts[postNumber].likes;
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
                    .then(fetch("http://localhost:4000/api/posts", {method: 'GET', 
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'}})
                        .then(response => response.json())
                        .then(res => localStorage.setItem("postArray", JSON.stringify(res)))
                        .then(console.log(" localstorage item ->  " , JSON.parse(localStorage.getItem('postArray'))))
                    )
                    this.postLikes = posts[postNumber].likes;
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
                for (let n = 0; n < posts[postNumber].usersDisliked.length; n++) {
                    // Checks inside the usersDisliked array of the post if the user has already liked the post
                    if (posts[postNumber].usersDisliked[n] == userData.userData.userId) {
                        console.log("userData.userData.userId -> " , userData.userData.userId);
                        console.log("posts[MACHIN].machin -> " , posts[postNumber].usersDisliked[n]);
                        this.disliked = true;  
                        console.log("this.disliked set to true");
                    }
                }
                if (this.disliked == true) {
                    // #WORK check if this part works
                    fetch(`http://localhost:4000/api/likedPost/${posts[postNumber]._id}`, {method: 'POST',
                    headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': userData.userData.token
                    },
                    body: JSON.stringify({like: 0, post: posts[postNumber], userId: userData.userData.userId})
                    })
                    .then(fetch("http://localhost:4000/api/posts", {method: 'GET', 
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'}})
                        .then(response => response.json())
                        .then(res => localStorage.setItem("postArray", JSON.stringify(res)))
                        .then(console.log(" localstorage item ->  " , JSON.parse(localStorage.getItem('postArray'))))
                    )
                   this.postDislikes = posts[postNumber].dislikes;
                } else {
                    fetch(`http://localhost:4000/api/likedPost/${posts[postNumber]._id}`, {method: 'POST',
                    headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': userData.userData.token
                    },
                    body: JSON.stringify({like: -1, post: posts[postNumber], userId: userData.userData.userId})
                    })
                    .then(fetch("http://localhost:4000/api/posts", {method: 'GET', 
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'}})
                        .then(response => response.json())
                        .then(res => localStorage.setItem("postArray", JSON.stringify(res)))
                        .then(console.log(" localstorage item ->  " , JSON.parse(localStorage.getItem('postArray'))))
                    )
                   this.postDislikes = posts[postNumber].dislikes;
                }
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
        const imgHTML = document.getElementById("imgHTML");
        this.postLikes = posts[postNumber].likes;
        this.postDislikes = posts[postNumber].dislikes;
        title.innerHTML = posts[postNumber].title;
        type.innerHTML = posts[postNumber].type;
        text.innerHTML = posts[postNumber].content;
        if (posts[postNumber].img == undefined || posts[postNumber].img == null) {
            console.log("no img avaible for this post")
        } else {
            imgHTML.src = posts[postNumber].img;
        }
        // getting userData and checking if user's logged in
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.$store.dispatch('expChecker' , {userData})
        const expCheck = localStorage.getItem('expChecking');
        console.log("expChecking -> " , expCheck)
        console.log("LOGGED userData -> " , userData);
        console.log("LOGGED posts -> " , posts[postNumber]);
        if (userData != null && posts[postNumber].User_id_User == userData.userData.userId) {
            console.log("user has created this")
            if (expCheck == "true") {
                // user is logged in
                this.loggedIn = true;
                console.log("loggedIn set to true");
                // This part is for unread posts
                // fetch the table of all of the post sighted
                fetch(`http://localhost:4000/auth/whichPostsSighted/${userData.userData.userId}`, {method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': userData.userData.token}})
                .then(response => response.json())
                .then(res => localStorage.setItem("whichPostsSighted", JSON.stringify(res)))
                .then(console.log("PostsSighted table -> " , JSON.parse(localStorage.getItem("whichPostsSighted"))));
                let whichPostsSighted = JSON.parse(localStorage.getItem("whichPostsSighted"));
                // if the array whichPostsSighted is empty it adds the post to the post sighted
                if (whichPostsSighted.length == 0) {
                    fetch(`http://localhost:4000/auth/postSighted`, {method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': userData.userData.token},
                        body: JSON.stringify({post: posts[postNumber], userId: userData.userData.userId})
                    })
                } else {
                    let seen = false;
                    // Checks every data inside the seen table
                    for (let b = 0; b < whichPostsSighted.length; b++) {
                        console.log("reading b for the loop -> ", b);
                        // if the id_Post of the post that is displayed is the same as
                        // the Post_id_Post inside the seen table that means the post has been sighted
                        if (whichPostsSighted[b].Post_id_Post == posts[postNumber].id_Post) {
                            seen = true;
                        }
                        console.log("LOGGED let seen -> ", seen)
                    }
                    if (seen == false) {
                        fetch(`http://localhost:4000/auth/postSighted`, {method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': userData.userData.token},
                        body: JSON.stringify({post: posts[postNumber], userId: userData.userData.userId})
                        })
                    }
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
.btn__like-update{
    background-color: rgb(92, 113, 230);
}
.btn__like-update:hover{
    background-color: rgb(125, 142, 243);
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