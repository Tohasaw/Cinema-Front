<template>
  <div class="admin-content">
    <div class="admin-container">
      <h1>Вход в аккаунт</h1>
      <form class="form" action="" @submit.prevent="onSubmit">
        <input type="text" v-model="email" placeholder="Введите логин">
        <input type="password" v-model="password" placeholder="Введите пароль">
        <button class="login">Вход</button>
      </form>
      <!-- <button class="signin" @click="onSingin">Регистрация</button> -->
      <div class="errors" v-if="errors.length > 0">
        <span v-for="error in errors" :key="error">
          {{error}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (!this.email || !this.password) {
        this.errors.push('Данные не введены');
      } else {
        let data = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('auth/onLogin', { data, router: this.$router })
          .then(() => {
            let unsubscribe = this.$store.subscribe((mutation) => {
              if (mutation.type === 'auth/setError') this.errors.push(mutation.payload);
              unsubscribe();
            });
          });
      }
    },
    onSingin() {
      this.$router.push({ name: 'Signin' });
    }
  }
};
</script>

<style scoped>
.errors {
  margin: auto;
  background: #ffa2a2;
  color:  #b52c2c;
  height: auto;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  border-radius: 15px;
  width: fit-content;
  margin-top: 20px;
}
h1 {
  width:fit-content;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: 'Inter';
}
.form {
  align-items: center;
  width: 320px;
  height: 200px;
  margin: 0 auto;
}
input {
  display: flex;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 250px;
  font-size: 15px;
}
.login {
  display: flex;
  margin: auto;
  font-size: 20px;
}
/* .signin {
  position: absolute;
  bottom: 73px;
  left: 232px;
  font-size: 20px;
} */
</style>
