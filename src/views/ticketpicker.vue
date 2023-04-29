<template>
<div class="back">
  <div class="modal-close" @click="closeModal">&#10006;</div>
  <div class="title">
    <h3 class="modal-title text">{{movie.title}}</h3>
    <p class="text">
      {{new Date(Date.parse(tableEntry.dateTime)).toLocaleString("ru-RU", options)}}
    </p>
  </div>
</div>
<div class="prices">
  <div class="price" v-for="(price, index) in this.pricesforlist" :key="index">
    <div class="noprice" v-bind:style="classprice(index)"></div>
    <div class="text">{{ price.value }}₽</div>
  </div>
</div>
<div class="modal-content">
  <div v-if="errorif" class="maxtickets">{{errortext}}</div>
  <div class="img"><img src='../assets/display.png' alt=""/></div>
  <div class="seats" v-if="!showPurchase">
    <!-- Места в зале -->
    <div v-for="row in 8" :key="row" class="row">
      <div class="column left">
        <div class="rownumleft">{{row}}</div>
        <button v-for="column in col.slice(23).reverse()" :key="column" class="first"
        :style="seatClass(row, column)" @click="addTicket(row, column)" :disabled="isDisabled(row, column)">
          <div class="coltext">{{column}}</div>
        </button>
      </div>

      <div class="column mid">
        <button v-for="column in col.slice(8, 23).reverse()" :key="column" class="first"
        :style="seatClass(row, column)" @click="addTicket(row, column)" :disabled="isDisabled(row, column)">
          <div class="coltext">{{column}}</div>
        </button>
      </div>

      <div class="column right">
        <button v-for="column in col.slice(0, 8).reverse()" :key="column" class="first"
        :style="seatClass(row, column)" @click="addTicket(row, column)" :disabled="isDisabled(row, column)">
          <div class="coltext">{{column}}</div>
        </button>
        <div class="rownumright"><div class="num"></div>{{row}}</div>
      </div>
    </div>

    <div v-for="row in col.slice(8, 16)" :key="row" class="row">
      <div class="column left">
        <div class="rownumleft">{{row}}</div>
        <button v-for="column in col.slice(17, 23).reverse()" :key="column" class="first"
        :style="seatClass(row, column)" @click="addTicket(row, column)" :disabled="isDisabled(row, column)">
          <div class="coltext">{{column}}</div>
        </button>
      </div>

      <div class="column mid">
        <button v-for="column in col.slice(6, 17).reverse()" :key="column" class="first"
        :style="seatClass(row, column)" @click="addTicket(row, column)" :disabled="isDisabled(row, column)">
          <div class="coltext">{{column}}</div>
        </button>
      </div>

      <div class="column right">
        <button v-for="column in col.slice(0, 6).reverse()" :key="column" class="first"
        :style="seatClass(row, column)" @click="addTicket(row, column)" :disabled="isDisabled(row, column)">
          <div class="coltext">{{column}}</div>
        </button>
        <div class="rownumright"><div class="num"></div>{{row}}</div>
      </div>
    </div>

    <div class="row">
      <div class="column last">
        <div class="rownumleftlast">17</div>
        <button class="last"
        :class="[{ selectedlast: isSelected(17, 7) && !isDisabled(17, 7),
                    seatlast: !isDisabled(17, 7) }]"
        :style="getColor(17, 7)" @click="addTicket(17, 7)" :disabled="isDisabled(17, 7)">
          {{7}}
        </button>
      </div>

      <div class="column last">
        <button v-for="column in col.slice(1, 6).reverse()" :key="column" class="lastmid"
        :class="[{ selectedlast: isSelected(17, column) && !isDisabled(17, column),
                    seatmid: !isDisabled(17, column), }]"
        :style="getColor(17, column)" @click="addTicket(17, column)" :disabled="isDisabled(17, column)">
          {{column}}
        </button>
      </div>

      <div class="column last">
        <button class="last"
        :class="[{ selectedlast: isSelected(17, 1) && !isDisabled(17, 1),
                    seatlast: !isDisabled(17, 1) }]"
        :style="getColor(17, 1)" @click="addTicket(17, 1)" :disabled="isDisabled(17, 1)">
          {{1}}
        </button>
        <div class="rownumrightlast">17</div>
      </div>
    </div>
    <!-- Места в зале -->
  </div>
