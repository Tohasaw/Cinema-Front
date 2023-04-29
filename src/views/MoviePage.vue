<template>
  <div class="content">
    <div class="main-container">
      <div class="nav-menu std">
        <router-link id="title" :to="{name: 'Home'}" class="nav-menu-button enabled">Главная</router-link>
        <router-link id="title" :to="{name: 'About'}" class="nav-menu-button">Контакты</router-link>
      </div>
      <div class="movie">
        <div class="back"></div>
        <div class="titlemobile">{{movie.title}}</div>
        <div class="leftpart">
          <img class="img" :src="movie.image" alt="">
          <div class="subpart">
            <div class="text bold">Детали</div>
            <div class="text">
              Страна: {{ movie.countries }}
              <p>Режиссер: {{ movie.director }}</p>
              <p>Время: {{ movie.length }} мин.</p>
            </div>
            <div class="text-rating">
              Возраст: <div class="rating">{{ movie.ageLimit }}</div>
            </div>
            <div class="text bold">Жанры</div>
            <div class="tags">
              <div class="tag" v-for="(tag, index) in getTags(movie)" :key="index">{{ tag }}</div>
            </div>
          </div>
        </div>
        <div class="rightpart">
          <div class="header">
            <div class="title">{{movie.title}}</div>
          </div>
          <div class="player-wrapper">
            <div class="player-back"></div>
            <div class="player">
              <div class="bold">Трейлер</div>
              <vue-plyr v-if="showPlayer">
                <div class="plyr__video-embed">
                  <iframe
                    :src='movie.videoLink'
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                  ></iframe>
                </div>
              </vue-plyr>
            </div>
          </div>
          <div class="description">
            <div class="text bold">Описание</div>
            <div class="text-description">{{ movie.description }}</div>
          </div>
        </div>
      </div>
      <main-footer></main-footer>
    </div>
  </div>
</template>

<script>
import MainFooter from '../footers/main-footer.vue';

export default {
  name: 'MoviePage',
  data() {
    return {
      showPlayer: false,
    };
  },
  components: {
    MainFooter,
  },
  props: {
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  created() {
    this.$store.dispatch('main/getMovie', this.id);
    let unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'main/updateMovie') {
        this.showPlayer = true;
      }
      unsubscribe();
    });
  },
  computed: {
    movie() {
      return this.$store.state.main.movie;
    },
  },
  methods: {
    getTags(movie) {
      let tags = movie.genres.split(', ');
      return tags;
    }
  }
};
</script>

