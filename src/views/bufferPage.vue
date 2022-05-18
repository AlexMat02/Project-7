<template>
    <div>
        <h1>Please wait</h1>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$router.push({name: 'Home'});
    }
}
</script>

<style>

</style>