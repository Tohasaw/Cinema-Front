<template>
<div class="admin-content">
  <modal-delete id="window" ref="modalDelete"></modal-delete>
  <modal-info id="window" ref="modalInfo"></modal-info>
  <modal-img id="window" ref="modalImg"></modal-img>
  <div class="admin-container">
    <admin-nav-menu></admin-nav-menu>
    <div class="subcont">
      <button class="close-button" v-if="editshow" @click="editshow = !editshow">
        <svg-icon type="mdi" :path="close" color="red"></svg-icon>
      </button>
      <transition>
        <create-movie v-show="editshow" ref="createmovie" @editshow="value => editshow=value"> </create-movie>
      </transition>
      <div class="title">
        <p>Просмотр таблицы «Фильмы»</p>
        <div class="buttons">
          <div class="button-dropdown el">
            <button class="dropbtn">Строк: {{maxItems}}</button>
            <div class="dropdown-content">
              <a @click="maxItems = 10" href="#">10</a>
              <a @click="maxItems = 20" href="#">20</a>
              <a @click="maxItems = 50" href="#">50</a>
            </div>
          </div>
          <div class="button-create el" @click="createData()">
            Создать <svg-icon type="mdi" :path="plus" color="#5E7CE7"></svg-icon>
          </div>
        </div>
      </div>
      <table class="data">
        <thead>
          <tr>
            <th>Название</th>
            <th>Страна</th>
            <th>Длина</th>
            <th>Возраст</th>
            <th>Описание</th>
            <th>Обложка</th>
            <th>Изменить</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, index) in movies" :key="index">
            <td>{{movie.title}}</td>
            <td>{{movie.countries}}</td>
            <td>{{movie.length}}</td>
            <td>{{movie.ageLimit}}</td>
            <td>
              <div сlass="show-modal-button" @click="showModal(movie)">
                <svg-icon type="mdi" :path="text" color="#5E7CE7"></svg-icon>
              </div>
            </td>
            <td>
              <div сlass="show-modal-button" @click="showModalImg(movie)">
                <svg-icon type="mdi" :path="image" color="#5E7CE7"></svg-icon>
              </div>
            </td>
            <td>
              <div @click="updateData(movie)">
                  <svg-icon type="mdi" :path="edit" color="#5E7CE7"></svg-icon>
              </div>
            </td>
            <td>
              <div сlass="show-modal-button" @click="deleteData(movie)">
                <svg-icon type="mdi" :path="del" color="red"></svg-icon>
              </div>
            </td>
          </tr>
          <tr v-for="index in blankRowsNumber()" :key="index">
            <td>ㅤ</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>
      <div class="bottom">
        <div @click="decrementPage()">
          <svg-icon type="mdi" :path="leftarrow" color="#5E7CE7"></svg-icon>
        </div>
        {{page}} / {{pages}}
        <div @click="incrementPage()">
          <svg-icon type="mdi" :path="rightarrow" color="#5E7CE7"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiArrowLeftDropCircle,
  mdiArrowRightDropCircle,
  mdiPencil,
  mdiFileImage,
  mdiCardText,
  mdiDeleteForever,
  mdiPlusBox,
  mdiCloseBox,
} from '@mdi/js';
import CreateMovie from './CreateMovie.vue';
import ModalInfo from './modal-info.vue';
import ModalImg from './modal-img.vue';
import ModalDelete from './modal-delete.vue';
import AdminNavMenu from '../../sidebars/AdminNavMenu.vue';

