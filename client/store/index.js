import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import Vuex from 'vuex'; // eslint-disable-line import/no-extraneous-dependencies
import feathersVuex, { initAuth } from 'feathers-vuex';
import feathersClient from '@/api';
import parseCookies from '@/utils/parse-cookies';

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  actions: {
    nuxtServerInit({ commit, dispatch }, { req }) {
      return initAuth({
        commit,
        dispatch,
        req,
        moduleName: 'auth',
        cookieName: 'feathers-jwt',
      });
    },
  },
  plugins: [service('pages'), auth({ userService: 'users' })],
});

export default () => store;
