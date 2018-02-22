const { resolve } = require('path');

module.exports = {
  srcDir: resolve(__dirname, 'client'),
  dev: process.env.NODE_ENV !== 'production',
  head: {
    titleTemplate: 'Feathers + Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A Feathers + Nuxt demo/boilerplate' },
    ],
  },
  build: {
    vendor: [
      '@feathersjs/feathers',
      '@feathersjs/socketio-client',
      'socket.io-client',
      '@feathersjs/authentication-client',
    ],
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: 'favicon.ico',
    },
  ],
  css: ['normalize.css', '@/assets/css/main.css'],
};