export default {
  name: 'Movies',
  data() {
    return {
      entityName: 'Movies',
      maxItems: 10,
      page: 1,
      pages: 0,
      editshow: false,
      leftarrow: mdiArrowLeftDropCircle,
      rightarrow: mdiArrowRightDropCircle,
      close: mdiCloseBox,
      edit: mdiPencil,
      image: mdiFileImage,
      text: mdiCardText,
      del: mdiDeleteForever,
      plus: mdiPlusBox,
    };
  },
  components: {
    ModalInfo,
    ModalImg,
    ModalDelete,
    SvgIcon,
    CreateMovie,
    AdminNavMenu,
  },
  computed: {
    movies() {
      if (this.$store.state.entities.movies !== null) {
        return this.$store.state.entities.movies.slice(this.startIndex(), this.endIndex());
      }
      return '';
    }
  },
  async created() {
    await this.$store.dispatch('entities/getData', this.entityName);
  },
  watch: {
    movies() {
      this.pages = Math.floor(this.$store.state.entities.movies.length / this.maxItems);
      if (this.$store.state.entities.movies.length % this.maxItems !== 0) {
        this.pages += 1;
      }
    },
  },
  methods: {
    incrementPage() {
      if (this.page !== this.pages) {
        this.page += 1;
      }
    },
    decrementPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },
    startIndex() {
      return this.maxItems * (this.page - 1);
    },
    endIndex() {
      return this.maxItems * this.page;
    },
    blankRowsNumber() {
      return this.maxItems - this.movies.length;
    },
    showModal(movie) {
      this.$refs.modalInfo.description = movie.description;
      this.$refs.modalInfo.show = true;
    },
    showModalImg(movie) {
      this.$refs.modalImg.image = movie.image;
      this.$refs.modalImg.show = true;
    },
    createData() {
      this.editshow = true;
      let movie = {
        id: '',
        title: '',
        countries: '',
        genres: '',
        director: '',
        length: '',
        ageLimit: '',
        description: '',
        image: '',
        videoLink: '',
      };
      this.$refs.createmovie.errors = [];
      this.$refs.createmovie.currentMovie = movie;
      window.scrollTo({
        top: 103,
        behavior: 'smooth'
      });
    },
    updateData(movie) {
      this.editshow = true;
      window.scrollTo({
        top: 103,
        behavior: 'smooth'
      });
      let finmovie = JSON.parse(JSON.stringify(movie));
      this.$refs.createmovie.errors = [];
      this.$refs.createmovie.currentMovie = finmovie;
    },
    deleteData(movie) {
      this.$refs.modalDelete.show = true;
      this.$refs.modalDelete.id = movie.id;
      this.$refs.modalDelete.entityName = this.entityName;
    }
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
th {
  margin: auto;
}
#window{
  z-index: 5;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease-in;
  max-height: 412px;
}
.v-enter-from,
.v-leave-to
{
  opacity: 0;
  max-height: 0px;
}
.close-button {
  left: calc(100vw * 0.5 + 103px + 500px);
}
.block {
  z-index: -5;
  margin-top: 25px;
  margin-bottom: 60px;
}
.block p {
  font-family: 'Inter';
  margin-left: 10px;
  font-size: 32px;
}
.block th,td {
  font-family: 'Inter';
  font-size: 18px;
  margin-left: 20px;

}
.back {
  position: relative;
  padding: 20px;
  margin-top: 20px;
  width: 1001px;
  background: linear-gradient(90deg, rgba(193, 189, 189, 0.4) 0%, rgba(85, 85, 85, 0.6) 100%);
  min-height: 700px;
}
.back > p {
  font-size: 20px;
}
table {
  position: relative;
  z-index: 1;
  line-height: 40px;
  margin: 0px;
  text-align: left;
  width:100%;
  border-spacing: 0px 0px;
  margin-bottom: 40px;
}
.data th:first-child {
  border-top-left-radius: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data th:last-child {
  border-top-right-radius: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data th {
  background: rgba(255, 255, 255, 0.116);
}
.data tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.116);
}
.data tr:last-child {
  border: 10px;
  background: none;
}
.data tr:last-child td {
  border: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data td {
  text-align: center;
}
.data th {
  text-align: center;
}
.line {
  width: 501%;
  height: 1px;
  background: white;
}
.title {
  display: flex;
  font-family: 'Inter';
  font-size: 20px;
  height: 60px;
}
.title p {
  width: 70%;
}
.buttons {
  border-radius: 20px;
  margin-left: 0%;
  width: 30%;
  display:flex;
  height: 40px;
  background: rgba(0, 2, 10, 0.55);
}
.el {
  width: 45%;
}
.button-create {
  border-radius: 20px;
  margin-left: 10%;
  height: 40px;
  text-align: center;
}
.bottom {
  display: flex;
  margin: auto;
  font-family: 'Inter';
  font-size: 20px;
  height: 10px;
  width: 100px;
}
.button-dropdown {
  display: inline;
}
.dropbtn {
  border-radius: 20px;
  position: relative;
  width: 100%;
  height: 40px;
  color: #5E7CE7;
  font-size: 16px;
  font-weight: bold;
  border: none;
}
.dropdown-content {
  position: relative;
  font-size: 16px;
  display: none;
  margin-left: 0;
  margin-right: 0;
  background-color: #f1f1f1;

  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.show-modal-button {
  height: 10px;
}
.dropdown-content a:hover {background-color: #ddd;}
.button-dropdown:hover .dropdown-content {display: block;}
.button-dropdown:hover .dropbtn {
  background-color: #5E7CE7;
  color: white;
}
</style>
