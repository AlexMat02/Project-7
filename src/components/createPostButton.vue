<template>
    <router-link to="/postCreationPage"><button class="btn__postCreate"> Post </button></router-link>
</template>

<script>
export default {
    name: "createPostButton",
    data(){
        return { 
        }
    },
    methods: {
    }
}
</script>

<style>
.btn__postCreate{
    appearance: none;
    border: 2px rgb(155, 190, 255) solid;
    border-radius: 30%;
    background-color: white;
    position: fixed;
    width: 8vw;
    height: 8vh;
    margin-left: 40vw;
    bottom: 50px;
    font-size: larger;
}
.btn__postCreate:hover{
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
</style>
