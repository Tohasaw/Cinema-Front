<template>
  <router-view/>
</template>

<script>
export default {
  name: 'BrowseParts',
  beforeCreate() {
    if (this.$route.name === 'BrowseEntities') this.$router.push({ name: 'Empty' });
  }
};
</script>

<style scoped>
</style>
