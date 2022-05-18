<template>
    <div>
        <header>
            <div class="header__container">
                <router-link to="/"><img src="../assets/icon-left-font-monochrome-black.png" id="header1__header"></router-link>
            </div>
            <div>
                <router-link to="/login"><button class="header__button" id="login" v-if="loggedIn == false"> Login </button></router-link>
                <router-link to="/signup"><button class="header__button" id="signup" v-if="loggedIn == false"> Sign Up </button></router-link>
                <button class="header__button" id="logout" @click="LoggingOut()" v-if="loggedIn == true"> Logout </button>
                <router-link to="/profilExample"><button class="header__button" id="profil" @click="setProfil()" v-if="loggedIn == true"> Profil </button></router-link>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "header1",
    data() {
        return {
            loggedIn: false,
        }
    },
    methods: {
    setProfil() {
        console.log("setProfil has been called");
        const userData = JSON.parse(localStorage.getItem('userData'));
        localStorage.setItem("profilNumber", userData.userData.userId);
    },
    LoggingOut() {
        console.log("LoggingOut - 1");
        localStorage.removeItem("userData");
        console.log("LoggingOut - 2");
        this.$router.push({name: 'bufferPage'});
        console.log("LoggingOut - 3");
    } 
}, mounted() {
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
body{
    margin: 0px;
}
header {
    margin: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: aliceblue;
}
.header__button {
    background-color: white;
    border: 2px solid rgb(155, 190, 255);
    border-radius: 15px;
    font-size: large;
    padding: 10px;
    margin: 5px;
}
.header__button:hover {
    animation-name: buttonHover;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    cursor: pointer;
}
@keyframes buttonHover {
    0% {background-color: white;}
    100% {background-color: rgb(155, 190, 255);}
}
.header__container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 65vw;
}
#header1__header {
    margin-left: 5px;
    object-fit: cover;
    width: 12rem;
    height: 8rem;
}
#searchBar {
    width: 30vw;
    height: 35px;
    margin-left: 15px;
    margin-bottom: 5px;
    appearance: none;
    border: 2px solid rgb(155, 190, 255);
    border-radius: 20px;
}
#searchBar:hover {
    animation-name: searchBarHover;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
@keyframes searchBarHover {
    0% {background-color: white;}
    100% {background-color: rgb(155, 190, 255);}
}
</style>