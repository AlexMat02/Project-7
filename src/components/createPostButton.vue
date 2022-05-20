<template>
    <router-link v-if="loggedIn == true" to="/postCreationPage"><button class="btn__postCreate"> Post </button></router-link>
</template>

<script>
export default {
    name: "createPostButton",
    data(){
        return { 
            loggedIn: false,
        }
    },
    methods: {
    },
    mounted(){
        // check if user is logged in
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.$store.dispatch('expChecker' , {userData});
        const expCheck = localStorage.getItem('expChecking');
        console.log("expChecking from header -> " , expCheck);
        if (expCheck == "true") {
            // user is logged in
            this.loggedIn = true;
            console.log("loggedIn has been set to true");
        } else {
            // user is not logged in
            this.loggedIn = false;
            console.log("loggedIn has been set to false");
        }
    }
}
</script>

<style>
.btn__postCreate{
    appearance: none;
    border: 2px #D1515A solid;
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
    100% {background-color: #D1515A;}
}
</style>
