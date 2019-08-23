import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import news from './modules/news';
import data from './modules/data';

Vue.use(Vuex);

const debug = false;

export default new Vuex.Store({
  modules: {
    news,
    data
  },
  strict: true, // debug,
  plugins: debug ? [createLogger()] : []
});
