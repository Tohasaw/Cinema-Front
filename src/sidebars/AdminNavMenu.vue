<template>
  <div class="admin-nav-menu std">
    <router-link v-if="localStorage === 'admin'" class="admin-nav-menu-button" :to="{name: 'BrowseMovies'}">Фильмы</router-link>
    <router-link v-if="localStorage === 'admin'" class="admin-nav-menu-button" :to="{name: 'BrowseEntries'}">Расписание</router-link>
    <router-link v-if="localStorage === 'admin'" class="admin-nav-menu-button" :to="{name: 'BrowseSeats'}">Места</router-link>
    <router-link v-if="localStorage === 'admin'" class="admin-nav-menu-button" :to="{name: 'BrowsePrices'}">Цены</router-link>
    <router-link v-if="localStorage === 'admin'" class="admin-nav-menu-button" :to="{name: 'BrowsePriceLists'}">Прайс-листы</router-link>
    <router-link class="admin-nav-menu-button" :to="{name: 'BrowsePurchases'}">Покупки</router-link>
    <router-link v-if="localStorage === 'admin'" class="admin-nav-menu-button" :to="{name: 'BrowseEntries'}">Обложки</router-link>
    <router-link class="admin-nav-menu-button" :to="{name: 'TicketCheck'}">Контроль билетов</router-link>
  </div>
</template>

<script>
export default {
  name: 'Entries',
  data() {
    return {
      localStorage: localStorage.getItem('userRole'),
    };
  },
  methods: {
    getUserRole() {
      return localStorage.getItem('userRole');
    }
  }
};
</script>

<style scoped>
.admin-nav-menu {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  background: rgba(0, 2, 10, 0.55);
}
.admin-nav-menu-button {
  padding: 4px;
  border-radius: 20px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 24px;
  font-family: Inter;
}
.admin-nav-menu-button:hover {
  background-color: #8498e1;
}
.std {
  border-radius: 20px;
  display: flex;
}
@media only screen and (min-width: 1180px) {
  .std {
    border-radius: 20px;
    display: flex;
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
  }
}
@media only screen and (max-width: 1180px) {
  .std {
    border-radius: 20px;
    display: flex;
    margin-top: 1em;
    margin-left: 1em;
    margin-right: 1em;
  }
}
</style>
