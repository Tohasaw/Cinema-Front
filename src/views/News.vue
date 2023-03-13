<template>
  <div class="block schedule">
    <p>Новости</p>
    <div class="scheduleback">
      <div class="filmsinfo">
        <div class="film">
          <img src="../assets/news1.jpg" alt="">
          <div class="title">
            <p><b>Установлено новое оборудование</b></p>
          </div>
          <div class="desc">
            <p>Для улучшения качества процесса просмотра картин было установлено новейшее оборудование, отвечающее современным стандартам. Уже сейчас можно купить билет, прийти на сеанс и ощутить разницу в качестве со старым оборудованием.</p>
          </div>
          <div class="desc">
            <p><ins>Открыть полную версию статьи</ins></p>
          </div>
        </div>
        <div class="film">
          <img src="../assets/news2.jpg" alt="">
          <div class="title">
            <p><b>Ожидаемые релизы января</b></p>
          </div>
          <div class="desc">
            <p>Грядущий январь будет богат на новинки.</p>
          </div>
          <div class="desc">
            <p><ins>Открыть полную версию статьи</ins></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
};
</script>

<style scoped>
.block {
  margin-top: 25px;
  margin-bottom: 60px;
}
.block p {
  font-family: 'Inter';
  margin-left: 10px;
  font-size: 32px;
}
.scheduleback {
  margin-top: 20px;
  width: 1001px;
  background: linear-gradient(90deg, rgba(193, 189, 189, 0.4) 0%, rgba(85, 85, 85, 0.6) 100%);
}
.button-time {
  font-size: 18px;
  margin: 15px;
}
.filmsinfo {
  padding-bottom: 1px;
  padding-top: 1px;
  padding-left: 40px;
  padding-right: 40px;
}
.film {
  min-height: 200px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
}
.film > img {
  margin-right: 15px;
  border: 2px solid rgba(94, 124, 231, 0.49);
  height: 200px;
  width: 250px;
  float: left;
}
.film > .title p {
  margin-bottom: 10px;
  font-size: 27px;
}
.film > .info {
  margin-bottom: 15px;
}
.film > .info p{
  font-size: 20px;
}
.film > .desc p {
  font-size: 19px;
  text-align: justify;
}
</style>
