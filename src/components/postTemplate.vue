<template>
    <div class="mainContent__container">
        <div class="divContent">
            <div class="divContent__top">
                <router-link to="/profilExample" id="postAuthor" class="divContent__header"><h2 ></h2></router-link>
                <h2 class="divContent__header" id="postTitle">Example Title</h2>
                <h2 class="divContent__header divContent__filter" id="postType"> Fun </h2>
            </div>
            <p id="postText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto, harum expedita dolorum quo repellat vel labore magni, magnam ipsa, ducimus inventore est. Perferendis assumenda nam ex recusandae natus maiores.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur debitis qui, totam earum, dolore impedit atque exercitationem quidem eveniet facilis ipsam, doloribus sequi accusamus cum consequuntur tenetur nesciunt at. Consequatur.
            </p>
            <div class="divContent__btn">
                <div class="divContent__btnstack">
                    <h3> {{ postLikes }} </h3>
                    <button class="btn__like btn__like-green" @click="LikeRequest()"><h3> Like </h3></button>
                    <h3> {{ postDislikes }} </h3>
                    <button class="btn__like btn__like-red" @click="DislikeRequest()"><h3> Dislike </h3></button>
                    <button class="btn__like btn__like-delete" v-if="loggedIn == true" @click="deleteRequest()"><h3> Delete</h3></button>
                    <button class="btn__like btn__like-update" v-if="loggedIn == true" @click="updateRequest()"><h3> Update</h3></button>
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
            post: {
                image: ''
            },
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
            fetch(`http://localhost:4000/api/posts/${posts[postNumber].id_Post}`, {method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'authorization': userData.userData.token
            }})
            this.$router.push({name: 'Home'})
        },
        updateRequest() {
            localStorage.setItem("isUpdating", true);
            this.$router.push({name: 'postCreationPage'})
        },
        LikeRequest() {
            if (this.loggedIn == true) {
                console.log("like Request has been sent");
                const userData = JSON.parse(localStorage.getItem('userData'));
                const posts = JSON.parse(localStorage.getItem("postArray"));
                const postNumber = JSON.parse(localStorage.getItem("postNumber"));
                console.log("LOGGED -> " , posts[postNumber]);
                // Get which posts liked by the user
                fetch(`http://localhost:4000/auth/whichPostsLiked/${userData.userData.userId}`, {method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userData.userData.token}})
                .then(response => response.json())
                .then(res => localStorage.setItem("whichPostsLiked", JSON.stringify(res)))
                .then(console.log("PostsLiked table -> " , JSON.parse(localStorage.getItem("whichPostsLiked"))))
                .then( () => {
                    let whichPostsLiked = JSON.parse(localStorage.getItem("whichPostsLiked"));
                    // Need to check if the user has already liked the post
                    if (whichPostsLiked.length == 0 || whichPostsLiked == null) {
                        this.liked = false;
                        console.log("this.liked set to false")
                    } else {
                        for (let n = 0; n < whichPostsLiked.length; n++) {
                            // This if statement checks if the post is inside the database
                            if (whichPostsLiked[n].Post_id_Post == posts[postNumber].id_Post) {
                                let goodPost = whichPostsLiked[n];
                                if (goodPost.Liked === 1) {
                                    this.liked = true;
                                    console.log("this.liked set to true");
                                }
                            }
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
                        this.liked = false;
                        if (this.postLikes != 0) {
                            this.postLikes -= 1;
                        } 
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
                        this.postLikes += 1;
                        this.liked = true;
                    }
                })
                
            } else {
                console.log("not connected")
            }
        },
        DislikeRequest(){
            if (this.loggedIn == true) {
                console.log("Dislike Request has been sent");
                const userData = JSON.parse(localStorage.getItem('userData'));
                const posts = JSON.parse(localStorage.getItem("postArray"));
                const postNumber = JSON.parse(localStorage.getItem("postNumber"));
                console.log("LOGGED -> " , posts[postNumber]);
                // Get which posts liked by the user
                fetch(`http://localhost:4000/auth/whichPostsLiked/${userData.userData.userId}`, {method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userData.userData.token}})
                .then(response => response.json())
                .then(res => localStorage.setItem("whichPostsLiked", JSON.stringify(res)))
                .then(console.log("PostsLiked table -> " , JSON.parse(localStorage.getItem("whichPostsLiked"))))
                .then( () => {
                    let whichPostsLiked = JSON.parse(localStorage.getItem("whichPostsLiked"));
                    // Need to check if the user has already disliked the post
                    if (whichPostsLiked.length == 0 || whichPostsLiked == null) {
                        this.disliked = false;
                        console.log("this.disliked set to false")
                    } else {
                        for (let n = 0; n < whichPostsLiked.length; n++) {
                            // This if statement checks if the post is inside the database
                            if (whichPostsLiked[n].Post_id_Post == posts[postNumber].id_Post) {
                                let goodPost = whichPostsLiked[n];
                                if (goodPost.Liked === -1) {
                                    this.disliked = true;
                                    console.log("this.disliked set to true");
                                }
                            }
                        }
                    }
                    console.log("LOGGED this.disliked -> " , this.disliked);
                    if (this.disliked == true) {
                        console.log("fetch request like 0 sent");
                        fetch(`http://localhost:4000/api/likedPost/${posts[postNumber]._id}`, {method: 'POST',
                        headers: {
                            'Accept' : 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': userData.userData.token
                        },
                            body: JSON.stringify({like: 0, post: posts[postNumber], userId: userData.userData.userId})
                        })
                        this.disliked = false;
                        if (this.postDislikes != 0) {
                            this.postDislikes -= 1;
                        } 
                    } else {
                        console.log("fetch request like -1 sent");
                        fetch(`http://localhost:4000/api/likedPost/${posts[postNumber]._id}`, {method: 'POST',
                        headers: {
                            'Accept' : 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': userData.userData.token
                        },
                            body: JSON.stringify({like: -1, post: posts[postNumber], userId: userData.userData.userId})
                        })
                        .then( () => {
                            this.postDislikes += 1;
                            this.disliked = true;
                            console.log("seen1-1-1-1")
                        })
                    }
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
        const author = document.getElementById("postAuthor");
        const imgHTML = document.getElementById("imgHTML");
        // This part is here to display how many likes a post has
        fetch(`http://localhost:4000/api/howManyLikes/${posts[postNumber].id_Post}`, {method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(res => localStorage.setItem("howManyLikes", JSON.stringify(res)))
        .then(console.log(JSON.parse(localStorage.getItem("howManyLikes"))))
        .then( () => {
            let howManyLikes = JSON.parse(localStorage.getItem("howManyLikes"))
            console.log("howManyLikes -> ", howManyLikes);
            for (let WW = 0; WW < howManyLikes.length; WW++) {
                if (howManyLikes[WW].Liked === 1) {
                    this.postLikes += 1;
                }
                if (howManyLikes[WW].Liked === -1) {
                    this.postDislikes += 1;
                }
            }
        })
        // display correct data of the post
        title.innerHTML = posts[postNumber].title;
        type.innerHTML = posts[postNumber].type;
        text.innerHTML = posts[postNumber].content;
        console.log("LOGGED posts[postNumber].img -> ", posts[postNumber].img);
        console.log("IF TRUE IS BLOB " ,posts[postNumber].img instanceof Blob)
        imgHTML.src = posts[postNumber].img;
        // get the post's author
        const allUsersArray = JSON.parse(localStorage.getItem("allUserArray"))
        console.log("allUsersArray -> ", allUsersArray);
        let authorName = ""
        for (let f = 0; f < allUsersArray.length; f++) {
            if (allUsersArray[f].id_User == posts[postNumber].User_id_User) {
                authorName = allUsersArray[f].username;
            }
        }
        author.innerHTML = authorName;
        if (posts[postNumber].img == undefined || posts[postNumber].img == null) {
            console.log("no img avaible for this post")
        }/*  else {
            imgHTML.src = posts[postNumber].img;
        } */
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
.divContent__btn{
    display: flex;
    flex-direction: row;
    padding: 3px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    justify-content: center;
}
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