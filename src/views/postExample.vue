<template>
    <div lang="en">
        <header-1/>
        <post-template/>
    </div>
</template>

<script>
import header1 from '@/components/header1.vue'
import postTemplate from '@/components/postTemplate.vue'

export default({
    name: 'postExample',
    components: {
        header1,
        postTemplate,
    }
})
</script>

<style>
body{
    margin: 0px;
}
</style>
