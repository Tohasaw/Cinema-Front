// import axios from 'axios';

export default {
  namespaced: true,
  state: {
    imagePath: null,
    imagePreview: null,
  },
  mutations: {
    updateImagePath(state, imagePath) {
      state.imagePath = imagePath;
    },
    updateImagePreview(state, image) {
      state.imagePreview = image;
    }
  },
  actions: {
    updateImagePreview({ commit }, image) {
      commit('updateImagePreview', image);
    }
  },
};
