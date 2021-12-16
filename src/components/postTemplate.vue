<template>
    <div class="mainContent__container">
        <div class="divContent">
            <div class="divContent__top">
                <router-link to="/profilExample"><img class="divContent__profilImg" src="../assets/logo.png"></router-link>
                <h2 class="divContent__header">Example Title</h2>
                <h2 class="divContent__header divContent__filter"> Fun </h2>
            </div>
            <div class="divContent__content">
                <img src="../assets/logo.png">
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto, harum expedita dolorum quo repellat vel labore magni, magnam ipsa, ducimus inventore est. Perferendis assumenda nam ex recusandae natus maiores.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur debitis qui, totam earum, dolore impedit atque exercitationem quidem eveniet facilis ipsam, doloribus sequi accusamus cum consequuntur tenetur nesciunt at. Consequatur.
            </p>
            <div class="divContent__top">
                <input class="input-classic" placeholder="Share your thoughts..." v-on:keyup.enter="commentCreator">
                <div class="divContent__btnstack">
                    <h3> {{ like }} </h3>
                    <button class="btn__like btn__like-green" v-on:click="postLiked"><h3> Like </h3></button>
                    <h3> {{ dislike }} </h3>
                    <button class="btn__like btn__like-red" v-on:click="postDisliked"><h3> Dislike </h3></button>
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
            like: 0,
            dislike: 0,
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
        postLiked() {
            this.like++
        },
        postDisliked() {
            this.dislike++
        },
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