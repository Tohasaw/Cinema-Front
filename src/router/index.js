import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import MoviePage from '../views/MoviePage.vue';
import BrowseEntities from '../views/BrowseEntities.vue';
import Movies from '../views/movies/Movies.vue';
import Entries from '../views/entries/Data.vue';
import Seats from '../views/seats/Data.vue';
import PriceLists from '../views/pricelists/Data.vue';
import Prices from '../views/prices/Data.vue';
import PricesForList from '../views/pricelists/pricesforlist/Data.vue';
import SeatPrices from '../views/pricelists/seatprices/Data.vue';
import Purchases from '../views/purchases/Data.vue';
import Tickets from '../views/purchases/tickets/Data.vue';
import EmptyPage from '../views/Empty.vue';
import TicketCheck from '../views/ticketcheck/Page.vue';
import LoginPage from '../views/Login.vue';
import AboutPage from '../views/About.vue';
import HeaderMain from '../headers/main-header.vue';
import HeaderAdmin from '../headers/admin-header.vue';
import PurchaseInfo from '../views/PurchaseInfo.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
      header: HeaderMain,
    },
  }, {
    path: '/movie/:id',
    name: 'Movie',
    components: {
      default: MoviePage,
      header: HeaderMain,
    },
    props: true,
    beforeEnter(to, from, next) {
      const isValidId = Number.isInteger(Number(to.params.id));
      next(isValidId);
    },
  }, {
    path: '/purchase/:refundKey',
    name: 'Purchase',
    components: {
      default: PurchaseInfo,
      header: HeaderMain,
    },
    props: true,
    beforeEnter(to, from, next) {
      next();
    },
  }, {
    path: '/browse',
    name: 'BrowseEntities',
    components: {
      default: BrowseEntities,
      header: HeaderAdmin,
    },
    beforeEnter: (to, from, next) => {
      if (Object.prototype.hasOwnProperty.call(localStorage, 'token') &&
        (localStorage.getItem('userRole') !== 'cassir' || localStorage.getItem('userRole') !== 'admin' || localStorage.getItem('userRole') !== 'controler')) next();
      else next({ path: '/login' });
    },
    children: [
      {
        name: 'BrowseMovies',
        path: 'movies',
        component: Movies,
      },
      {
        name: 'BrowseEntries',
        path: 'entries',
        component: Entries,
      },
      {
        name: 'BrowseSeats',
        path: 'seats',
        component: Seats,
      },
      {
        name: 'BrowsePrices',
        path: 'prices',
        component: Prices,
      },
      {
        name: 'BrowsePriceLists',
        path: 'pricelists',
        component: PriceLists,
      },
      {
        name: 'BrowsePricesForList',
        path: 'pricelists/:id',
        component: PricesForList,
        props: true,
        beforeEnter(to, from, next) {
          const isValidId = Number.isInteger(Number(to.params.id));
          next(isValidId);
        },
      },
      {
        name: 'BrowseSeatPrices',
        path: 'seatprices/:id',
        component: SeatPrices,
        props: true,
        beforeEnter(to, from, next) {
          const isValidId = Number.isInteger(Number(to.params.id));
          next(isValidId);
        },
      },
      {
        name: 'BrowsePurchases',
        path: 'purchases',
        component: Purchases,
      },
      {
        name: 'BrowseTicketsForPurchase',
        path: 'purchases/:id',
        component: Tickets,
        props: true,
      },
      {
        name: 'Empty',
        path: 'blank',
        component: EmptyPage,
      },
    ]
  }, {
    path: '/login',
    name: 'Login',
    components: {
      header: HeaderMain,
      default: LoginPage,
    }
  }, {
    name: 'TicketCheck',
    path: '/ticketcheck',
    components: {
      default: TicketCheck,
      header: HeaderAdmin,
    }
  }, {
    path: '/about',
    name: 'About',
    components: {
      header: HeaderMain,
      default: AboutPage,
    }
  }]
});
