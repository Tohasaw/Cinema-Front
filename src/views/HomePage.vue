<template>
  <div class="content">
    <modal-ticket id="window" ref="modalTicket"></modal-ticket>
    <div class="main-container">
      <div class="nav-menu std">
        <router-link id="title" :to="{name: 'Home'}" class="nav-menu-button enabled">Главная</router-link>
        <router-link id="title" :to="{name: 'About'}" class="nav-menu-button">Контакты</router-link>
      </div>
      <div ref="datesDiv" class="dates std" @mousedown="mouseDownHandler">
        <div class="date" :class="{enabled: isEnabled[index]}" v-for="(date, index) in dates" :key="index" @click="datesort(date, index)">
          <div class="dayofweek" >{{this.days[date.dayofweek]}}</div>
          <div class="daynumber" >{{date.date}} {{this.months[date.month]}}</div>
        </div>
      </div>
      <div class="note" v-if="movies.length > 0">Нажмите на постер фильма, чтобы просмотреть подробную информацию</div>
      <div class="nofilms" v-if="movies.length === 0">
        <div class="nofilms-inner">
          <img src="../assets/smile-apple.png" alt="">
          <br>Увы, на этот день нет сеансов. Выберите другую дату
        </div>
      </div>
      <div class="films">
        <div class="film" v-for="(movie, index) in movies" :key="index">
          <router-link  class="about" @mouseover="showAboutRef[index]= true" @mouseleave="showAboutRef[index] = false" :to="{ name: 'Movie', params: { id: movie.id} }">
            <transition name="slide-fade">
              <div class="aboutref" v-show="showAboutRef[index]">Подробно о фильме</div>
            </transition>
            <!-- <div class="aboutref" v-show="showAboutRef">Подробно</div> -->
          </router-link>
          <img :src="movie.image" alt="">
          <div class="rating">{{movie.ageLimit}}</div>
          <div class="title">
            <p><b>{{movie.title}}</b></p>
          </div>
          <div class="tags">
            <div class="tag" v-for="(tag, index) in getTags(movie)" :key="index">
              {{tag}}
            </div>
          </div>
          <div class="time">
            <div class="button-time" v-for="(entry, index) in movie.tableEntries" :key="index" @click="showModalTicket(movie, entry)">
              {{new Date(Date.parse(entry.dateTime)).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}}
            </div>
          </div>
        </div>
      </div>
      <main-footer></main-footer>
    </div>
  </div>
</template>

<script>
import {
  mdiPlusBox,
} from '@mdi/js';
import ModalTicket from './TicketModal.vue';
import MainFooter from '../footers/main-footer.vue';

