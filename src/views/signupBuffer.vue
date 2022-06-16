<template>
    <div lang="en">
        <h2>Please wait</h2>
        <h2>Connecting ...</h2>
    </div>
</template>

<script>
export default {
    data() {

    },
    mounted() {
        // Check if the user is logged in (useful for other)
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.$store.dispatch('expChecker' , {userData});
        // check if user is logged in
        const expCheck = localStorage.getItem('expChecking');
        if (userData === null) {
            this.$router.push({name: 'loginPage'});
            return
        }
        setTimeout(1000)
        const logs = JSON.parse(localStorage.getItem("signupLogs"));
        const userInfos = {
            username: logs.username,
            password: logs.password
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
            if (dataHandler.userData.message) {
                throw 'cancel'
            }
        })
        .then(res => localStorage.setItem("userData" , JSON.stringify(dataHandler))) // not returning anything
        .then ( () => {
            this.$router.push({name: 'Home'})
        })
        .catch( (err) => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>