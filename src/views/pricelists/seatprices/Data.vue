<template>
<div class="admin-content">
  <div class="admin-container">
    <admin-nav-menu></admin-nav-menu>
    <div class="modal">
      <h3 class="title">Выбор цены для мест</h3>
      <div class="back">
        <div class="modal-content">
          <div class="prices">
            <div class="noprice"></div>
            <div class="text">Нет цены</div>
            <div class="price" v-for="(price, index) in this.prices" :key="index">
              <div class="noprice" v-bind:style="classprice(index)"></div>
              <div class="text">{{ price.value }}₽</div>
            </div>
          </div>
          <div class="selecter">
            Выберите цену:
            <select v-model="selectedPriceComp">
              <option v-for="price in prices" :value="price" :key="price.id">{{price.value}}</option>
            </select>
            <button class="submit-button" @click="submitSeatPrices()">Сохранить</button>
          </div>
          <div v-if="errorif" class="maxtickets">{{errortext}}</div>
          <div class="img"><img src='../../../assets/display.png' alt=""/></div>
          <div class="seats">
            <!-- места в зале -->
            <div v-for="row in 8" :key="row" class="row">
              <div class="column left">
                <div class="rownumleft">{{row}}</div>
                <button v-for="column in col.slice(23).reverse()" :key="column" class="first seat"
                :style="getColor(row, column)"
                @click="addToList(row, column)">
                  {{column}}
                </button>
              </div>

              <div class="column mid">
                <button v-for="column in col.slice(8, 23).reverse()" :key="column" class="first seat"
                v-bind:style="getColor(row, column)" @click="addToList(row, column)">
                  {{column}}
                </button>
              </div>

              <div class="column right">
                <button v-for="column in col.slice(0, 8).reverse()" :key="column" class="first seat"
                v-bind:style="getColor(row, column)" @click="addToList(row, column)">
                  {{column}}
                </button>
                <div class="rownumright">{{row}}</div>
              </div>
            </div>

            <div v-for="row in col.slice(8, 16)" :key="row" class="row">
              <div class="column left">
                <div class="rownumleft">{{row}}</div>
                <button v-for="column in col.slice(17, 23).reverse()" :key="column" class="first seat"
                v-bind:style="getColor(row, column)" @click="addToList(row, column)">
                  {{column}}
                </button>
              </div>

              <div class="column mid">
                <button v-for="column in col.slice(6, 17).reverse()" :key="column" class="first seat"
                v-bind:style="getColor(row, column)" @click="addToList(row, column)">
                  {{column}}
                </button>
              </div>

              <div class="column right">
                <button v-for="column in col.slice(0, 6).reverse()" :key="column" class="first seat"
                v-bind:style="getColor(row, column)" @click="addToList(row, column)">
                  {{column}}
                </button>
                <div class="rownumright">{{row}}</div>
              </div>
            </div>

            <div class="row">
              <div class="column last">
                <div class="rownumleftlast">17</div>
                <button class="last seatlast"
                v-bind:style="getColor(17, 7)" @click="addToList(17, 7)">
                  {{7}}
                </button>
              </div>

              <div class="column last">
                <button v-for="column in col.slice(1, 6).reverse()" :key="column" class="lastmid seatmid"
                v-bind:style="getColor(17, column)" @click="addToList(17, column)">
                  {{column}}
                </button>
              </div>

              <div class="column last">
                <button class="last seatlast"
                v-bind:style="getColor(17, 1)" @click="addToList(17, 1)">
                  {{1}}
                </button>
                <div class="rownumright">17</div>
              </div>
            </div>
            <!-- места в зале -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AdminNavMenu from '../../../sidebars/AdminNavMenu.vue';

