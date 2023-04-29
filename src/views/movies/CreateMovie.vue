<template>
  <div class="block">
    <p>Редактирование фильма {{title}}</p>
    <div class="back">
      <div class="labels">
        <div class="line">
          <p>Название:</p> <input v-model="currentMovie.title" placeholder=""/>
        </div>
        <div class="line">
          <p>Страна:</p> <input v-model="currentMovie.countries" placeholder=""/>
        </div>
        <div class="line">
          <p>Жанры: </p> <input v-model="currentMovie.genres" placeholder="" />
        </div>
        <div class="line">
          <p>Режиссер: </p> <input v-model="currentMovie.director" placeholder="" />
        </div>
        <div class="line">
          <p>Длина: </p> <input v-model="currentMovie.length" placeholder="" />
        </div>
        <div class="line">
          <p>Возраст: </p> <input v-model="currentMovie.ageLimit" placeholder="" />
        </div>
        <div class="line">
          <p>Описание:</p> <textarea cols="50" rows="10" class="" v-model="currentMovie.description" placeholder=""></textarea>
        </div>
        <div class="line">
          <p>Ссылка на видео:</p> <input v-model="currentMovie.videoLink" placeholder="" />
        </div>
        <div class="album">
          <p>Обложка:</p>
          <input type="file" ref="file" v-on:change="HandleFileUpload()"/>
          <button v-on:click="submitFile()">Загрузить</button>
        </div>
        <div class="errors" v-if="errors.length > 0">
          <span v-for="error in errors" :key="error">
            {{error}}<br>
          </span>
        </div>
        <button v-on:click="submit()">Сохранить</button>
      </div>
      <div class="albumshow">
        <img :src="currentMovie.image" class="uploading-image" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Movies',
  // props: {
  //   movies: { type: Array, required: true },
  // },
  data() {
    return {
      movie: {
        id: '',
        title: '',
        countries: '',
        genres: '',
        director: '',
        length: '',
        ageLimit: '',
        description: '',
        image: '',
        videoLink: '',
      },
      file: '',
      errors: [],
    };
  },
  computed: {
    currentMovie: {
      get() {
        return this.movie;
      },
      set(value) {
        this.movie = value;
      }
    }
  },
  methods: {
    HandleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      axios.post(
        '/api/images',
        formData,
        {
          headers:
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      )
        .then((responce) => {
          this.currentMovie.image = '/api/images/' + responce.data;
        });
    },
    submit() {
      this.errors = [];
      if (!this.movie.title || !this.movie.countries
      || !this.movie.genres || !this.movie.director || !this.movie.length
      || !this.movie.ageLimit || !this.movie.description) {
        this.errors.push('Поля не заполнены ');
      }
      if (isNaN(parseInt(this.movie.length))) {
        this.errors.push('Поле "Длина" должно содержать целое число');
      }
      if (!this.movie.image) {
        this.errors.push('Изображение не загружено ');
      }
      if (this.errors.length === 0) {
        let data = JSON.parse(JSON.stringify(this.movie));
        delete data.id;
        const name = 'Movies';
        const id = this.movie.id;
        if (this.movie.id === '') {
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
  position: relative;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  background: rgba(255, 255, 255, 0.116);
  border-radius: 8px;
}
.albumshow {
  position: absolute;
  right: 5%;
}
.uploading-image {
  border: solid black;
  width: 200px;
  height: 290px;
}
.album {
  display: flex;
  margin-bottom: 10px;
  width: 500px;
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
.description {
  width: 100px;
  height: 40px;
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
