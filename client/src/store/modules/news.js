import axios from 'axios';

// initial state
const state = {
  list: []
};

// getters
const getters = {};

// actions
const actions = {
  load({ commit }) {
    let local = false;
    const object = JSON.parse(localStorage.getItem('key'));
    if (object && object.timestamp + 60000 * 10 > new Date().getTime()) {
      commit('news', object.list);
      local = true;
    }
    if (!local) {
      axios
        .get(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@airalab'
        )
        .then(r => {
          const news = r.data.items.slice(0, 5).map(item => {
            return {
              title: item.title,
              link: item.link,
              pubDate: new Date(item.pubDate).toLocaleString()
            };
          });
          commit('news', news);
          localStorage.setItem(
            'key',
            JSON.stringify({ list: news, timestamp: new Date().getTime() })
          );
        });
    }
  }
};

// mutations
const mutations = {
  news(state, list) {
    state.list = list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
