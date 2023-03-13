<template>
  <div class="block">
    <p>Редактирование цены</p>
    <div class="back">
      <div class="labels">
        <div class="line">
          <p>Фильм:</p>
          <select v-model="selectedRowComp">
            <option v-for="price in prices" :value="price" :key="price.id">{{price.hexColor}} {{ price.value }}</option>
          </select>
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
  name: 'Entries',
  data() {
    return {
      name: '',
      entityId: '',
      row: {
        id: '',
        priceId: '',
        priceListId: '',
      },
      selectedRow: {
        id: '',
        hexColor: '',
        value: '',
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
    selectedRowComp: {
      get() {
        return this.selectedRow;
      },
      set(value) {
        this.selectedRow = value;
        this.row.priceId = value.id;
      }
    },
    prices() {
      return this.$store.state.entities.prices;
    },
  },
  methods: {
    submit() {
      this.errors = [];
      if (!this.selectedRow) {
        this.errors.push('Цена не выбрана ');
      }
      if (this.errors.length === 0) {
        let data = JSON.parse(JSON.stringify(this.row));
        delete data.id;
        const name = this.name;
        const id = this.row.id;
        if (this.row.id === '') {
          this.$store.dispatch('entities/postDataById', { data, name, entityId: this.entityId });
          console.log(this.entityId);
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
