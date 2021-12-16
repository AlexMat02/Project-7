<template>
    <div>
        <header>
            <div class="header__container">
                <router-link to="/"><img src="../assets/icon-left-font-monochrome-black.png" id="header1__header"></router-link>
                <input id="searchBar" placeholder="Search">
            </div>
            <div>
                <router-link to="/login"><button class="header__button" id="login"> Login </button></router-link>
                <router-link to="/signup"><button class="header__button" id="signup"> Sign Up </button></router-link>
                <button class="header__button" id="profil"> Profil </button>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "header1",
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
    object-fit: unset;
    width: 8rem;
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