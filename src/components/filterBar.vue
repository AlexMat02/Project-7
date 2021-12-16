<template>
    <div id="container">
        <div id="container__dropdownMenu">
            <h3> Sort by </h3>
            <select v-on:change="currentType()" id="dropdownMenu">
                <option> Popular </option>
                <option> Work </option>
                <option> Fun </option>
                <option> New </option>
            </select>
        </div>
        <div>
            <h3> | Post created today : 0</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "filterBar",
    data(){
        return {
            type: "",
        }
    },
    methods: {
        currentType() {
            const dropDownMenu = document.getElementById("dropdownMenu");
            console.log(dropDownMenu.value)
        }
    }
}
</script>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #C0C9F0;
    width: 40vw;
    min-width: 360px;
    margin-right: auto;
    margin-left: auto;
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
}
#container__dropdownMenu {
    display: flex;
    flex-direction: row;
}
#dropdownMenu {
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
#dropdownMenu:hover{
    cursor: pointer;
}
</style>