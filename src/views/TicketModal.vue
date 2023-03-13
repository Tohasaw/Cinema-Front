<template>
<div v-if="show" class="modal-shadow" @click.self="closeModal">
  <div class="modal">
    <div class="purchase" v-if="showPurchase">
      <div class="background">
        <div class="purchase-back">
          <div class="modal-close" @click="togglePurchase">←</div>
          <div class="title">
            <h3 class="modal-title text">Детали покупки</h3>
          </div>
        </div>
        <div class="purchase-content">
          <div class="purchases">
            <div class="p-title"><b>Выбранные билеты</b></div>
            <div v-for="(ticket, index) in tickets" :key="index">{{ index+1 }}. Ряд {{ticket.seat.row}}, Место {{ticket.seat.column}}. Цена: {{ticket.price.value}}₽</div>
            <b>Итог: {{ priceTotal() }}</b>
            <div class="p-title"><b>Контакты</b></div>
            <div class="p-line">
              <p>Электронной почта</p> <input v-model="purchase.emailAddress" placeholder="example@mail.ru"/>
              <p class="tip">На электронную почту будут высланы билеты.</p>
            </div>
            <div class="p-line">
              <p>Номер телефона:</p> <input v-model="purchase.phoneNumber" type="number" placeholder="+7 (xxx) xxx-xx-xx"/>
            </div>
            <div class="checkbox"><input type="checkbox" id="checkbox" v-model="checkedPers"><div class="text">Я согласен на обработку данных</div></div>
            <div class="checkbox"><input type="checkbox" id="checkbox" v-model="checkedEmail"><div class="text">Я хочу получать новостную рассылку</div></div>
            <div class="errors" v-if="errors.length > 0">
              <span v-for="error in errors" :key="error">
                {{error}}<br>
              </span>
            </div>
          </div>
          <div class="policy">
            <h4>Условия</h4>Задача организации, в особенности же постоянный количественный рост и сфера нашей активности требуют определения и уточнения дальнейших направлений развития. Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа системы обучения кадров, соответствует насущным потребностям.
            <br><br>Не следует, однако забывать, что укрепление и развитие структуры требуют от нас анализа существенных финансовых и административных условий. Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании системы обучения кадров, соответствует насущным потребностям.
            Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Значимость этих проблем настолько очевидна, что консультация с широким активом представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности требуют от нас анализа систем массового участия. Товарищи! укрепление и развитие структуры требуют определения и уточнения направлений прогрессивного развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа направлений прогрессивного развития.
            Разнообразный и богатый опыт реализация намеченных плановых заданий играет важную роль в формировании направлений прогрессивного развития. Не следует, однако забывать, что новая модель организационной деятельности способствует подготовки и реализации систем массового участия.
            Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки новых предложений. Не следует, однако забывать, что реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития. Идейные соображения высшего порядка, а также консультация с широким активом позволяет выполнять важные задания по разработке соответствующий условий активизации. Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки новых предложений.
          </div>
        </div>
        <div class="purchase-footer">
          <button class="button-buy" @click="buyTickets">
            Перейти к оплате
        </button>
        </div>
      </div>
    </div>
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
      </div>
    </div>
    <div class="modal-footer">
      <div class="tickets">
        <div v-for="ticket in tickets" :key="ticket" class="ticket">
          Ряд {{ticket.seat.row}} Место {{ticket.seat.column}} {{ticket.price.value}}₽
        </div>
        <button class="button-buy" @click="togglePurchase">Далее</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import SvgIcon from '@jamescoyle/vue-icon';
// import {
//   mdiPlusBox,
// } from '@mdi/js';

