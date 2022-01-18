<template>
  <div class="home">
    <header1/>
    <filterBar/>
    <create-post-button/>
    <mainContent/>
  </div>
</template>

<script>
const API_URL = "http://localhost:4000/api/posts";
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import header1 from '@/components/header1.vue'
import filterBar from '@/components/filterBar.vue'
import mainContent from '@/components/mainContent.vue'
import createPostButton from '@/components/createPostButton.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    header1,
    filterBar,
    mainContent,
    createPostButton,
  },
  methods: {
  },
  mounted() {
    fetch(API_URL)
    .then(response => response.json())
    .then(result => {
      console.log("console logged api/posts -> " , result)
    }),
    console.log("LOGGED USERID -> " , JSON.parse(localStorage.getItem('userData')))
  }
}
</script>

<style>
body {
  margin: 0px;
}
</style>