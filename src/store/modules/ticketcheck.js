import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      ticket: null,
      status: null,
    };
  },
  mutations: {
    updateTicket(state, ticket) {
      state.ticket = ticket;
    },
    updateStatus(state, status) {
      state.status = status;
    },
  },
  actions: {
    getTicket({ commit }, { ticketKey }) {
      axios.get(`/api/ticketcheck/${ticketKey}`)
        .then((response) => {
          commit('updateTicket', response.data);
        });
    },
    markTicketVisited({ commit }, { ticketKey }) {
      axios.post(`/api/ticketcheck/${ticketKey}`)
        .then(() => {
          commit('setError', '');
        });
    },
  },
};
