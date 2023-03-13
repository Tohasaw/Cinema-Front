import { createStore } from 'vuex';

import entitiesModule from './modules/entities';
import mainModule from './modules/main';
import imagesModule from './modules/images';
import authModule from './modules/auth';
import ticketcheckModule from './modules/ticketcheck';

export default createStore({
  modules: {
    main: mainModule,
    images: imagesModule,
    entities: entitiesModule,
    ticketcheck: ticketcheckModule,
    auth: authModule,
  },
});
