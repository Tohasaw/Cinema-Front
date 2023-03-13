//const { defineConfig } = require('@vue/cli-service');

module.exports = {
  devServer: {
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7052',
        changeOrigin: true,
      },
    },
  },
};