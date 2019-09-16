import axios from 'axios';
import config from '../../config';

// initial state
const state = {
  links: config.medium.links,
  list: []
};

// getters
const getters = {
  list: state => {
    return [
      ...state.links.map(item => ({
        icon: true,
        ...item
      })),
      ...state.list
    ];
  }
};

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
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${
            config.medium.user
          }`
        )
        .then(r => {
          const news = r.data.items
            .filter(item => {
              return !config.medium.links.find(x => x.link === item.link);
            })
            .slice(
              0,
              config.medium.count_all_links - config.medium.links.length
            )
            .map(item => {
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
