<template>
    <div>
        <header-1/>
            <div class="mainContent__container">
            <div class="divContent">
            <h1 class="linkFIX"> Sign Up </h1>
            <div>
                <div>
                    <h2> Email </h2>
                    <input v-model="email" class="inputBar">
                </div>
                <div>
                    <h2> Password </h2>
                    <input v-model="password" type="password" class="inputBar">
                </div>
                <div>
                    <h2> Username </h2>
                    <input v-model="username" class="inputBar">
                </div>
            </div>
            <button class="btn-classic" v-on:click="createAccount()"> <h3> Sign Up </h3> </button>
        </div>
    </div>
    </div>
</template>

<script>
import header1 from '@/components/header1.vue'

export default({
    name: "signupPage",
    data() {
        return {
            email: "",
            password: "",
            username: "",
        }
    },
    methods: {
        validateInput(){
            if (this.email !== "" && this.password !== "" && this.username !== "") {
                return true
            } else {
                return false
            }
        },
        createAccount(){
            console.log("createAccount function has been read")
            this.$store.dispatch("createAccount", {email: this.email, password: this.password, username: this.username})
            this.$router.push({name: 'Home'})
        }
    },
    components: {
        header1,
    }
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