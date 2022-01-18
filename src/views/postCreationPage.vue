<template>
    <div>
        <header-1/>
        <div>
            <div>
                <h2> Title </h2>
                <input class="inputBar">
                <h2> Type </h2>
                <select v-on:change="test()" class="inputBar dropDownMenu">
                    <option> Work </option>
                    <option> Fun </option>
                </select>
                <h2> Content </h2>
                <textarea class="inputBar" id="textarea"></textarea>
                <h2> Image URL </h2>
                <input type="file" class="inputBar">
            </div>
            <button class="btn-classic" id="btn-post" @click="postCreator()"> Submit Post </button>
        </div>
    </div>
</template>

<script>
import header1 from '@/components/header1.vue'

export default ({
    name: "postCreationPage",
    components: {
        header1,
    },
    methods: {
        postCreator() {
            const titleInput = document.getElementsByClassName("inputBar")[0];
            const typeInput = document.getElementsByClassName("inputBar")[1].value;
            const contentInput = document.getElementsByClassName("inputBar")[2];
            const imgInput = document.getElementsByClassName("inputBar")[3];
            const userData = JSON.parse(localStorage.getItem('userData'));
            console.log("LOGGED USERDATA .USERID -> " ,userData.userId)
            if ( titleInput.value != "" && typeInput.value != "" && contentInput.value != "" && imgInput.value != "") {
                console.log("postCreator is now working");
                console.log( "title -> " , titleInput.value )
                console.log( "type -> " , typeInput.value )
                console.log( "content -> " , contentInput.value )
                console.log( "img -> " , imgInput.value )
                const postContent = {
                    title: titleInput.value,
                    type: typeInput,
                    content: contentInput.value,
                    img: imgInput.value,
                    userId: userData.userId,
                }
                console.log(postContent);
                fetch("http://localhost:4000/api/posting", {method: 'POST', 
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'},
                    body: JSON.stringify(postContent)})
                .then(console.log("fetch request send"))
            } else {
                console.log("empty inputs")
            }
        },
        test() {
            const typeInput = document.getElementsByClassName("inputBar")[1].value;
            console.log("typeINput" , typeInput)
            console.log("aa -> " , document.getElementsByClassName("inputBar")[1])
            console.log("aabb -> " , document.getElementsByClassName("inputBar")[1].value)
        }
    }
})
</script>

<style>
#textarea{
    width: 40rem;
    height: 8rem;
}
#btn-post{
    width: 8rem;
    height: 3rem;
    font-size: large;
}
.dropDownMenu {
    margin: 10px;
    background-color: white;
    border: solid 2px white;
    appearance: none;
    border-radius: 15%;
    color: blueviolet;
    font-size: large;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 800;
}
.dropDownMenu:hover{
    cursor: pointer;
}
</style>
