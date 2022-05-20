<template>
    <div>
        <h2>Please wait</h2>
        <h2>Connecting ...</h2>
    </div>
</template>

<script>
export default {
    data() {

    },
    mounted() {
        const logs = JSON.parse(localStorage.getItem("signupLogs"));
        console.log("Logged logs -> ", logs)
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
            console.log("LOGGEd data -> ", dataHandler.userData);
            if (dataHandler.userData.message) {
                console.log("wrong logs")
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
}
</script>

<style>

</style>