<template>
  <div class="home" lang="en">
    <header1/>
    <filterBar/>
    <create-post-button/>
    <mainContent/>
  </div>
</template>

<script>
const API_URL = "http://localhost:4000/api/posts";
// @ is an alias to /src
import header1 from '@/components/header1.vue'
import mainContent from '@/components/mainContent.vue'
import createPostButton from '@/components/createPostButton.vue'

export default {
  name: 'Home',
  components: {
    header1,
    mainContent,
    createPostButton,
  },
  methods: {
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
    } else {
      fetch(API_URL, {method: 'GET', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': userData.userData.token}})
      .then(response => response.json())
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}
</style>