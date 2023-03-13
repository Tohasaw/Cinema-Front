import { createApp } from 'vue';
import VuePlyr from 'vue-plyr';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-plyr/dist/vue-plyr.css';

createApp(App)
  .use(router)
  .use(store)
  .use(VuePlyr)
  .mount('#app');
