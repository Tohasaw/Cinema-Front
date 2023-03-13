<template>
  <div class="content">
    <div class="main-container">
      <div class="nav-menu std">
        <router-link id="title" :to="{name: 'Home'}" class="nav-menu-button">Главная</router-link>
        <router-link id="title" :to="{name: 'About'}" class="nav-menu-button enabled">Контакты</router-link>
      </div>
      <div class="block schedule">
        <p class="about">О нас</p>
        <div class="scheduleback">
          <div class="filmsinfo">
            <div class="film">
              <div class="title">
                <p><b>Адрес</b></p>
              </div>
              <div class="desc">
                <p>г.Северодвинск, ул. Ломоносова, д. 23</p>
              </div>
            </div>
            <div class="film">
              <div class="title">
                <p><b>Режим работы</b></p>
              </div>
              <div class="desc">
                <p>Открытие кассы: за 30 минут до начала первого сеанса </p>
                <p>Закрытие кассы: через 10 минут после начала последнего сеанса</p>
              </div>
            </div>
            <div class="film">
              <div class="title">
                <p><b>Контакты</b></p>
              </div>
              <div class="desc">
                <p>Горячая линия: +88005553535.</p>
              </div>
            </div>
            <div class="film">
              <div class="title">
                <p><b>Обратная связь</b></p>
              </div>
              <div class="desc">
                <p>Отправляйте отзывы о работе кинотеатра на нашу электронную почту:</p>
              </div>
              <div class="desc">
                <p>kinoteatr@mail.ru.</p>
              </div>
            </div>
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
.enabled {
  background-color: #5D77D8;
}
.about {
  margin-left: 40px;
}
.block {
  margin-top: 25px;
  margin-bottom: 60px;
}
.block p {
  font-family: 'Inter';
  margin-left: px;
  font-size: 32px;
}
.scheduleback {
  margin-top: 20px;
  width: 100%;
  background: rgb(95, 121, 216, 0.612);
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
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
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
  font-size: 20px;
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
@media only screen and (min-width: 1180px) {
  .main-container {
    padding-top: 100px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 1180px;
    min-height: 980px;
    background: rgba(0, 0, 0, 0.36);
    box-shadow: 0px 5px 56px rgba(0, 0, 0, 0.35);
  }
}
@media only screen and (max-width: 1180px) {
  .main-container {
    padding-top: 4em;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 100%;
    min-height: 800px;
    background: rgba(0, 0, 0, 0.36);
    box-shadow: 0px 5px 56px rgba(0, 0, 0, 0.35);
  }
}
</style>
