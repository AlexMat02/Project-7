<template>
    <div>
        <header-1/>
        <div class="mainContent__container">
            <div class="divContent">
                <h1 class="linkFIX"> Login </h1>
                <div>
                    <div>
                        <h2> Username </h2>
                        <input class="inputBar">
                    </div>
                    <div>
                        <h2> Password </h2>
                        <input class="inputBar">
                    </div>
                </div>
                <button class="btn-classic" @click="login()"> <h3>LOGIN</h3> </button>
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
            console.log("logged username and password -> " , emailInput.value, passwordInput.value);
            const userInfos = {
                email: emailInput.value,
                password: passwordInput.value,
            }
            console.log("LOGGED BEFORE TEST -> " , test)
            let test = [];
            console.log("LOGGED TEST BEFORE PROMISE -> " , test)
            console.log("LOGGED TEST Before PROMISE NATURE -> " , typeof(test))
            fetch("http://localhost:4000/auth/login", {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify(userInfos)})
            .then(response => response.json())
            .then(res => test.push(res))
            .then(console.log( "logged test var -> " , test))
            .then( function(){
                if (test.length > 0) {
                    console.log("yes -> " , test.length)
                } else {
                    console.log("no")
                }
            })
            console.log("LOGGED TEST AFTER PROMISE -> " , test)
            console.log("LOGGED TEST AFTER PROMISE NATURE -> " , typeof(test))
            console.log("LOGGED OBJECT KEYS -> " , Object.keys(test))
            console.log("LOGGED TEST AFTER PROMISE-KEYS -> " , test)
            console.log("LOGGED TEST AFTER PROMISE NATURE -> " , typeof(test))
            console.log('login request sent');
            this.$store.dispatch("userIdSetter" , test)
            // Doesnt send the correct information
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