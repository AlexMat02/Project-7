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
                    <input v-model="password" class="inputBar">
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
        }
    },
    components: {
        header1,
    }
})
</script>

<style>

</style>