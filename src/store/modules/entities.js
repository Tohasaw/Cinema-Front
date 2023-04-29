import axios from 'axios';
import router from '@/router';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      router.push({ name: 'Login' });
    }
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token') !== null) {
      let token = `Bearer ${localStorage.getItem('token')}`;
      config.headers.Authorization = token;
    }
    return config;
  }
);

export default {
  namespaced: true,
  state: {
    users: null,
    movies: null,
    entries: null,
    prices: null,
    pricelists: null,
    pricesforlist: null,
    seatpricesforlist: null,
    seats: null,
    tickets: null,
    purchases: null,
    purchase: null,
    pages: null,
  },
  mutations: {
    updateEntries(state, entries) {
      state.entries = entries;
    },
    updateMovies(state, movies) {
      state.movies = movies;
    },
    updatePriceLists(state, pricelists) {
      state.pricelists = pricelists;
    },
    updatePricesForList(state, pricesforlist) {
      state.pricesforlist = pricesforlist;
    },
    updatePrices(state, prices) {
      state.prices = prices;
    },
    updateSeatPricesForList(state, seatpricesforlist) {
      state.seatpricesforlist = seatpricesforlist;
    },
    updateSeats(state, seats) {
      state.seats = seats;
    },
    updatePurchases(state, purchases) {
      state.purchases = purchases;
    },
    updatePurchase(state, purchase) {
      state.purchase = purchase;
    },
    updateTickets(state, tickets) {
      state.tickets = tickets;
    },
    updatePages(state, pages) {
      state.pages = pages;
    },
  },
  actions: {
    getData({ commit }, name) {
      axios.get(`/api/${name}`)
        .then((result) => commit(`update${name}`, result.data));
    },
    getDataPaged({ commit }, { name, pageSize, pageNumber }) {
      axios.get(`/api/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
        .then((result) => {
          commit(`update${name}`, result.data);
          commit('updatePages', parseInt(result.headers['pagecount']));
        });
    },
    postData({ commit }, { data, name }) {
      axios.post(`/api/${name}`, data)
        .then(() => {
          axios.get(`/api/${name}`)
            .then((result) => commit(`update${name}`, result.data));
        });
    },
    putData({ commit }, { data, name, id }) {
      axios.put(`/api/${name}/` + id, data)
        .then(() => {
          axios.get(`/api/${name}`)
            .then((result) => commit(`update${name}`, result.data));
        });
    },
    putRangeData({ commit }, { data, name }) {
      axios.put(`/api/${name}`, data)
        .then(() => {
          axios.get(`/api/${name}`)
            .then((result) => commit(`update${name}`, result.data));
        });
    },
    deleteData({ commit }, { name, id }) {
      axios.delete(`/api/${name}/` + id)
        .then(() => {
          axios.get(`/api/${name}`)
            .then((result) => commit(`update${name}`, result.data));
        });
    },
    getDataById({ commit }, { name, id }) {
      axios.get(`/api/${name}/${id}`)
        .then((result) => commit(`update${name}`, result.data));
    },
    postDataById({ commit }, { data, name, entityId }) {
      axios.post(`/api/${name}`, data)
        .then(() => {
          axios.get(`/api/${name}/` + entityId)
            .then((result) => commit(`update${name}`, result.data));
        });
    },
    deleteDataById({ commit }, { name, id, entityId }) {
      axios.delete(`/api/${name}/` + id)
        .then(() => {
          axios.get(`/api/${name}/${entityId}`)
            .then((result) => commit(`update${name}`, result.data));
        });
    },
    getPurchase({ commit }, { id }) {
      axios.get(`/api/purchases/${id}`)
        .then((result) => commit('updatePurchase', result.data));
    },
  }
};