export default {
  name: 'SeatPrices',
  data() {
    return {
      entityName: 'SeatPricesForList',
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hours: 'numeric',
        minutes: 'numeric',
        timeZone: 'UTC',
      },
      seatPrices: [],
      selectedSeats: [],
      col: Array.from({ length: 31 }, (_, i) => i + 1),
      rows: Array.from({ length: 12 }, (_, i) => i + 1),
      selectedPriceId: -1,
      selectedPrice: {
        id: '',
        hexColor: '',
        value: ''
      },
    };
  },
  components: {
    AdminNavMenu,
  },
  props: {
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  async created() {
    const name = this.entityName;
    const id = this.id;
    await this.$store.dispatch('entities/getDataById', { name, id });
    await this.$store.dispatch('entities/getDataById', { name: 'PricesForList', id });
    await this.$store.dispatch('entities/getData', 'Seats');
  },
  computed: {
    selectedPriceComp: {
      get() {
        return this.selectedPrice;
      },
      set(value) {
        this.selectedPrice = value;
        this.selectedPriceId = value.id;
      }
    },
    prices() {
      return this.$store.state.entities.pricesforlist;
    },
    seats() {
      return this.$store.state.entities.seats;
    },
    seatPricesForList() {
      return this.$store.state.entities.seatpricesforlist;
    },
    getDate() {
      let date = new Date(Date(tableEntry.dateTime));
      date.toUTCString();
      return date;
    },
  },
  methods: {
    classprice(index) {
      return {
        'background-color': this.$store.state.entities.pricesforlist[index].hexColor,
      };
    },
    getColor(row, column) {
      let seatPrice = this.selectedSeats.find(s => s.row === row && s.column === column);
      if (seatPrice !== undefined) {
        return { 'background-color': seatPrice.color };
      }
      if (this.seats !== undefined && this.seats !== null) {
        let seat = this.seats.find(s => s.column === column && s.row === row);
        if (seat !== undefined && seat !== null) {
          seatPrice = this.seatPricesForList.find(s => s.seatId === seat.id);
          if (seatPrice !== undefined && seatPrice !== null) {
            return { 'background-color': seatPrice.price.hexColor };
          }
        }
      }
      return {};
    },
    createData() {
      this.editshow = true;
      let row = {
        id: '',
        movieId: '',
        dateTime: '',
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
      delete finrow.movie;
      this.$refs.createrow.errors = [];
      this.$refs.createrow.currentRow = finrow;
      this.$refs.createrow.selectedMovie = row.movie;
      this.$refs.createrow.name = this.entityName;
    },
    deleteData(row) {
      this.$refs.modalDelete.show = true;
      this.$refs.modalDelete.id = row.id;
      this.$refs.modalDelete.name = this.entityName;
    },
    addToList(row, column) {
      if (this.selectedPriceId !== -1) {
        let seat = this.seats.find(s => s.column === column && s.row === row);
        let existSeatPrice = this.seatPrices.find(s => s.seatId === seat.id);
        if (existSeatPrice !== undefined) {
          let seatPriceindex = this.seatPrices.indexOf(existSeatPrice);
          this.seatPrices.splice(seatPriceindex, 1);
          let seatIndex = this.selectedSeats.findIndex(s => s.row === row && s.column === column);
          this.selectedSeats.splice(seatIndex, 1);
        } else {
          let selectedseat = { row, column, color: this.prices.find(p => p.id === this.selectedPriceId).hexColor };
          this.selectedSeats.push(selectedseat);
          let seatPrice = { priceListId: this.id, priceId: this.selectedPriceId, seatId: seat.id };
          this.seatPrices.push(seatPrice);
        }
      }
    },
    submitSeatPrices() {
      if (this.seatPrices.length > 0) {
        this.$store.dispatch('entities/postData', { data: JSON.parse(JSON.stringify(this.seatPrices)), name: this.entityName });
      }
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
.close-button {
  left: calc(100vw * 0.5 + 103px + 500px);
}
.selecter {
  width:fit-content;
  margin: auto;
  margin-bottom: 20px;
}
.submit-button {
  margin-left: 20px;
}
.back {
  position: relative;
  padding: 20px;
  margin-top: 20px;
  width: 1001px;
  background: rgba(255, 255, 255, 0.116);
}
.back > p {
  font-size: 20px;
}
.noprice {
  background-color: white;
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 15px;
  width: 15px;
  margin-left: 10px;
  margin-right: 5px;
}
.prices {
  width: fit-content;
  height: 40px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  display: flex;
}
.price {
  display: flex;
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 5px;
}
.maxtickets {
  min-width: 370px;
  background: rgb(85, 85, 85);
  position: absolute;
  left: 270px;
  top: -44px;
  margin: auto;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  padding: 5px;
}
.rownumleft {
  position: absolute;
  font-size: 11px;
  margin-top: 8px;
  right: 860px;
}
.rownumleftlast {
  position: absolute;
  font-size: 11px;
  margin-top: 20px;
  right: 860px;
}
.rownumright{
  position: absolute;
  font-size: 11px;
  margin-top: -16px;
  right: 30px;
}
.text {
  text-align: center;
}
h3 {
  font-family: 'Inter';
}
p {
  color: black;
  font-family: 'Inter';
}
.img {
    width: fit-content;
    margin: auto;
    margin-bottom: 20px;
  }
  .img img{
    width: 800px;
    margin: auto;
    margin-bottom: 20px;
  }
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 100;
  text-align: center;
  color: white;
  margin-top: 30px;
}
.back {
  padding-top: 1px;
  width: 900px;
  margin: auto;
  /* background: rgba(226, 226, 226, 0.685); */
  border-radius: 8px;
  margin-bottom: 60px;
}
.modal-close {
  font-size: 20px;
  margin-left: 40px;
  margin-top: 30px;
  cursor:pointer;
}
.modal-content{
  position: relative;
}
.first:disabled {
  font-size: 0px;
  background: rgb(192, 192, 192);
  border: none;
  border-style: none;
  border-radius: 20px;
  height: 8px;
  width: 8px;
  margin-left: 7px;
  margin-right: 7px;
}
.seats {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
}
.tickets {
  display: flex;
  padding: 0px;
  background: rgb(240, 240, 240);
  border-radius: 8px;
  margin-top: 40px;
  min-height: 100px;
  width: 100%;
}
.ticket {
  padding: 4px;
  margin: 15px;
  border-radius: 5px;
  background: white;
  width: 90px;
  height: 60px;
  font-size: 17px;
}
.button-buy {
  position: absolute;
  right: 20px;
  bottom: 40px;
  font-size: 15px;
  padding: 5px;
}
.left{
  margin-left: 0px;
}
.mid {
  margin: auto;
}
.right {
  margin-right: 0px;
}
.row {
  display: flex;
  height: 22px;
  margin: 0 auto;
}
.last {
  margin: auto;
}
.seatlast {
  font-size: 0px;
  background-color: rgb(235, 235, 235);
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 18px;
  width: 18px;
  margin-top: 20px;
  margin-left: 41px;
  margin-right: 41px;
}
.seatmid {
  font-size: 0px;
  background-color: rgb(235, 235, 235);
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 18px;
  width: 18px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
}
.lastmid:disabled {
  font-size: 0px;
  background: rgb(192, 192, 192);
  border: none;
  border-style: none;
  border-radius: 20px;
  height: 8px;
  width: 8px;
  margin-top: 25px;
  margin-left: 44px;
  margin-right: 44px;
}
.last:disabled {
  font-size: 0px;
  background: rgb(192, 192, 192);
  border: none;
  border-style: none;
  border-radius: 20px;
  height: 8px;
  width: 8px;
  margin-top: 25px;
  margin-left: 45px;
  margin-right: 45px;
}
.selectedlast {
  font-size: 8px;
  background-color: #4dd188;
  border-color: gray;
  border-radius: 15px;
  border-width: 1px;
  height: 20px;
  width: 20px;
}
.seat {
  font-size: 0px;
  background-color: rgb(235, 235, 235);
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 18px;
  width: 18px;
  margin-left: 2px;
  margin-right: 2px;
}
.selected {
  font-size: 8px;
  background-color: #9eb0f0;
  border-color: gray;
  border-radius: 15px;
  border-width: 1px;
  height: 20px;
  width: 20px;
  margin-left: 1px;
  margin-right: 1px;
}
.seat:hover {
  font-size: 8px;
  background-color: #9eb0f0;
  border-color: gray;
  border-radius: 15px;
  border-width: 1px;
  height: 20px;
  width: 20px;
  margin-left: 1px;
  margin-right: 1px;
}
.seat-left {
  height: 18px;
  width: 18px;
  margin-left: 82.5px;
  margin-right: 40px;
}
.seat-right {
  height: 18px;
  width: 18px;
  margin-left: 40px;
  margin-right: 82.5px;
}
.seat-mid {
  height: 18px;
  width: 18px;
  margin-left: 32px;
  margin-right: 32px;
}
</style>
