<template>
  <div class="block">
    <p>Редактирование покупки</p>
    <div class="back">
      <div class="labels">
        <div class="line">
          <p>Сеанс</p>
          <select v-model="selectedEntryComp">
            <option v-for="entry in entries" :value="entry" :key="entry.id">{{entry.movie.title}} {{ new Date(Date.parse(entry.dateTime)).toLocaleString() }}</option>
          </select><br>
          <p>Дата</p>{{ new Date(Date.parse(currentRow.dateTime)).toLocaleString() }}<br>
          <p>Телефон</p>
          <input v-model="currentRow.phoneNumber" placeholder=""/><br>
          <p>Сумма</p>{{ currentRow.priceTotal }}<br>
        </div>
        <div class="errors" v-if="errors.length > 0">
          <span v-for="error in errors" :key="error">
            {{error}}<br>
          </span>
        </div>
        <button v-on:click="submit()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      name: '',
      row: {
        id: '',
        tableEntryId: '',
        dateTime: '',
        emailAddress: '',
        phoneNumber: '',
        refundKey: '',
        priceTotal: '',
      },
      selectedEntry: {
        id: '',
        movie: '',
        dateTime: '',
      },
      errors: [],
    };
  },
  computed: {
    currentRow: {
      get() {
        return this.row;
      },
      set(value) {
        this.row = value;
      }
    },
    entries() {
      return this.$store.state.entities.entries;
    },
    selectedEntryComp: {
      get() {
        return this.selectedEntry;
      },
      set(value) {
        this.selectedEntry = value;
        this.row.tableEntryId = value.id;
      }
    },
  },
  methods: {
    submit() {
      this.errors = [];
      if (!this.row.tableEntryId || !this.row.phoneNumber) {
        this.errors.push('Полe не заполнено ');
      }
      if (this.errors.length === 0) {
        let data = JSON.parse(JSON.stringify(this.row));
        delete data.id;
        const name = this.name;
        const id = this.row.id;
        if (this.row.id === '') {
          this.$store.dispatch('entities/postData', { data, name });
        } else {
          this.$store.dispatch('entities/putData', { data, name, id });
        }
        this.$emit('editshow', false);
      }
    }
  }
};
</script>

<style scoped>
#window{
  display: fixed;
  position: absolute;
  height: 100px;
}
.block {
  margin-top: 25px;
  margin-bottom: 60px;
}
.block > p {
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
  display: flex;
  padding: 20px;
  margin-top: 20px;
  width: 1001px;
}
.albumshow {
  margin-left: 350px;
}
.uploading-image {
  border: solid black;
  width: 200px;
  height: 290px;
}
.album {
  display: flex;
  margin-bottom: 10px;
  width: 400px;
}
.album > p {
  display: inline-block;
  font-family: 'Inter';
  margin-left: 10px;
  font-size: 20px;
  width: 150px;
}
.line {
  margin-bottom: 10px;
}
.line > p {
  display: inline-block;
  font-family: 'Inter';
  margin-left: 10px;
  font-size: 20px;
  width: 240px;
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
</style>
