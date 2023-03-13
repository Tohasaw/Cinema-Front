<template>
  <div class="block">
    <p>Редактирование цены</p>
    <div class="back">
      <div class="labels">
        <div class="line">
          <color-picker class="picker" :color="this.row.hexColor" @color-change="updateColor" :visible-formats="['hex']" alpha-channel="hide"></color-picker>
        </div>
        <div class="line">
          <p>Цена:</p>
          <input v-model="currentRow.value" placeholder="Целое или дробное число"/>
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
import { ColorPicker } from 'vue-accessible-color-picker';

export default {
  name: 'Prices',
  data() {
    return {
      name: '',
      row: {
        id: '',
        hexColor: '',
        value: '',
      },
      errors: [],
    };
  },
  components: {
    ColorPicker,
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
    movies() {
      return this.$store.state.entities.movies;
    },
    currentDate() {
      let today = new Date();
      const dd = String(today.getDate() + 1).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd + 'T00:00';
      return today;
    }
  },
  methods: {
    updateColor(eventData) {
      this.row.hexColor = eventData.cssColor;
    },
    submit() {
      this.errors = [];
      if (!this.row.hexColor || !this.row.value) {
        this.errors.push('Поля не заполнены ');
      } else if (isNaN(parseFloat(this.row.value))) {
        this.errors.push('Поле "Длина" должно содержать целое или дробное число');
      }
      if (this.errors.length === 0) {
        let data = JSON.parse(JSON.stringify(this.row));
        delete data.id;
        console.log(this.name);
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
.picker {
  color: black;
}
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
  margin-left: 60px;
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
