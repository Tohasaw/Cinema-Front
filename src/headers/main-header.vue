<template>
  <div class="header">
    <router-link id="title" :to="{name: 'Home'}">
      Кинотеатр «Северянин»
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style scoped>
  /* @import url('https://fonts.googleapis.com/css2?family=Ruslan+Display&display=swap'); */
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
@media only screen and (min-width: 1180px) {
  .header {
    width: 1200px;
    height: 100px;
  }
  #title {
    margin-left: 50px;
    font-size: 40px;
  }
}
@media only screen and (max-width: 1180px) {
  .header {
    width: 100%;
    height: 4em;
  }
  #title {
    margin: auto;
    font-size: 2em;
  }
}
</style>
