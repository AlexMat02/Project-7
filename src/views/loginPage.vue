<template>
    <div>
        <header-1/>
        <div class="mainContent__container">
            <div class="divContent">
                <h1 class="linkFIX"> Login </h1>
                <div>
                    <div>
                        <h2> Username </h2>
                        <input id="username" class="inputBar">
                    </div>
                    <div>
                        <h2> Password </h2>
                        <input id="password" type="password" class="inputBar">
                    </div>
                </div>
                <button class="btn-classic" @click="login()"> <h3>LOGIN</h3> </button>
                <div id="errDiv">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header1 from '@/components/header1.vue'

export default({
    name: "loginPage",
    components: {
        header1,
    },
    methods: {
        login() {
            const emailInput = document.getElementsByClassName("inputBar")[0];
            const passwordInput = document.getElementsByClassName("inputBar")[1];
            const userInfos = {
                username: emailInput.value,
                password: passwordInput.value,
            }
            const currentDate = new Date();
            const expDate = currentDate.getTime() + 60000;
            const dataHandler = {'Exp' : expDate}
            fetch("http://localhost:4000/auth/login", {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify(userInfos)})
            .then(response => response.json())
            .then(res => dataHandler.userData = res)
            .then( () => {
                console.log("LOGGEd data -> ", dataHandler.userData);
                if (dataHandler.userData.message) {
                    console.log("wrong logs")
                    const usernameInput = document.getElementById("username");
                    const passwordInput = document.getElementById("password");
                    const errDiv = document.getElementById("errDiv");
                    let errMsg = document.createElement("h2");
                    errMsg.innerHTML = "Wrong Username or Password"
                    errMsg.style.color = "red";
                    usernameInput.style.borderColor = "red";
                    passwordInput.style.borderColor = "red";
                    errDiv.appendChild(errMsg);
                    throw 'cancel'
                }
            })
            .then(res => localStorage.setItem("userData" , JSON.stringify(dataHandler))) // not returning anything
            .then(console.log( "logged localstorage -> " , JSON.parse(localStorage.getItem('userData'))))
            .then ( () => {
                this.$router.push({name: 'Home'})
            })
            .catch( () => {
                console.log("error")
                console.log("YEET");
            })
        }
    },
})
</script>

<style>
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