<template>
<div class="admin-content">
  <div class="admin-container">
    <admin-nav-menu></admin-nav-menu>
    <div class="subcont">
      Выберите страницу
    </div>
  </div>
</div>
</template>

<script>
import AdminNavMenu from '../sidebars/AdminNavMenu.vue';

export default {
  name: 'Entries',
  data() {
    return {
    };
  },
  components: {
    AdminNavMenu,
  },
};
</script>

<style scoped>
.admin-container p {
  font-size: 30px;
}
.subcont {
  margin: 30px;
  margin-bottom: 30px;
}
th {
  margin: auto;
}
#window{
  z-index: 5;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease-in;
  max-height: 412px;
}
.v-enter-from,
.v-leave-to
{
  opacity: 0;
  max-height: 0px;
}
.close-button {
  left: calc(100vw * 0.5 + 103px + 500px);
}
.block {
  z-index: -5;
  margin-top: 25px;
  margin-bottom: 60px;
}
.block p {
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
  padding: 20px;
  margin-top: 20px;
  width: 1001px;
  background: linear-gradient(90deg, rgba(193, 189, 189, 0.4) 0%, rgba(85, 85, 85, 0.6) 100%);
  min-height: 700px;
}
.back > p {
  font-size: 20px;
}
table {
  position: relative;
  z-index: 1;
  line-height: 40px;
  margin: 0px;
  text-align: left;
  width:100%;
  border-spacing: 0px 0px;
  margin-bottom: 40px;
}
.data th:first-child {
  border-top-left-radius: 10px;
}
.data th:last-child {
  border-top-right-radius: 10px;
}
.data th {
  background: rgba(255, 255, 255, 0.116);
  /* border-bottom: solid 1px rgba(255, 255, 255, 0.459); */
}
.data tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.116);
}
.data tr:last-child {
  border: 10px;
  background: none;
}
.data tr:last-child td {
  border: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
  background: rgba(255, 255, 255, 0.116);
}
.data {
  text-align: center;
}
.line {
  width: 437%;
  height: 1px;
  background: white;
}
.title {
  display: flex;
  font-family: 'Inter';
  font-size: 20px;
  height: 60px;
}
.title p {
  width: 70%;
}
.buttons {
  border-radius: 20px;
  margin-left: 0%;
  width: 30%;
  display:flex;
  height: 40px;
  background: rgba(0, 2, 10, 0.55);
}
.el {
  width: 45%;
}
.button-create {
  border-radius: 20px;
  margin-left: 10%;
  height: 40px;
  text-align: center;
}
.bottom {
  display: flex;
  margin: auto;
  font-family: 'Inter';
  font-size: 20px;
  height: 10px;
  width: 100px;
}
.button-dropdown {
  display: inline;
}
.dropbtn {
  border-radius: 20px;
  position: relative;
  width: 100%;
  height: 40px;
  color: #5E7CE7;
  font-size: 16px;
  font-weight: bold;
  border: none;
}
.dropdown-content {
  position: relative;
  font-size: 16px;
  display: none;
  margin-left: 0;
  margin-right: 0;
  background-color: #f1f1f1;

  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.show-modal-button {
  height: 10px;
}
.dropdown-content a:hover {background-color: #ddd;}
.button-dropdown:hover .dropdown-content {display: block;}
.button-dropdown:hover .dropbtn {
  background-color: #5E7CE7;
  color: white;
}
</style>
