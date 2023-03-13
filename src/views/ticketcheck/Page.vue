<template>
  <div class="admin-content">
    <div class="admin-container">
      <admin-nav-menu></admin-nav-menu>
      <div class="content-check">
        <h3 class="title">Настройка мест в зале</h3>
        <div class="back">
          <div class="modal-content">
            <div class="selecter">
              <button class="submit-button" @click="showCamera = !showCamera">Начать проверку билета</button>
            </div>
            <div v-if="error">{{error}}</div>
            <StreamBarcodeReader v-if="showCamera" @decode="onDecode"></StreamBarcodeReader>
            <div v-if="showEntry" class="info">
              Статус: {{ getStatus() }}
              <br>Фильм: {{ entry.movie.title }}
              <br>Дата сеанса: {{ new Date(Date.parse(entry.dateTime)).toLocaleString() }}
              <button class="submit-button" :disabled="ticket.cancelled || ticket.visited" @click="markTicketVisited()">Отметить посещение</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StreamBarcodeReader } from 'vue-barcode-reader-plus';
import AdminNavMenu from '../../sidebars/AdminNavMenu.vue';

export default {
  components: {
    AdminNavMenu,
    StreamBarcodeReader,
  },
  name: 'TicketCheck',
  data() {
    return {
      showCamera: false,
      showEntry: false,
      error: null,
      result: null,
    };
  },
  computed: {
    ticket() {
      return this.$store.state.ticketcheck.ticket;
    },
    entry() {
      return this.$store.state.entities.entries;
    },
  },
  methods: {
    onDecode(result) {
      this.result = result;
      this.getData();
      this.showCamera = false;
    },
    getData() {
      this.$store.dispatch('ticketcheck/getTicket', { ticketKey: this.result })
        .then(() => {
          let unsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === 'ticketcheck/updateTicket') {
              unsubscribe();
            }
            this.$store.dispatch('entities/getDataById', { name: 'Entries', id: this.ticket.purchase.tableEntryId })
              .then(() => {
                let unsubscribe1 = this.$store.subscribe((mutation) => {
                  if (mutation.type === 'entities/updateEntries') {
                    this.showEntry = true;
                  }
                  unsubscribe1();
                });
              });
          });
        });
    },
    markTicketVisited() {
      this.$store.dispatch('ticketcheck/markTicketVisited', { ticketKey: this.result });
    },
    getStatus() {
      if (this.ticket.cancelled) {
        return 'Отменен';
      } else if (this.ticket.visited) {
        return 'Посещен';
      } else return 'Активен';
    }
  },
};
</script>

<style scoped>
.admin-container p {
  font-size: 30px;
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
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(90deg, rgba(193, 189, 189, 0.4) 0%, rgba(85, 85, 85, 0.6) 100%);
}
.back > p {
  font-size: 20px;
}
.unabled {
  background-color: white;
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 15px;
  width: 15px;
  margin-left: 10px;
  margin-right: 5px;
}
.disabled {
  background-color: rgb(122, 86, 86);
  border-color: gray;
  border-width: 1px;
  border-radius: 3px;
  height: 15px;
  width: 15px;
  margin-left: 10px;
  margin-right: 5px;
}
.qrcodestream {
  width: 300px;
  height: 300px;
}
@media only screen and (min-width: 1180px) {
  .subcont {
    margin: 30px;
    margin-bottom: 30px;
  }
  .content-check {
    margin: 30px;
  }
}
@media only screen and (max-width: 1180px) {
  .subcont {
    margin: 1em;
    margin-bottom: 1em;
  }
  .content-check {
    margin: 1em;
  }
}
</style>
