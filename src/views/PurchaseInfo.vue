<template>
<div class="admin-content">
  <div class="admin-container">
    <div class="nav-menu std">
      <router-link id="title" :to="{name: 'Home'}" class="nav-menu-button">Главная</router-link>
      <router-link id="title" :to="{name: 'About'}" class="nav-menu-button">Контакты</router-link>
    </div>
    <div class="subcont">
      <div class="title">
        Информация о покупке<br>
        Фильм {{ purchase.tableEntry.movie.title }}<br>
        Дата сеанса: {{new Date(Date.parse(purchase.dateTime)).toLocaleString("ru-RU")}}<br>
        Дата покупки: {{new Date(Date.parse(purchase.tableEntry.dateTime)).toLocaleString("ru-RU")}}
      </div>
      <table class="data">
        <thead>
          <tr>
            <th>#</th>
            <th>Ряд</th>
            <th>Место</th>
            <th>Цена</th>
            <th>Статус</th>
            <th>Выбрать</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ticket, index) in purchase.tickets" :key="index">
            <td>{{index + 1}}</td>
            <td>{{ticket.seat.row}}</td>
            <td>{{ticket.seat.column}}</td>
            <td>{{ticket.price}}</td>
            <td>{{status[+ ticket.cancelled]}}</td>
            <td>
              <input type="checkbox" :value=ticket.id v-model="checkedTickets" :disabled="ticket.cancelled || new Date(Date.parse(purchase.tableEntry.dateTime)) < new Date()">
            </td>
          </tr>
          <tr v-for="index in blankRowsNumber()" :key="index">
            <td>ㅤ</td><td></td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>
      <div class="lasttr">
        <button @click="updateTicket(row)" :disabled="checkedTickets[0] === undefined">Вернуть билет(ы)</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mdiCardText,
  mdiDeleteForever,
  mdiPlusBox,
  mdiCloseBox,
} from '@mdi/js';

export default {
  name: 'Prices',
  data() {
    return {
      entityName: 'Prices',
      checkedTickets: [],
      maxItems: 5,
      editshow: false,
      close: mdiCloseBox,
      text: mdiCardText,
      del: mdiDeleteForever,
      plus: mdiPlusBox,
      status: ['Куплен', 'Отменен']
    };
  },
  props: {
    refundKey: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  components: {
  },
  computed: {
    purchase() {
      if (this.$store.state.main.purchase !== null) {
        return this.$store.state.main.purchase;
      }
      return '';
    }
  },
  created() {
    this.$store.dispatch('main/getPurchase', { refundKey: this.refundKey });
  },
  methods: {
    blankRowsNumber() {
      return this.maxItems - this.purchase.tickets.length;
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
    updateTicket() {
      let data = {
        refundKey: this.refundKey,
        ticketIds: this.checkedTickets
      };
      this.checkedTickets = [];
      this.$store.dispatch('main/updateMyTicket', { data }).then(() => this.$store.dispatch('main/getPurchase', { refundKey: this.refundKey }));
    },
  },
};
</script>

<style scoped>
button {
  margin: auto;
  font-size: 1em;
  margin-left: 1em;
  margin-top: 1em;
}
/* NAV MENU */
.std {
  border-radius: 20px;
  display: flex;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
/* MAIN */
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
.data td {
  text-align: center;
}
.data th {
  text-align: center;
}
.lasttr {
  width: 100%;
  height: 60px;
  border: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.title {
  display: flex;
  font-family: 'Inter';
  font-size: 20px;
  margin-bottom: 30px;
  line-height: 150%;
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
