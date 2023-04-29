<template>
  <div class="block">
    <div class="title">
      <p>Редактирование билета</p>  <button v-on:click="submit()">Сохранить</button>
    </div>
    <div class="labels">
      <div class="errors" v-if="errors.length > 0">
        <span v-for="error in errors" :key="error">
          {{error}}<br>
        </span>
      </div>
    </div>
    <div class="back">
      <div class="modal-content">
        <div class="prices">
          <div class="noprice"></div>
          <div class="text">Нет цены</div>
          <div class="price" v-for="(price, index) in this.pricesforlist" :key="index">
            <div class="noprice" v-bind:style="classprice(index)"></div>
            <div class="text">{{ price.value }}₽</div>
          </div>
        </div>
        <div v-if="errorif" class="maxtickets">{{errortext}}</div>
        <div class="img"><img src='../../../assets/display.png' alt=""/></div>
        <div class="seats">
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
              <div class="rownumright">17</div>
            </div>
          </div>
          <!-- Места в зале -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tickets',
  data() {
    return {
      col: Array.from({ length: 31 }, (_, i) => i + 1),
      rows: Array.from({ length: 12 }, (_, i) => i + 1),
      name: '',
      ticketCurrent: '',
      ticket: {
        seatId: '',
        row: '',
        column: ''
      },
      selectedSeat: '',
      errors: [],
    };
  },
  computed: {
    purchase() {
      return this.$store.state.entities.purchase;
    },
    getDate() {
      let date = new Date(Date(tableEntry.dateTime));
      date.toUTCString();
      return date;
    },
    pricesforlist() {
      return this.$store.state.main.pricesForList;
    },
    seatPrices() {
      return this.$store.state.main.seatPrices;
    },
  },
  methods: {
    seatClass(row, column) {
      let seatPrice = this.seatPrices.find(s => s.seat.column === column && s.seat.row === row);
      if (seatPrice !== undefined) {
        if (this.ticket.seatId !== undefined) {
          if (this.ticket.column === column && this.ticket.row === row) {
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
    async submit() {
      this.errors = [];
      if (this.ticket.seatId === '') {
        this.errors.push('Место не выбрано ');
      }
      if (this.errors.length === 0) {
        let data = {
          seatId: this.ticket.seatId,
          purchaseId: this.purchase.id,
        };
        if (this.ticketCurrent === '') {
          await this.$store.dispatch('entities/postDataById', { data, name: 'Tickets', entityId: this.purchase.id })
            .then(() => this.$store.dispatch('main/getSeatPrices', this.purchase.tableEntry.id));
        } else {
          this.$store.dispatch('entities/putData', { data, name: 'Tickets', id });
        }
        this.$emit('editshow', false);
      }
    },
    addTicket(row, column) {
      this.errors = [];
      this.ticket.row = row;
      this.ticket.column = column;
      this.ticket.seatId = this.seatPrices.find(s => s.seat.column === column && s.seat.row === row).seatId;
    },
    isSelected(row, column) {
      if (this.ticket.row === row && this.ticket.column === column) return true;
      else return false;
    },
    isDisabled(row, column) {
      let seatPrice = this.seatPrices.find(s => s.seat.column === column && s.seat.row === row);
      if (seatPrice !== undefined) {
        return false;
      } else {
        return true;
      }
    },
  }
};
</script>

<style scoped>
#window{
  display: fixed;
  position: absolute;
  height: 100px;
}
.title {
  display: flex;
  justify-content: space-between;
}
.title > p {
  color: white;
  font-family: 'Inter';
  margin-left: 10px;
  font-size: 32px;
}
.block {
  margin-top: 25px;
  margin-bottom: 60px;
}
.block > p {
  color: white;
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
  border-radius: 8px;
  padding-bottom: 60px;
  width: 100%;
  display: flex;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.116);
}
.labels {
  margin-left: 20px;
}
.errors {
  background: #ffa2a2;
  color:  #b52c2c;
  margin-bottom: 10px;
  height: auto;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 25px;
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
  left: 0px;
  font-size: 11px;
  margin-top: 8px;
}
.rownumleftlast {
  position: absolute;
  font-size: 11px;
  margin-top: 20px;
  left: 0px;
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
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 100;
  text-align: center;
  color: white;
  margin-top: 30px;
}
.modal-close {
  font-size: 20px;
  margin-left: 40px;
  margin-top: 30px;
  cursor:pointer;
}
.modal-content{
  margin: auto;
  position: relative;
}
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

.seatlast {
  font-size: 0px;
  background-color: #29975b;
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 18px;
  width: 18px;
  margin-top: 20px;
  margin-left: 41px;
  margin-right: 41px;
}
.last {
  margin: auto;
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
.seat-mid {
  height: 18px;
  width: 18px;
  margin-left: 32px;
  margin-right: 32px;
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
.rownumright{
  position: absolute;
  font-size: 11px;
  margin-top: -16px;
  right: 30px;
}
</style>