<style scoped>
.content {
  margin: auto;
  display: flex;
  width: 100%;
  background:
    radial-gradient(44.11% 73.96% at 39.32% -1.04%, rgba(82, 0, 255, 0.46) 0%, rgba(189, 171, 240, 0) 76.04%),
    radial-gradient(49.45% 84.51% at 90.68% 96.35%, #B1E5CC 0%, rgba(194, 177, 229, 0) 100%),
    radial-gradient(72.31% 146.09% at -6.3% 130.52%, rgba(94, 124, 231, 0.76) 0%, rgba(177, 188, 229, 0) 64.58%),
    linear-gradient(0deg, #293435, #293435), rgba(133, 248, 255, 0.24);
}
.enabled {
  background-color: #5D77D8;
}
@media only screen and (min-width: 1180px) {
  .main-container {
    padding-top: 100px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 1180px;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.36);
    box-shadow: 0px 5px 56px rgba(0, 0, 0, 0.35);
  }
  .movie {
    z-index: 1;
    position: relative;
    margin: 30px;
    display: flex;
  }
  .back {
    z-index: -1;
    top: 0px;
    left: -40px;
    position: absolute;
    width: 1200px;
    height: 300px;
    background: rgb(95, 121, 216, 0.612);
  }
  .leftpart {
    margin-top: 40px;
    margin-right: 80px;
  }
  .rightpart {
    position: relative;
    width: 100%;
    height: 520px;
    margin-top: 40px;
  }
  .img {
    margin-bottom: 30px;
    width: 360px;
    height: 520px;
    background: white;
  }
  .header {
    margin-bottom: 60px;
  }
  .titlebutton{
    display: flex;
    margin-bottom: 10px;
  }
  .title {
    width: 80%;
    font-size: 36px;
  }
  .text {
    font-size: 18px;
    line-height: 150%;
  }
  .text-description {
    font-size: 18px;
    line-height: 150%;
  }
  .text-rating {
    display: flex;
    font-size: 20px;
    margin-bottom: 20px;
    line-height: 150%;
  }
  .rating {
    line-height: 100%;
    margin-left: 10px;
    padding-top: 2px;
    padding-left: 2px;
    padding-right: 2px;
    margin-top: 3px;
    text-align: center;
    height: 20px;
    font-size: 16px;
    background: white;
    color: black;
    border-color: black;
    border-style: solid;
    border-width: 1px;
  }
  .bold {
    margin-bottom: 10px;
    font-size: 30px;
  }
  .tags {
    display: flex;
    height: 10px;
    margin-bottom: 20px;
  }
  .tag {
    border-radius: 10px;
    text-align:center;
    padding-left: 7px;
    padding-right: 7px;
    height: 24px;
    background:rgba(255, 255, 255, 0.5);
    color: rgba(0, 0, 0, 0.863);
    font-size: 16px;
    margin-right: 10px;
  }
  .description {
    text-align: justify;
  }
  .player {
    width: 680px;
    height: 380px;
    margin-bottom: 70px;
  }
  .titlemobile {
    font-size: 0;
  }
}
@media only screen and (max-width: 1180px) {
  .main-container {
    padding-top: 4em;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 100%;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.36);
    box-shadow: 0px 5px 56px rgba(0, 0, 0, 0.35);
  }
  .movie {
    margin-top: 1em;
    overflow: hidden;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
  }
  .back {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 13em;
    background: rgb(95, 121, 216, 0.612);
  }
  .leftpart {
    display: flex;
    margin: 1em;
  }
  .subpart {
    margin-left: 2em;
  }
  .titlemobile {
    font-size: 1.3em;
    margin: 1em;
    width: 100%;
  }
  .img {
    height: 15em;
    background: white;
  }
  .header {
    font-size: 0;
  }
  .title {
    width: 80%;
    font-size: 2em;
  }
  .text {
    font-size: 1em;
    line-height: 150%;
  }
  .bold {
    margin-bottom: 0.1em;
    font-size: 1.3em;
  }
  .text-rating {
    line-height: 150%;
    display: flex;
    font-size: 1em;
    margin-bottom: 1em;
  }
  .rating {
    line-height: 150%;
    margin: 0.3em;
    height: 1.3em;
    margin-left: 0.5em;
    text-align: center;
    font-size: 0.8em;
    background: white;
    color: black;
    border-color: black;
    border-style: solid;
    border-width: 1px;
  }
  .tags {
    display: flex;
  }
  .tag {
    border-radius: 1em;
    text-align: center;
    padding-left: 0.3em;
    padding-right: 0.3em;
    line-height: 1.3em;
    background:rgba(255, 255, 255, 0.5);
    color: rgba(0, 0, 0, 0.863);
    font-size: 0.8em;
    margin-right: 0.5em;
  }
  .rightpart {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .description {
    margin: 1em;
    margin-top: 0.5em;
    margin-bottom: 2em;
    text-align: justify;
    order: 1;
  }
  .text-description {
    font-size: 0.9em;
    line-height: 150%;
  }
  .player-wrapper {
    order: 2;
  }
  .player {
    margin: 1em;
    width: 100% - 1em;
  }
  .player-back {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(95, 121, 216, 0.612);
  }
  .player-title {
    font-size: 1.3em;
    margin-bottom: 0.7em;
  }
}
</style>
