<template>
  <div class="block">
    <p>Редактирование расписания {{title}}</p>
    <div class="back">
      <div class="labels">
        <div class="line">
          <p>Фильм:</p>
          <select v-model="selectedMovieComp">
            <option v-for="movie in movies" :value="movie" :key="movie.id">{{movie.title}}</option>
          </select>
        </div>
        <div class="line">
          <p>Прайс-лист:</p>
          <select v-model="selectedPriceComp">
            <option v-for="pricelist in pricelists" :value="pricelist" :key="pricelist.id">{{pricelist.name}}</option>
          </select>
        </div>
        <div class="line">
          <p>Дата:</p>
          <input
            type="datetime-local"
            :min="currentDate"
            v-model="currentRow.dateTime"
            placeholder="edit me"/>
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
      row: {
        id: '',
        movieId: '',
        priceListId: '',
        dateTime: '',
      },
      selectedMovie: {
        id: '',
        title: '',
        countries: '',
        genres: '',
        director: '',
        length: '',
        ageLimit: '',
        description: '',
        image: '',
      },
      selectedPrice: {
        id: '',
        name: '',
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
    selectedMovieComp: {
      get() {
        return this.selectedMovie;
      },
      set(value) {
        this.selectedMovie = value;
        this.row.movieId = value.id;
      }
    },
    selectedPriceComp: {
      get() {
        return this.selectedPrice;
      },
      set(value) {
        this.selectedPrice = value;
        this.row.priceListId = value.id;
      }
    },
    movies() {
      return this.$store.state.entities.movies;
    },
    pricelists() {
      return this.$store.state.entities.pricelists;
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
    submit() {
      this.errors = [];
      if (!this.selectedMovie || !this.row.dateTime || !this.selectedPrice) {
        this.errors.push('Поля не заполнены ');
      } else if (new Date(Date.parse(this.row.dateTime)) < new Date().setUTCHours(23, 59, 59, 999)) {
        this.errors.push('Нельзя создать сеанс на текущую дату или раньше');
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
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  background: rgba(255, 255, 255, 0.116);
  border-radius: 8px;
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
