<template>
<div class="admin-content">
  <modal-delete id="window" ref="modalDelete"></modal-delete>
  <div class="admin-container">
    <admin-nav-menu></admin-nav-menu>
    <div class="subcont">
      <button class="close-button" v-if="editshow" @click="editshow = !editshow">
        <svg-icon type="mdi" :path="close" color="red"></svg-icon>
      </button>
      <transition>
        <create-row v-show="editshow" ref="createrow" @editshow="value => editshow=value"> </create-row>
      </transition>
      <div class="title">
        <p>Просмотр таблицы «Цены»</p>
        <div class="buttons">
          <div class="button-dropdown el">
            <button class="dropbtn">Строк: {{maxItems}}</button>
            <div class="dropdown-content">
              <a @click="maxItems = 10" href="#">10</a>
              <a @click="maxItems = 20" href="#">20</a>
            </div>
          </div>
          <div class="button-create el" @click="createData()">
            Создать <svg-icon class="svg" type="mdi" :path="plus" color="#5E7CE7"></svg-icon>
          </div>
        </div>
        <!-- <div class="buttons-mid">
          <div @click="decrementPage()">
            <svg-icon type="mdi" :path="leftarrow" color="#5E7CE7"></svg-icon>
          </div>
          {{page}} ({{pages}})
          <div @click="incrementPage()">
            <svg-icon type="mdi" :path="rightarrow" color="#5E7CE7"></svg-icon>
          </div>
        </div> -->
      </div>
      <table class="data">
        <thead>
          <tr>
            <th>Цена</th>
            <th>Код цвета</th>
            <th>Изменить</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td>{{row.value}}</td>
            <td :style="{color: row.hexColor}">{{row.hexColor}}</td>
            <td>
              <div сlass="show-modal-button" @click="updateData(row)">
                  <svg-icon type="mdi" :path="edit" color="#5E7CE7"></svg-icon>
              </div>
            </td>
            <td>
              <div сlass="show-modal-button" @click="deleteData(row)">
                <svg-icon type="mdi" :path="del" color="red"></svg-icon>
              </div>
            </td>
          </tr>
          <tr v-for="index in blankRowsNumber()" :key="index">
            <td>ㅤ</td><td></td><td></td><td></td>
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
import CreateRow from './CreateRow.vue';
import ModalDelete from './modal-delete.vue';
import AdminNavMenu from '../../sidebars/AdminNavMenu.vue';

export default {
  name: 'Prices',
  data() {
    return {
      entityName: 'Prices',
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
    ModalDelete,
    SvgIcon,
    CreateRow,
    AdminNavMenu,
  },
  computed: {
    rows() {
      if (this.$store.state.entities.prices !== null) {
        let entries = this.$store.state.entities.prices;
        return entries.slice(this.startIndex(), this.endIndex());
      }
      return '';
    }
  },
  async created() {
    await this.$store.dispatch('entities/getData', this.entityName);
  },
  watch: {
    rows() {
      this.pages = Math.floor(this.$store.state.entities.prices.length / this.maxItems);
      if (this.$store.state.entities.prices.length % this.maxItems !== 0) {
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
      return this.maxItems - this.rows.length;
    },
    showModal(data) {
      this.$refs.modalInfo.description = data.description;
      this.$refs.modalInfo.show = true;
    },
    createData() {
      this.editshow = true;
      let row = {
        id: '',
        hexColor: '#FFFFFF',
        value: '',
      };
      this.$refs.createrow.errors = [];
      this.$refs.createrow.name = this.entityName;
      this.$refs.createrow.currentRow = row;
      window.scrollTo({
        top: 103,
        behavior: 'smooth'
      });
    },
    updateData(row) {
      this.editshow = true;
      window.scrollTo({
        top: 103,
        behavior: 'smooth'
      });
      let finrow = JSON.parse(JSON.stringify(row));
      this.$refs.createrow.errors = [];
      this.$refs.createrow.currentRow = finrow;
      this.$refs.createrow.name = this.entityName;
    },
    deleteData(row) {
      this.$refs.modalDelete.show = true;
      this.$refs.modalDelete.id = row.id;
      this.$refs.modalDelete.name = this.entityName;
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
  position: absolute;
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
  width: 646%;
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
.bottom {
  display: flex;
  margin: auto;
  font-family: 'Inter';
  font-size: 20px;
  height: 50px;
  width: 100px;
}
</style>