export default {
  name: 'ModalWindow',
  components: {
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
      errorif: false,
      errortext: null,
      checkedPers: false,
      checkedEmail: false,
      tableEntry: null,
      movie: null,
      purchase: {
        emailAddress: '',
        phoneNumber: ''
      },
      tickets: [],
      ticketsToBuy: [],
      classObject: [],
      col: Array.from({ length: 31 }, (_, i) => i + 1),
      show: false,
      showPurchase: false,
      description: '',
    };
  },
  methods: {
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
    closeModal() {
      this.errorif = false;
      this.show = false;
      this.showPurchase = false;
      this.ticketsToBuy = [];
      this.tickets = [];
      this.purchase = {
        emailAddress: '',
        phoneNumber: ''
      };
      checkedPers = false;
      checkedEmail = false;
    },
    togglePurchase() {
      if (this.tickets.length === 0) {
        this.errortext = 'Выберите от одного до пяти билетов';
        this.errorif = true;
      } else {
        this.showPurchase = !this.showPurchase;
      }
    },
    addTicket(row, column) {
      console.log(row, column);
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
    buyTickets() {
      this.errors = [];
      if (!this.purchase.emailAddress || !this.purchase.phoneNumber) this.errors.push('Поля не заполнены ');
      else {
        if (!this.validEmail()) this.errors.push('Почта должна быть в формате example@mail.ru');
        else {
          if (!this.validPhone()) this.errors.push('Телефон должен быть в формате +7(xxx)xxx-xx-xx');
          else {
            if (this.checkedPers === false) this.errors.push('Необходимо согласится с обработкой данных');
            else {
              let data = {
                tableEntryId: this.tableEntry.id,
                emailAddress: this.purchase.emailAddress,
                phoneNumber: this.purchase.phoneNumber.toString(),
                advertAccepted: this.checkedEmail,
                seatIds: this.ticketsToBuy
              };
              this.$store.dispatch('main/postTickets', { data, router: this.$router });
            }
          }
        }
      }
      //   let data = this.ticketsToBuy;
      //   this.$store.dispatch('main/postTickets', { data, router: this.$router });
      //   this.show = false;
      //   this.ticketsToBuy = [];
      //   this.tickets = [];
      //   this.closeModal();
    },
    priceTotal() {
      let initialValue = 0;
      let sumWithInitial = this.tickets.reduce((accumulator, value) => accumulator + value.price.value, initialValue);
      return sumWithInitial;
    },
    validEmail() {
      let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
      let valid = re.test(this.purchase.emailAddress);
      return valid;
    },
    validPhone() {
      let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
      let valid = re.test(this.purchase.phoneNumber);
      return valid;
    }
  },
  computed: {
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
    getColo123r() {
      return this.seatPrices;
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
.text {
  text-align: center;
  color: black;
}
h3 {
  font-family: 'Inter';
}
p {
  color: black;
  font-family: 'Inter';
}
.title {
  margin-top: 30px;
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
  .button-buy {
    position: absolute;
    right: 20px;
    bottom: 40px;
    font-size: 15px;
    padding: 5px;
  }
  .modal-shadow {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
  }
  .modal {
    z-index: 4;
    background: #fff;
    color: black;
    border-radius: 8px;
    width: 900px;
    position: relative;
    margin: auto;
    margin-top: 5%;
  }
  .back {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    padding-top: 1px;
    width: 100%;
    height: 100px;
    background: rgb(240, 240, 240);
    border-radius: 8px;
  }
  .modal-close {
    font-size: 20px;
    position: absolute;
    margin-left: 40px;
    margin-top: 30px;
    cursor:pointer;
  }
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
  .tickets {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    color: white;
    display: flex;
    padding: 0px;
    background: rgb(240, 240, 240);
    border-radius: 8px;
    min-height: 100px;
    width: 100%;
  }
  .ticket {
    padding: 4px;
    margin: 15px;
    border-radius: 5px;
    background: #5E7CE7;
    width: 80px;
    height: 60px;
    font-size: 15px;
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
  .purchase-back {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    padding-top: 1px;
    width: 100%;
    height: 12%;
    background: rgb(240, 240, 240);
    border-radius: 8px;
  }
  .purchase {
    position: absolute;
    z-index: 6;
    background-color: #0000009a;
    border-radius: 8px;
  }
  .background {
    width: 100%;
    height: 700px;
    background-color: white;
    position: relative;
    border-radius: 8px;
  }
  .purchase-footer {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    width: 100%;
    background-color: #f0f0f0;
    position: absolute;
    bottom: 0;
    border-radius: 8px;
    height: 12%;
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
  .modal-shadow {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
  }
  .modal {
    z-index: 4;
    background: #fff;
    color: black;
    border-radius: 8px;
    position: relative;
    margin: auto;
  }
  .back {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    padding-top: 1px;
    width: 100%;
    height: 100px;
    background: rgb(240, 240, 240);
    border-radius: 8px;
  }
  .modal-close {
    font-size: 20px;
    position: absolute;
    margin-left: 40px;
    margin-top: 30px;
    cursor:pointer;
  }
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
  .tickets {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    color: white;
    display: flex;
    padding: 0px;
    background: rgb(240, 240, 240);
    border-radius: 8px;
    min-height: 100px;
    width: 100%;
  }
  .ticket {
    padding: 4px;
    margin: 1em;
    margin-right: 0;
    width: 5em;
    border-radius: 5px;
    background: #5E7CE7;
    font-size: 0.7em;
  }
  .button-buy {
    position: absolute;
    right: 20px;
    bottom: 40px;
    font-size: 0.8em;
    padding: 5px;
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
  .purchase {
    position: absolute;
    z-index: 6;
    background-color: #0000009a;
    border-radius: 8px;
  }
  .background {
    width: 100%;
    height: 100vh;
    background-color: white;
    position: relative;
    border-radius: 8px;
  }
  .purchase-back {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    padding-top: 1px;
    width: 100%;
    height: 100px;
    background: rgb(240, 240, 240);
    border-radius: 8px;
  }
  .purchase-footer {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    width: 100%;
    background-color: #f0f0f0;
    position: absolute;
    bottom: 0;
    border-radius: 8px;
    height: 100px;
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
