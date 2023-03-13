import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      movie: null,
      movies: null,
      seats: null,
      seatPrices: null,
      myTickets: null,
      pricesForList: null,
      purchase: null,
    };
  },
  getters: {
    getSeatInfos: (state) => state.seatInfos,
  },
  mutations: {
    updateMovie(state, data) {
      state.movie = data;
    },
    updateMovies(state, data) {
      state.movies = data;
    },
    updateSeats(state, data) {
      state.seats = data;
    },
    updateSeatPrices(state, data) {
      state.seatPrices = data;
    },
    updatePricesForList(state, data) {
      state.pricesForList = data;
    },
    updateMyTickets(state, data) {
      state.myTickets = data;
    },
    updatePurchase(state, data) {
      state.purchase = data;
    }
  },
  actions: {
    getMovie({ commit }, movieId) {
      axios.get(`/api/main/movie/${movieId}`)
        .then((result) => commit('updateMovie', result.data))
        .catch(console.error);
    },
    getMovies({ commit }) {
      axios.get('/api/main/movies')
        .then((result) => commit('updateMovies', result.data))
        .catch(console.error);
    },
    getPricesForList({ commit }, priceListId) {
      axios.get(`/api/main/pricesforlist/${priceListId}`)
        .then((result) => commit('updatePricesForList', result.data))
        .catch(console.error);
    },
    getSeatPrices({ commit }, tableEntryId) {
      axios.get(`/api/main/seatprices/${tableEntryId}`)
        .then((result) => commit('updateSeatPrices', result.data))
        .catch(console.error);
    },
    getSeats({ commit }) {
      axios.get('/api/main/seats')
        .then((result) => commit('updateSeats', result.data))
        .catch(console.error);
    },
    getPurchase({ commit }, { refundKey }) {
      axios.get(`/api/main/purchase/${refundKey}`)
        .then((result) => commit('updatePurchase', result.data))
        .catch(console.error);
    },
    postTickets({ commit }, { data, router }) {
      axios.post('/api/main/tickets', data)
        .then(() => {
          axios.get('/api/main/seatinfos', data)
            .then((result) => commit('updateSeatInfos', result.data))
            .catch(console.error);
          router.push({ name: 'Home' });
        })
        .catch(console.error);
    },
    getMyTickets({ commit }) {
      axios.get('/api/main/mytickets')
        .then((result) => commit('updateMyTickets', result.data))
        .catch(console.error);
    },
    updateMyTicket({ commit }, { data }) {
      axios.put('/api/main/purchase', data)
        .then(
          axios.get(`/api/main/purchase/${data.refundKey}`)
            .then((result) => commit('updatePurchase', result.data))
            .catch(console.error)
        )
        .catch(console.error);
    },
  },
};
