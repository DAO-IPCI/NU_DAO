import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import i18n from './i18n';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        // primary: colors.red.darken1, // #E53935
        // secondary: colors.red.lighten4, // #FFCDD2
        // accent: colors.indigo.base, // #3F51B5  {
        primary: '#4caf50',
        secondary: '#009688',
        accent: '#8bc34a',
        error: '#f44336',
        warning: '#ff5722',
        info: '#00bcd4',
        success: '#03a9f4'
      }
    }
  }
});
