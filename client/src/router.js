import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Stat from './views/Stat';
import Login from './views/Login';
import Add from './views/Add';
import Map from './views/Map';
import History from './views/History';
import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/stat',
      name: 'stat',
      component: Stat
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    }
  ]
});
