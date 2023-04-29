<template>
  <div class="main-footer">
    <div class="content-footer">
      <div class="partleft">
        <div class="title">
          <p>Кинотеатр «Северянин»</p>
        </div>
        <div class="text">
          <p>Режим работы</p>
          <p>Открытие кассы: за 30 минут до начала первого сеанса </p>
          <p>Закрытие кассы: через 10 минут после начала последнего сеанса</p>
        </div>
      </div>
      <div class="partright">
        <div class="text">
          <p>Адрес</p>
          <p>г.Северодвинск, ул. Ломоносова, д. 23</p>
        </div>
        <div class="text">
          <p>Контакты</p>
          <p>Касса: +88005553535.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style scoped>
  /* @import url('https://fonts.googleapis.com/css2?family=Ruslan+Display&display=swap'); */
.main-footer {
  margin-top: auto;
  background: radial-gradient(143.3% 121.6% at 50% 0%, #586CA9 0%, rgba(88, 108, 169, 0) 100%), radial-gradient(47.29% 123.87% at 106.91% 100%, rgba(0, 255, 163, 0.27) 0%, rgba(0, 255, 163, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(26.54% 97.11% at 13.05% 82.31%, rgba(78, 49, 255, 0.45) 0%, rgba(93, 106, 216, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(34.9% 87.93% at 50% 129.59%, rgba(255, 148, 148, 0.46) 0%, rgba(255, 134, 134, 0) 100%);
  filter: drop-shadow(0px 13px 17px rgba(0, 0, 0, 0.28));
}
.text {
  line-height: 150%;
  margin-bottom: 20px;
}
.content-footer {
  height: 300px;
  box-sizing: border-box;
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 30px;
}

@media only screen and (min-width: 1180px) {
  .main-footer {
    width: 1180px;
  }
  .title {
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: 0;
  font-family: 'BookAntiqua-Italic';
  /* font-family: 'Lobelia'; */
  /* font-family: 'Eckmann Nouveau'; */
  text-decoration: none;
  }
  .text {
    font-size: 17px;
  }
}
@media only screen and (max-width: 1180px) {
  .main-footer {
    min-width: 100vw;
  }
  .title {
    margin-bottom: 30px;
    font-size: 1.7em;
    font-weight: 0;
    font-family: 'BookAntiqua-Italic';
    /* font-family: 'Lobelia'; */
    /* font-family: 'Eckmann Nouveau'; */
    text-decoration: none;
  }
  .text {
    font-size: 0.8em;
  }
}
</style>
