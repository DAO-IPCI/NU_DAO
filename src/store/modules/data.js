import api from './api';

// initial state
const state = {
  members: [],
  electricity: {
    all: [],
    current: []
  },
  ghg: {
    all: [],
    current: []
  },
  finance: {
    all: [],
    current: []
  }
};

// getters
const getters = {
  member: state => (id, isAll = false) => {
    const member = state.members.find(item => {
      return item.id === id;
    });
    const result = {
      name: member.name,
      electricity: 0,
      ghg: 0,
      finance: 0
    };
    const electricity = state.electricity[isAll ? 'all' : 'current'].find(
      item => {
        return item.id_member === member.id;
      }
    );
    if (electricity) {
      result.electricity = electricity.value;
    }
    const ghg = state.ghg[isAll ? 'all' : 'current'].find(item => {
      return item.id_member === member.id;
    });
    if (ghg) {
      result.ghg = ghg.value;
    }
    const finance = state.finance[isAll ? 'all' : 'current'].find(item => {
      return item.id_member === member.id;
    });
    if (finance) {
      result.finance = finance.value;
    }
    return result;
  },
  current: (state, getters) => {
    return state.members.map(member => {
      return getters.member(member.id, false);
    });
  },
  all: (state, getters) => {
    return state.members.map(member => {
      return getters.member(member.id, true);
    });
  },
  min: state => {
    let min = null;
    state.ghg.current.forEach(item => {
      if (min === null || item.value < min.value) {
        min = item;
      }
    });
    if (!min) {
      return {
        member: '-',
        value: 0
      };
    }
    const member = state.members.find(item => {
      return item.id === min.id_member;
    });
    return {
      member: member.name,
      value: min.value
    };
  },
  max: state => {
    let max = null;
    state.ghg.current.forEach(item => {
      if (max === null || item.value > max.value) {
        max = item;
      }
    });
    if (!max) {
      return {
        member: '-',
        value: 0
      };
    }
    const member = state.members.find(item => {
      return item.id === max.id_member;
    });
    return {
      member: member.name,
      value: max.value
    };
  }
};

// actions
const actions = {
  async members({ commit }) {
    const members = await api.getMembers();
    commit('members', members);
  },
  async load({ commit }, isAll = false) {
    let date = null;
    if (!isAll) {
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      date = month + '/' + new Date().getFullYear();
    }
    const electricity = await api.getElectricity(date);
    commit('electricity', { isAll, electricity });
    const ghg = await api.getGhg(date);
    commit('ghg', { isAll, ghg });
    const finance = await api.getFinance(date);
    commit('finance', { isAll, finance });
  }
};

// mutations
const mutations = {
  members(state, members) {
    state.members = members;
  },
  electricity(state, { isAll, electricity }) {
    if (isAll) {
      state.electricity = {
        ...state.electricity,
        all: electricity
      };
    } else {
      state.electricity = {
        ...state.electricity,
        current: electricity
      };
    }
  },
  ghg(state, { isAll, ghg }) {
    if (isAll) {
      state.ghg = {
        ...state.ghg,
        all: ghg
      };
    } else {
      state.ghg = {
        ...state.ghg,
        current: ghg
      };
    }
  },
  finance(state, { isAll, finance }) {
    if (isAll) {
      state.finance = {
        ...state.finance,
        all: finance
      };
    } else {
      state.finance = {
        ...state.finance,
        current: finance
      };
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
