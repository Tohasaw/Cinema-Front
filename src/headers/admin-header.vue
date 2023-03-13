<template>
  <header class="header">
    <router-link id="title" :to="{name: 'Home'}">
      Кинотеатр «Северянин»
    </router-link>
    <div class="userinfo">
      <p v-if="access()" >Вы вошли как: {{email}}</p>
      <router-link :to="{name: 'Login'}" @click.prevent="onLogout()" v-if="access()">Выйти из системы</router-link>
      <router-link :to="{name: 'Login'}" v-if="!access()">Войти в систему</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Admin',
  computed: {
    table() {
      return this.$store.state.table.entries;
    },
    email() {
      return this.$store.state.auth.credentials.email;
    }
  },
  methods: {
    access() {
      return this.$store.state.auth.credentials.token;
    },
    onLogout() {
      this.$store.dispatch('auth/onLogout');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  background-color: #5D77D8;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
#title {
  margin-top: 20px;
  font-weight: 0;
  font-family: 'BookAntiqua-Italic';
  /* font-family: 'Lobelia'; */
  /* font-family: 'Eckmann Nouveau'; */
  text-decoration: none;
}
.userinfo a {
}

.logout:hover {
  cursor: pointer;
}
@media only screen and (min-width: 1180px) {
  .header {
    width: 1200px;
    height: 100px;
  }
  #title {
    margin: auto;
    margin-left: 50px;
    font-size: 40px;
  }
  .userinfo {
    margin-top: 30px;
    margin-right: 30px;
    min-width: 200px;
    font-family: 'Inter';
    font-size: 18px;
  }
}
@media only screen and (max-width: 1180px) {
  .header {
    width: 100%;
    min-height: 4em;
  }
  #title {
    margin: auto;
    margin-left: 1em;
    font-size: 2em;
  }
  .userinfo {
    margin-top: 1em;
    margin-right: 2em;
    min-width: 5em;
    font-family: 'Inter';
    font-size: 0.8em;
  }
}
</style>
