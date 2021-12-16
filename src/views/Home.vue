<template>
  <div class="home">
    <header1/>
    <filterBar/>
    <mainContent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import header1 from '@/components/header1.vue'
import filterBar from '@/components/filterBar.vue'
import mainContent from '@/components/mainContent.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    header1,
    filterBar,
    mainContent
  }
}
</script>

<style>
body {
  margin: 0px;
}
</style>