let somedate = {
  datejs: Date,
  date: '',
  month: '',
  dayofweek: '',
};
export default {
  name: 'HomePage',
  data() {
    return {
      pos: {
        top: 0,
        left: 0,
        x: 0,
        y: 0
      },
      ele: '',
      plus: mdiPlusBox,
      filter: new Date(),
      days: ['ВОСКР', 'ПОНЕД', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'],
      months: ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЯ', 'ИЮНЯ', 'ИЮЛЯ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'],
      isEnabled: [1, 0, 0, 0, 0, 0, 0],
      showAboutRef: [],
      windowWidth: window.innerWidth,
      dates: [
        { somedate },
        { somedate },
        { somedate },
        { somedate },
        { somedate },
        { somedate },
        { somedate },
      ],
    };
  },
  components: {
    MainFooter,
    ModalTicket,
  },
  async created() {
    await this.$store.dispatch('main/getMovies');
  },
  mounted() {
    let i = 0;
    let curdate = new Date();
    while (i < 7) {
      this.dates[i].datejs = new Date(curdate.getTime());
      this.dates[i].date = curdate.getDate();
      this.dates[i].month = curdate.getMonth();
      this.dates[i].dayofweek = curdate.getDay();
      curdate.setDate(curdate.getDate() + 1);
      i++;
    }
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
    movies() {
      let movies = this.$store.state.main.movies;
      movies = JSON.parse(JSON.stringify(movies.filter((movie) => movie.tableEntries.some(entry => (new Date(Date.parse(entry.dateTime))).getDate() === this.filter.getDate()))));
      if (movies === null) return null;
      for (let i = movies.length - 1; i > -1; i--) {
        for (let j = movies[i].tableEntries.length - 1; j > -1; j--) {
          if ((new Date(Date.parse(movies[i].tableEntries[j].dateTime))).getDate() !== this.filter.getDate()) {
            movies[i].tableEntries.splice(j, 1);
          }
        }
        if (movies[i].tableEntries.length === 0) movies.splice(i, 1);
      }
      return movies;
    }
  },
  methods: {
    async showModalTicket(movie, entry) {
      let data = JSON.parse(JSON.stringify(entry));
      // delete data.movie;
      await this.$store.dispatch('main/getSeatPrices', data.id);
      await this.$store.dispatch('main/getSeats');
      await this.$store.dispatch('main/getPricesForList', data.priceListId);
      this.$refs.modalTicket.tableEntry = entry;
      this.$refs.modalTicket.movie = movie;
      this.$refs.modalTicket.show = true;
    },
    datesort(date, index) {
      this.isEnabled = [0, 0, 0, 0, 0, 0, 0];
      this.isEnabled[index] = 1;
      this.filter = new Date(date.datejs.getTime());
      this.filter.setHours(23, 59, 59, 999);
    },
    getTags(movie) {
      let tags = movie.genres.split(', ');
      return tags;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    mouseMoveHandler(e) {
      // How far the mouse has been moved
      let dx = e.clientX - this.pos.x;
      let dy = e.clientY - this.pos.y;

      // Scroll the element
      this.ele.scrollTop = this.pos.top - dy;
      this.ele.scrollLeft = this.pos.left - dx;
    },
    mouseUpHandler() {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
      this.ele.style.removeProperty('cursor');
      this.ele.style.removeProperty('user-select');
    },
    mouseDownHandler(e) {
      this.ele = this.$refs.datesDiv;
      this.pos = {
        // The current scroll
        left: this.ele.scrollLeft,
        top: this.ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };
      this.ele.style.cursor = 'grabbing';
      this.ele.style.userSelect = 'none';

      document.addEventListener('mousemove', this.mouseMoveHandler);
      document.addEventListener('mouseup', this.mouseUpHandler);
    }
  },
};
</script>

<style scoped>

.dates {
  background: rgba(0, 2, 10, 0.55);
}
.enabled {
  background-color: #5D77D8;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.time {
  display: flex;
  height: 30px;
  margin-bottom: 30px;
}
.button-time {
  padding-top: 4px;
  border-radius: 10px;
  text-align:center;
  width: 70px;
  height: 26px;
  background:#5D77D8;
  font-size: 18px;
  margin-right: 10px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
.tag {
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  height: 15px;
  background:rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.863);
  font-size: 12px;
  margin-right: 0.7em;
  margin-bottom: 0.5em;
}
.button-time:hover {
  background:#8498e1;
  cursor:pointer;
}
.premieres {
  display: flex;
  min-height: 370px;
  width: 1120px;
}
.back {
  z-index: -1;
  top: 0px;
  left: -10px;
  position: absolute;
  width: 1200px;
  height: 210px;
  background: rgb(95, 121, 216, 0.612);
}
.premiere {
  margin-left: 30px;
  z-index: 2;
  font-size: 16px;
}
.img {
  margin-bottom: 10px;
  width: 162px;
  height: 232px;
  background: white;
}
.name{
  padding-left: 30px;
  margin-top: 50px;
  margin-bottom: 30px;
  padding-top: 30px;
  font-size: 30px;
  z-index: 2;
  position: relative;
}

@media only screen and (min-width: 1180px) {
  .main-container {
    padding-top: 100px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 1180px;
    background: rgba(0, 0, 0, 0.36);
    box-shadow: 0px 5px 56px rgba(0, 0, 0, 0.35);
  }
  .dayofweek {
    font-weight:lighter;
    font-size: 13px;
  }
  .daynumber {
    font-weight:100;
    font-size: 22px;
  }
  .date {
    border-radius: 20px;
    padding-top: 13px;
    width: 160px;
    max-width: 160px;
    min-width: 160px;
    height: 70px;
    text-align: center;
    box-sizing: border-box;
  }
  .date:hover {
    background-color: #8498e1;
  }
  .films {
    margin: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 257.5px);
    grid-gap: 1rem;
    justify-content: space-between;
  }
  .nofilms {
    box-sizing: border-box;
    margin: auto;
    height: 500px;
    width: 250px;
    text-align:center;
  }
  .nofilms img{
    margin-bottom: 10px;
    width: 200px;
    height: 200px;
  }
  .nofilms-inner {
    transform: translateY(50%);
  }
  .film {
    position: relative;
  }
  .film > .title p {
    font-weight: 300;
    font-size: 24px;
    margin-bottom: 10px;
  }
  .film > img{
    margin-bottom: 5px;
    height: 370px;
    width: 257.5px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  .about {
    z-index: 2;
    position: absolute;
    height: 370px;
    width: 257.5px;
    overflow: hidden;
  }
  .aboutref {
    box-sizing: border-box;
    z-index: 4;
    background: linear-gradient(#000000a4, #0000001c);
    display: block;
    height: 370px;
    width: 257.5px;
    padding-top: 15%;
    text-align: center;
    font-size: 20px;
  }
  .rating {
    position: absolute;
    top: 330px;
    left: 10px;
    padding-top: 4px;
    text-align: center;
    background: #ff3f3f;
    color: rgb(255, 255, 255);
    width: 40px;
    height: 26px;
    font-size: 16px;
  }
  .note {
    font-size: 0px;
  }
}
@media only screen and (max-width: 1180px) {
  .main-container {
    padding-top: 4em;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 100%;
    background: rgba(0, 0, 0, 0.36);
    box-shadow: 0px 5px 56px rgba(0, 0, 0, 0.35);
  }
  .dayofweek {
    font-weight:lighter;
    font-size: 0.8em;
  }
  .daynumber {
    font-weight: 100;
    font-size: 1.2em;
  }
  .dates {
    overflow: auto;
    justify-content: space-between;
  }
  .date {
    min-width: 90px;
    width: 15%;
    border-radius: 20px;
    padding-top: 13px;
    height: 70px;
    text-align: center;
    box-sizing: border-box;
  }
  .films {
    margin: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, 10em);
    grid-gap: 1rem;
    justify-content: space-between;
  }
  .nofilms {
    width: 20em;
    box-sizing: border-box;
    margin: auto;
    text-align: center;
  }
  .nofilms img{
    width: 10em;
    height: 10em;
  }
  .nofilms-inner {
    margin-top: 3em;
  }
  .film {
    width: 10em;
    position: relative;
  }
  .film > .title p {
    font-weight: 100;
    font-size: 1.1em;
    margin-bottom: 10px;
  }
  .film > img{
    margin-bottom: 5px;
    width: 100%;
    height: 15em;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  .rating {
    position: absolute;
    top: 12.5em;
    left: 0.7em;
    padding-top: 4px;
    text-align: center;
    background: #ff3f3f;
    color: rgb(255, 255, 255);
    width: 40px;
    height: 26px;
    font-size: 1em;
  }
  .note {
    text-align: justify;
    margin: 1em;
    font-size: 1em;
  }
  .about {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 15em;
  }
  .aboutref {
    font-size: 0;
  }
}
</style>
