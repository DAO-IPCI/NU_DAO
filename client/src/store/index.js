import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import news from './modules/news';
import data from './modules/data';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = false;

export default new Vuex.Store({
  modules: {
    news,
    data,
    auth
  },
  strict: true, // debug,
  plugins: debug ? [createLogger()] : []
});
