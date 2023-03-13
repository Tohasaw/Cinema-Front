import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      error: '',
      credentials: {
        token: localStorage.getItem('token') || null,
        userRole: localStorage.getItem('userRole') || null,
        email: localStorage.getItem('email') || null,
      }
    };
  },
  getters: {
    getUserRole: (state) => state.credentials.userRole,
    getToken: (state) => state.credentials.token,
    getError: (state) => state.error,
    getEmail: (state) => state.credentials.email,
  },
  mutations: {
    setToken(state, token) {
      state.credentials.token = token;
      localStorage.setItem('token', token);
    },
    setUserRole(state, userRole) {
      state.credentials.userRole = userRole;
      localStorage.setItem('userRole', userRole);
    },
    setEmail(state, email) {
      state.credentials.email = email;
      localStorage.setItem('email', email);
    },
    deleteToken(state) {
      state.credentials.token = null;
      localStorage.removeItem('token');
    },
    deleteUserRole(state) {
      state.credentials.userRole = null;
      localStorage.removeItem('userRole');
    },
    deleteEmail(state) {
      state.credentials.email = null;
      localStorage.removeItem('email');
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    onLogin({ commit }, { data, router }) {
      axios.post('/api/login', data)
        .then((response) => {
          commit('setToken', response.data.token);
          commit('setUserRole', response.data.userRole);
          commit('setEmail', response.data.email);
          commit('setError', '');
          router.push({ name: 'Empty' });
        })
        .catch((err) => {
          if (err !== undefined) {
            console.log(err);
            commit('setError', err.response.data.ErrorMessage);
          }
        });
    },
    onSignin({ commit }, { data, router }) {
      axios.post('/api/signin', data)
        .then(() => {
          commit('setError', '');
          router.push({ name: 'Login' });
        })
        .catch((err) => {
          commit('setError', err.response.data.ErrorMessage);
        });
    },
    onLogout({ commit }) {
      commit('deleteToken');
      commit('deleteUserRole');
      commit('deleteEmail');
    },
  },
};
