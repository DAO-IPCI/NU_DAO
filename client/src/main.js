import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import './plugins/fragment';
import store from './store';
import router from './router';
import './plugins/filters';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
