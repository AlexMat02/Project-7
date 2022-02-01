<template>
    <div class="profil">
        <div class="profilContainer">
            <div class="profilContainer__header">
                <img class="profilContainer__img" src="../assets/logo.png">
                <h2 id="profilUsername">Profil Name</h2>
            </div>
            <div class="profilContainer__description">
                <p class="editableP"> {{ editingText }} </p>
            </div>
            <button v-if="this.loggedIn == true" class="btn-classic btn__reverse" @click="editing"><h3> Edit </h3></button>
            <button v-if="this.loggedIn == true" class="btn-classic btn__reverse"><h3> Delete Profil </h3></button>
        </div>   
    </div>
</template>

<script>
export default {
    name: "profilTemplate",
    data(){
        return{
            edit : "",
            loggedIn: false,
            isEditing: false,
            editingText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti assumenda reprehenderit debitis. Ipsam necessitatibus blanditiis quas soluta libero illo, asperiores nam, distinctio, quia animi ullam similique beatae doloribus vitae hic.",
        }
    },
    methods: {
        editingSwitch(){
            const inputEdit = document.getElementsByTagName("input")[1];
            const container = document.getElementsByClassName("profilContainer__description")[0];
            const pCreator = document.createElement("p");
            pCreator.classList.add("editableP");
            this.editingText = inputEdit.value;
            pCreator.innerText = this.editingText;
            container.removeChild(inputEdit);
            container.appendChild(pCreator);
            this.isEditing = false;
        },
        editing(){
            if (this.isEditing === false) {
                this.isEditing = true;
                const pProfil = document.getElementsByClassName("editableP");
                const container = document.getElementsByClassName("profilContainer__description")[0];
                const inputCreator = document.createElement("input");
                inputCreator.classList.add("input");
                this.editingText = pProfil[0].innerText;
                inputCreator.value = this.editingText;
                container.removeChild(pProfil[0]);
                container.appendChild(inputCreator);
            } else if (this.isEditing === true) {
                this.editingSwitch();
            }
            
        },
    },
    mounted(){
        const profilId = localStorage.getItem("profilId");
        console.log("LOGGED profilId -> " , profilId);
        fetch("http://localhost:4000/auth/users", {method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(res => localStorage.setItem("userArray", JSON.stringify(res)))
        .then(console.log("LOGGED array of all users -> " , JSON.parse(localStorage.getItem("userArray"))));
        const userArray = JSON.parse(localStorage.getItem("userArray"));
        const correctProfil = localStorage.getItem("profilNumber");
        console.log("LOGGED correctProfil -> " , correctProfil);
        let profilIndex = 0;
        for (let n = 0; n < userArray.length; n++) {
            if (userArray[n]._id == correctProfil) {
                profilIndex = n;
                console.log("LOGGED profilIndex -> " , profilIndex);
            } else {
                console.log("not this one")
                console.log("LOGGED WHILE profilIndex -> " , profilIndex);
            }
        }
        console.log("LOGGED userArray[profilIndex] -> " , userArray[profilIndex])
        const profilName = document.getElementById("profilUsername");
        profilName.innerHTML = userArray[profilIndex].username;
        if (userArray[profilIndex].description == "" || userArray[profilIndex].description == undefined) {
            this.editingText = "This is where you talk about yourself"
        } else {
            this.editingText = userArray[profilIndex].description;
        }
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.$store.dispatch('expChecker' , {userData})
        const expCheck = localStorage.getItem('expChecking');
        console.log("expChecking -> " , expCheck)
        console.log("LOGGED userData -> " , userData);
        if (userData != null) {
            console.log("user has created this")
            if (expCheck == "true") {
                this.loggedIn = true;
                console.log("loggedIn set to true");
            } else {
                this.loggedIn = false;
                console.log("loggedIn set to false");
            }
        } else {
            console.log("not the right user or not connected")
        }
    }
}
</script>

<style>
.input{
    box-sizing: border-box;
    width: 100%;
    height: 85%;
}
.btn__reverse{
    appearance: none;
    border: 1px white solid;
    border-radius: 1rem;
    background-color: white;
    margin: 1rem;
    width: 10%;
    box-sizing: border-box;
}
.btn__reverse:hover{
    cursor: pointer;
}
.profil{
    background-color: rgb(155, 190, 255);
    margin-left: auto;
    margin-right: auto;
    width: 80vw;
    margin-top: 20px;
    border-radius: 12px;
}
.profilContainer{
    display: flex;
    flex-direction: row;
}
.profilContainer__header{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-radius: 12px;
    margin: 10px;
    padding: 3px;
}
.profilContainer__img{
    object-fit: scale-down;
    width: 50px;
    height: 50px;
}
.profilContainer__description{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-radius: 12px;
    margin: 10px;
    padding: 3px;
    box-sizing: border-box;
    width: 100%;
}
</style>