</div>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    parts: { type: Array, required: true },
  },
  data() {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      },
      errors: [],
      tableEntry: null,
      movie: null,
      purchase: {
        emailAddress: '',
        phoneNumber: ''
      },
      tickets: [],
      ticketsToBuy: [],
      classObject: [],
      col: Array.from({ length: 31 }, (_, i) => i + 1), // Количество колонок в зале
      rows: Array.from({ length: 31 }, (_, i) => i + 1), // Количество мест в зале
      show: false,
      showPurchase: false,
      description: '',
    };
  },
  computed: {
    pricesforlist() {
      return this.$store.state.main.pricesForList;
    },
    seatPrices() {
      return this.$store.state.main.seatPrices;
    },
  },
  methods: {
    emitSelectedTickets() {
      this.$emit('ticketsSelected', this.selectedTickets);
    },
    seatClass(row, column) {
      let seatPrice = this.seatPrices.find(s => s.seat.column === column && s.seat.row === row);
      if (seatPrice !== undefined) {
        if (this.tickets.find(s => s.seat.column === column && s.seat.row === row) !== undefined) {
          let seat = {
            'background-color': seatPrice.price.hexColor,
            'border-radius': '15px',
            'font-size': '8px',
            'border-color': 'gray',
            'border-width': '1px',
            height: '20px',
            width: '20px',
            'margin-left': '1px',
            'margin-right': '1px',
          };
          return seat;
        } else {
          let seat = {
            'background-color': seatPrice.price.hexColor,
          };
          return seat;
        }
      }
      return {};
    },
    classprice(index) {
      return {
        'background-color': this.$store.state.main.pricesForList[index].hexColor,
      };
    },
    getColor(row, column) {
      let seatPrice = this.seatPrices.find(s => s.seat.column === column && s.seat.row === row);
      if (seatPrice !== undefined) {
        return { 'background-color': seatPrice.price.hexColor };
      }
      return {};
    },
    addTicket(row, column) {
      this.errorif = false;
      let existTicket = this.tickets.find(s => s.seat.column === column && s.seat.row === row);
      if (existTicket) {
        let indexTicket = this.tickets.indexOf(existTicket);
        this.tickets.splice(indexTicket, 1);
        let indexSeat = this.ticketsToBuy.indexOf(existTicket.seat.id);
        this.ticketsToBuy.splice(indexSeat, 1);
      } else if (this.tickets.length === 5) {
        this.errortext = 'Можно купить не более 5 билетов за один заказ';
        this.errorif = true;
      } else {
        let ticket = this.seatPrices.find(s => s.seat.column === column && s.seat.row === row);
        this.tickets.push(ticket);
        this.ticketsToBuy.push(ticket.seatId);
      }
    },
    isSelected(row, column) {
      let ticket = this.tickets.find(s => s.seat.column === column && s.seat.row === row);
      if (ticket !== undefined) {
        return true;
      }
      return false;
    },
    isDisabled(row, column) {
      let seatPrice = this.seatPrices.find(s => s.seat.column === column && s.seat.row === row);
      if (seatPrice !== undefined) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  // PURCHASE
.errors {
  margin: auto;
  background: #ffa2a2;
  color:  #b52c2c;
  height: auto;
  margin-top: 20px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  border-radius: 15px;
  width: fit-content;
}
.p-title {
  font-size: 20px;
  margin-bottom: 5px;
  margin-top: 20px;
}
.purchases {
  position: relative;
  width: 47%;
  height: 76%;
  padding: 15px;
  box-sizing:border-box;
}
.purchase-content {
  display: flex;
  height: 100%;
}
.policy {
  box-sizing:border-box;
  text-align: justify;
  font-family: arial, bold;
  padding: 20px;
  overscroll-behavior: contain;
  overflow-y: scroll;
  height: 76%;
  width: 53%;
  background-color: rgba(0, 0, 0, 0.062);
}
.checkbox input {
  margin-bottom: 10px;
  height: 16px;
  width: 16px;
}
.checkbox {
  display: flex;
}
.text {
  margin-left: 5px;
}
.p-line {
  margin-bottom: 5px;
}
.p-line input {
  font-size: 15px;
}
.tip {
  font-size: 12px;
}

.bottom {
  bottom: 20%;
  position: absolute;
}
//TICKETS
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
  padding-top: 20px;
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
  background: rgb(206, 206, 206);
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

// SEATS
.coltext {
  position: absolute;
  bottom: 20%;
  left: 30%;
}
.first {
  position:relative;
  font-size: 0px;
  background-color: #5E7CE7;
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 18px;
  width: 18px;
  margin-left: 2px;
  margin-right: 2px;
}
.first:disabled {
  font-size: 0px;
  background: rgb(192, 192, 192);
  border: none;
  border-style: none;
  border-radius: 20px;
  height: 12px;
  width: 12px;
  margin-left: 5px;
  margin-right: 5px;
}
.seat {
  font-size: 0px;
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
.seats {
  min-width: 700px;
  margin-left: 50px;
  margin-right: 50px;
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
.seatmid {
  font-size: 0px;
  background-color: #29975b;
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
.selectedlast {
  font-size: 8px;
  background-color: #4dd188;
  border-color: gray;
  border-radius: 15px;
  border-width: 1px;
  height: 20px;
  width: 20px;
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
@media only screen and (min-width: 1180px) {
  .modal-content{
    padding-bottom: 40px;
    position: relative;
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
  .first:hover:enabled {
    font-size: 8px;
    background-color: none;
    border-color: gray;
    border-radius: 15px;
    border-width: 1px;
    height: 20px;
    width: 20px;
    margin-left: 1px;
    margin-right: 1px;
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

  .rownumrightlast {
    position: absolute;
    font-size: 11px;
    margin-top: -15px;
    right: 30px;
  }
  .rownumright{
    position: absolute;
    font-size: 11px;
    margin-top: -16px;
    right: 30px;
  }
  .seatlast {
    font-size: 0px;
    background-color: #29975b;
    border-color: gray;
    border-width: 1px;
    border-radius: 3px;
    height: 18px;
    width: 18px;
    margin-top: 20px;
    margin-left: 68px;
    margin-right: 68px;
  }
  .seat-mid {
    height: 18px;
    width: 18px;
    margin-left: 32px;
    margin-right: 32px;
  }
}
@media only screen and (max-width: 1180px) {
  .modal-content{
    overflow:scroll;
    padding-bottom: 30px;
  }
  .img {
    width: fit-content;
    margin: auto;
    margin-bottom: 20px;
  }
  .img img {
    width: 50em;
    height: 3em;
  }
  .rownumleft {
    z-index:3;
    position: absolute;
    font-size: 0.5em;
    margin-top: 1em;
    left: 2em;
  }
  .rownumleftlast {
    z-index:3;
    position: absolute;
    font-size: 0.5em;
    margin-top: 20px;
    left: 2em;
  }
  .rownumright{
    width: 4em;
    height: 2em;
    float: right;
    position: absolute;
    font-size: 0.5em;
    margin-top: -15px;
    right: -1em;
  }
  .rownumrightlast {
    background-color: white;
    width: 4em;
    height: 2em;
    float: right;
    position: absolute;
    font-size: 0.5em;
    margin-top: -15px;
    right: -1em;
  }
  .last {
    margin: auto;
  }
  .seat-mid {
    height: 18px;
    width: 18px;
    margin-left: 32px;
    margin-right: 32px;
  }
  .seatlast {
    font-size: 0px;
    background-color: #29975b;
    border-color: gray;
    border-width: 1px;
    border-radius: 3px;
    height: 18px;
    width: 18px;
    margin: auto;
    margin-top: 20px;
  }
}
</style>
