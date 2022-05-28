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
        setTimeout(1000)
        const logs = JSON.parse(localStorage.getItem("signupLogs"));
        const userInfos = {
            username: logs.username,
            password: logs.password
        }
        console.log(userInfos)
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