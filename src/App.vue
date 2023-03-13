<template>
<body>
  <header>
    <router-view name="header"/>
  </header>
  <main>
    <router-view name="sidebar"/>
    <router-view/>
  </main>
  <footer>
    Сайт нашкодил шпагето, 2023г.
  </footer>
</body>
</template>

<script>
export default {
  name: 'App'
};
</script>
<style>
.content {
  margin: auto;
  display: flex;
  width: 100%;
  background:
    radial-gradient(44.11% 73.96% at 39.32% -1.04%, rgba(82, 0, 255, 0.46) 0%, rgba(189, 171, 240, 0) 76.04%),
    radial-gradient(49.45% 84.51% at 90.68% 96.35%, #B1E5CC 0%, rgba(194, 177, 229, 0) 100%),
    radial-gradient(72.31% 146.09% at -6.3% 130.52%, rgba(94, 124, 231, 0.76) 0%, rgba(177, 188, 229, 0) 64.58%),
    linear-gradient(0deg, #293435, #293435), rgba(133, 248, 255, 0.24);
}
main {
  display: flex;

}
.admin-content {
  margin: auto;
  width: 100%;
  background:
    radial-gradient(44.11% 73.96% at 39.32% -1.04%, rgba(82, 0, 255, 0.46) 0%, rgba(189, 171, 240, 0) 76.04%),
    radial-gradient(49.45% 84.51% at 90.68% 96.35%, #B1E5CC 0%, rgba(194, 177, 229, 0) 100%),
    radial-gradient(72.31% 146.09% at -6.3% 130.52%, rgba(94, 124, 231, 0.76) 0%, rgba(177, 188, 229, 0) 64.58%),
    linear-gradient(0deg, #293435, #293435), rgba(133, 248, 255, 0.24);
  /* background: radial-gradient(44.11% 73.96% at 39.32% -1.04%, rgba(82, 0, 255, 0.46) 0%, rgba(189, 171, 240, 0) 76.04%),
  radial-gradient(49.45% 84.51% at 90.68% 96.35%, #B1E5CC 0%, rgba(194, 177, 229, 0) 100%),
  radial-gradient(72.31% 146.09% at -6.3% 130.52%, rgba(94, 124, 231, 0.76) 0%, rgba(177, 188, 229, 0) 64.58%),
  rgba(133, 248, 255, 0.24); */
}
.admin-container {
  margin-left: auto;
  margin-right: auto;
  display: block;
  max-width: 1180px;
  min-height: 100vh;
  /* min-height: calc(100vh - 103px - 55px); */
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.36);
  box-shadow: 0px 5px 56px rgba(0, 0, 0, 0.35);
}
@media only screen and (min-width: 1180px) {
  .admin-container {
    padding-top: 100px;
  }
  .nav-menu {
    height: 40px;
    background: rgba(0, 2, 10, 0.55);
  }
  .nav-menu-button {
    text-decoration: none;
    padding: 4px;
    border-radius: 20px;
    box-sizing:border-box;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 40px;
    font-size: 24px;
    height: 40px;
  }
  .nav-menu-button:hover {
    background-color: #8498e1;
  }
  .std {
    border-radius: 20px;
    display: flex;
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
  }
}
@media only screen and (max-width: 1180px) {
  .admin-container {
    padding-top: 5em;
  }
  .nav-menu {
    background: rgba(0, 2, 10, 0.55);
  }
  .nav-menu-button {
    padding: 0.3em;
    border-radius: 1em;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.3em;
    height: 2em;
    margin-right: 1em;
  }
  .std {
    border-radius: 1.2em;
    display: flex;
    margin-top: 1em;
    margin-left: 1em;
    margin-right: 1em;
  }
  footer {
    font-size: 0.8em;
  }
}
a {
  color: rgb(247, 247, 247);
  text-decoration: none;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Inter';
  color: rgb(247, 247, 247);
}
* {
  margin: 0;
}
html, body {
  position: relative;
}
#logo img {
  position:absolute;
  margin-left: 15px;
  height: 62px;
  width: 62px;
}
footer {
  position: absolute;
  background: #ADFF98;
  font-family: 'Inter';
  padding: 5px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  color: black;
}

/* @media only screen and (min-width: 768px) {
  .menu {
    position: fixed;
  }
}
@media only screen and (max-width: 768px) {
    .menu {
      width: 100%;
      height: auto;
    }
    .container {

      margin-left: 0px;
    }
    .title {
      font-size: 20pt;
    }
} */

/*///  CUSTOM FONTS  ///*/
@font-face {
  font-family: Inter; src: url('fonts/Inter-Regular.otf');
}
@font-face {
  font-family: Inter-Bold; src: url('fonts/Inter-Bold.otf');
}
@font-face {
  font-family: BookAntiqua-Italic; src: url('fonts/BookAntiqua-Italic.ttf') format("truetype");
}
@font-face {
  font-family: BookAntiqua; src: url('fonts/BookAntiqua.ttf') format("truetype");
}
</style>
