<template>
    <div>
        <header-1/>
        <profil-template/>
    </div>
</template>

<script>
import header1 from '@/components/header1.vue'
import profilTemplate from '@/components/profilTemplate.vue'

export default({
    name: 'profilExample',
    components: {
        header1,
        profilTemplate,
    }
})
</script>

<style>
body{
    margin: 0px;
}
</style>
