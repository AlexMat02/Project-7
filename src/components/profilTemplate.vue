<template>
    <div class="profil">
        <div class="profilContainer">
            <div class="profilContainer__header">
                <h2 id="profilUsername">Profil Name</h2>
            </div>
            <div class="profilContainer__description">
                <p class="editableP"> {{ editingText }} </p>
                <input id="input">
            </div>
            <button v-if="this.loggedIn == true" class="btn-classic btn__reverse" @click="editing"><h3> Edit </h3></button>
            <button v-if="this.loggedIn == true" class="btn-classic btn__reverse" @click="deleteRequest()"><h3> Delete Profil </h3></button>
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
        deleteRequest() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            fetch(`http://localhost:4000/auth/deleteOneUser/${userData.userData.userId}`, {method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'authorization': userData.userData.token
            }})
            .then( () => {
                localStorage.removeItem("userData");
                this.$router.push({name: 'Home'})
            })
        },
        editingSwitch(){
            const inputEdit = document.getElementById("input");
            const pProfil = document.getElementsByClassName("editableP");
            this.editingText = inputEdit.value;
            pProfil[0].innerText = this.editingText;
            inputEdit.style.display = "none";
            pProfil[0].style.display = "block";
            this.isEditing = false;
            // This is the part to check if user logged-in
            fetch("http://localhost:4000/auth/users", {method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(res => localStorage.setItem("userArray", JSON.stringify(res)))
            const userArray = JSON.parse(localStorage.getItem("userArray"));
            const correctProfil = localStorage.getItem("profilNumber");
            const userData = JSON.parse(localStorage.getItem('userData'));
            let profilIndex;
            for (let n = 0; n < userArray.length; n++) {
                if (userArray[n].id_User == correctProfil) {
                    profilIndex = n;
                }
            }
            this.$store.dispatch('expChecker' , {userData})
            const expCheck = localStorage.getItem('expChecking');
            if (expCheck == "true") {
                // user is logged in
                this.loggedIn = true;
                // This is the request to update it to the database
                fetch(`http://localhost:4000/auth/userDescription/${userArray[profilIndex].id_User}`, {method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userData.userData.token
                    },
                        body: JSON.stringify({description: this.editingText})
                })
            } else {
                // user is not logged in
                this.loggedIn = false;
            }
        },
        editing(){
            if (this.isEditing === false) {
                this.isEditing = true;
                const pProfil = document.getElementsByClassName("editableP");
                const inputCreator = document.getElementById("input");
                this.editingText = pProfil[0].innerText;
                inputCreator.value = this.editingText;
                pProfil[0].style.display = "none";
                inputCreator.style.display = "block";
            } else if (this.isEditing === true) {
                this.editingSwitch();
            }
            
        },
    },
    mounted(){
        // Check if the user is logged in (useful for other)
        let userData = JSON.parse(localStorage.getItem("userData"));
        this.$store.dispatch('expChecker' , {userData});
        // check if user is logged in
        let expCheck = localStorage.getItem('expChecking');
        if (userData === null) {
            this.$router.push({name: 'loginPage'});
            return
        }
        // this is for updatingPost
        localStorage.removeItem("isUpdating");
        // When the user clicks on his profil this is used 
        const profilId = localStorage.getItem("profilId");
        // fetch allUser Array
        fetch("http://localhost:4000/auth/users", {method: 'GET', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then( (res) => {
            localStorage.setItem("userArray", JSON.stringify(res))
            // Get correct Data for later use
            const userArray = JSON.parse(localStorage.getItem("userArray"));
            const correctProfil = localStorage.getItem("profilNumber");
            // Find the correct index of the user inside userArray
            let profilIndex;
            for (let n = 0; n < userArray.length; n++) {
                if (userArray[n].id_User == correctProfil) {
                    profilIndex = n;
                } 
            }
            // display the correct profil name
            const profilName = document.getElementById("profilUsername");
            profilName.innerHTML = userArray[profilIndex].username;
            // If the user's description is empty, remplace it with "This is where you talk about yourself"
            if (userArray[profilIndex].description == "" || userArray[profilIndex].description == undefined) {
                this.editingText = "This is where you talk about yourself"
            } else {
                this.editingText = userArray[profilIndex].description;
            }
            // Check if the user is loggedIn
            let userData = JSON.parse(localStorage.getItem('userData'));
            this.$store.dispatch('expChecker' , {userData})
            let expCheck = localStorage.getItem('expChecking');
            if (userData != null) {
                if (expCheck == "true") {
                    // user is logged in
                    this.loggedIn = true;
                } else {
                    // user is not logged in
                    this.loggedIn = false;
                }
            }
        });
        
    }
}
</script>

<style>
#input{
    box-sizing: border-box;
    width: 100%;
    height: 85%;
    display: none;
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
    background-color: #091F43;
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