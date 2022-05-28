<template>   
    <div>
        <header-1/>
            <div class="mainContent__container">
            <div class="divContent">
            <h1 class="linkFIX"> Sign Up </h1>
            <div>
                <div>
                    <label for="email"> Email </label>
                    <input id="email" v-model="email" class="inputBar" type="email">
                </div>
                <div id="pwDiv">
                    <label for="pwInput"> Password </label>
                    <input id="pwInput" v-model="password" type="password" class="inputBar">
                </div>
                <div>
                    <label for="username"> Username </label>
                    <input id="username" name="username" v-model="username" class="inputBar">
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
        pwStrenght() {
            sessionStorage.setItem("verify", "false");
            let pwDiv = document.getElementById("pwDiv");
            // Check if error msg, if there is delete it so it doesn't add up
            if (document.getElementById("pwMsg") != undefined && document.getElementById("pwMsg") != null) {
                pwDiv.removeChild(document.getElementById("pwMsg"))
            }
            let pw = document.getElementById("pwInput").value;
            let pwMsg = document.createElement("h2");
            pwMsg.style.color = "red";
            pwMsg.id = "pwMsg"
            // Checks if password is too short
            if (pw.length < 8) {
                pwMsg.innerText = "Password is too short";
                pwDiv.appendChild(pwMsg);
                return
            } else {
                // Put password into an array to verify every character
                let pwArray = [];
                for (let x = 0; x < pw.length; x++) {
                    pwArray.push(pw.slice(x, x+1))
                }
                let verify = {
                    number: false,
                    special: false,
                    upper: false
                }
                for (let y = 0; y < pw.length; y++) {
                    // Check if one character of the password is a Number
                    if (/^[0-9]*$/.test(pwArray[y]) == true) {
                        verify.number = true;
                    }
                    // Check if one character of the password is a special character
                    if (/^[a-zA-Z0-9]*$/.test(pwArray[y]) == false) {
                        verify.special = true;
                    }
                    // Check if one character of the password is in Uppercase
                    if (pwArray[y].toUpperCase() == pwArray[y] && /^[0-9]*$/.test(pwArray[y]) == false && /^[a-zA-Z0-9]*$/.test(pwArray[y]) == true) {
                        console.log("Upperletter spotted ", y, " character -> ", pwArray[y])
                        verify.upper = true;
                    }
                }
                // If password doesn't meet the requirement tell the user what's wrong and stop the request
                if (verify.number == false) {
                    pwMsg.innerText = "Your password needs to contain a number"
                    pwDiv.appendChild(pwMsg);
                    sessionStorage.setItem("verify", "false");
                    return
                } else if (verify.special == false) {
                    pwMsg.innerText = "Your password needs to contain a special character"
                    pwDiv.appendChild(pwMsg);
                    sessionStorage.setItem("verify", "false");
                    return
                } else if (verify.upper == false) {
                    pwMsg.innerText = "Your password needs to contain a capitalized character"
                    pwDiv.appendChild(pwMsg);
                    sessionStorage.setItem("verify", "false");
                    return
                } else if (verify.number == true && verify.special == true && verify.upper == true) {
                    sessionStorage.setItem("verify", "true");
                }
            }
        },
        validateInput(){
            if (this.email !== "" && this.password !== "" && this.username !== "") {
                return true
            } else {
                return false
            }
        },
        createAccount(){
            let verified = "";
            // Checks if the email given by the user is built like a real email
            const emailToValidate = this.email;
            const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            console.log(emailRegexp.test(emailToValidate));
            if (emailRegexp.test(emailToValidate) == false ) {
                return
            } else {
                verified += "1"
            }
            this.pwStrenght();
            if (sessionStorage.getItem("verify") === "false") {
                console.log("not through")
            } else if (sessionStorage.getItem("verify") === "true") {
                verified += "2"
            }
            if (this.username != "") {
                verified += "3"
            }
            if (verified === "123") {
                this.$store.dispatch("createAccount", {email: this.email, password: this.password, username: this.username})
                this.$router.push({name: "signupBuffer"});
            }
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
    border: 2px #D1515A solid;
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
    100% {background-color: #D1515A;}
}
.inputBar{
    appearance: none;
    border: 2px #D1515A solid;
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
label{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}

</style>