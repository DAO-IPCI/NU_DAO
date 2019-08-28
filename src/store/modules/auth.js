import Vue from 'vue';
import { apiAuth } from './api';

const state = {
  profile: {},
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  profile: state => state.profile
};

// actions
const actions = {
  request({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit('request');
      apiAuth({ url: 'auth', data: user, method: 'POST' })
        .then(resp => {
          localStorage.setItem('user-token', resp.token);
          commit('success', resp);
          dispatch('user');
          resolve(resp);
        })
        .catch(err => {
          commit('error', err);
          localStorage.removeItem('user-token');
          reject(err);
        });
    });
  },
  user({ commit, dispatch, state }) {
    commit('request');
    apiAuth({ url: 'user/me', data: { token: state.token } })
      .then(resp => {
        commit('user', resp);
      })
      .catch(() => {
        commit('error');
        dispatch('logout');
      });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('logout');
      localStorage.removeItem('user-token');
      resolve();
    });
  }
};

// mutations
const mutations = {
  request(state) {
    state.status = 'loading';
  },
  success(state, resp) {
    state.status = 'success';
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  error(state) {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  logout(state) {
    state.token = '';
  },
  user(state, resp) {
    state.status = 'success';
    Vue.set(state, 'profile', resp);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
