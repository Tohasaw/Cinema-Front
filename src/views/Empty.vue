<template>
<div class="admin-content">
  <div class="admin-container">
    <admin-nav-menu></admin-nav-menu>
    <div class="subcont">
      Выберите страницу
    </div>
  </div>
</div>
</template>

<script>
import AdminNavMenu from '../sidebars/AdminNavMenu.vue';

export default {
  name: 'Entries',
  data() {
    return {
    };
  },
  components: {
    AdminNavMenu,
  },
};
</script>

<style scoped>
.admin-container p {
  font-size: 30px;
}
.subcont {
  margin: 30px;
  margin-bottom: 30px;
}
</style>
