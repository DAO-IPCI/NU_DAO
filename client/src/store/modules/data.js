import api from '../../tools/api';

let date = null;
const d = new Date();
d.setMonth(d.getMonth() - 1);
let month = d.getMonth() + 1;
if (month < 10) {
  month = '0' + month;
}
date = month + '/' + d.getFullYear();

// initial state
const state = {
  month: date,
  members: [
    // {
    //   id: 1,
    //   name: 'asd'
    // }
  ],
  electricity: {
    // 1: {
    //   member_id: 1,
    //   list: [{
    //     month: '02/1920',
    //     value: 123
    //   }]
    // }
  },
  ghg_emission: {},
  ghg_balance: {},
  finance: {
    // 1: {
    //   member_id: 1,
    //   value: 123
    // }
  },
  carbon_burn: {
    // 1: {
    //   member_id: 1,
    //   value: 123
    // }
  }
};

// getters
const getters = {
  member: state => (id, month = false) => {
    const member = state.members.find(item => {
      return item.id === id;
    });
    const result = {
      name: member.name,
      electricity: 0,
      ghg_emission: 0,
      ghg_balance: 0,
      finance: 0
    };
    if (month) {
      if (state.electricity[id]) {
        const e = state.electricity[id].list.find(item => {
          return item.month === month;
        });
        if (e) {
          result.electricity = e.value;
        }
      }
      if (state.ghg_emission[id]) {
        const g = state.ghg_emission[id].list.find(item => {
          return item.month === month;
        });
        if (g) {
          result.ghg_emission = g.value;
        }
      }
      if (state.ghg_balance[id]) {
        const g = state.ghg_balance[id].list.find(item => {
          return item.month === month;
        });
        if (g) {
          result.ghg_balance = g.value;
        }
      }
      if (state.finance[id]) {
        result.finance = state.finance[id];
      }
      if (state.carbon_burn[id]) {
        result.carbon_burn = state.carbon_burn[id];
      }
    } else {
      if (state.electricity[id]) {
        state.electricity[id].list.forEach(item => {
          result.electricity += item.value;
        });
      }
      if (state.ghg_emission[id]) {
        state.ghg_emission[id].list.forEach(item => {
          result.ghg_emission += item.value;
        });
      }
      if (state.ghg_balance[id]) {
        state.ghg_balance[id].list.forEach(item => {
          result.ghg_balance += item.value;
        });
      }
      if (state.finance[id]) {
        result.finance = state.finance[id];
      }
      if (state.carbon_burn[id]) {
        result.carbon_burn = state.carbon_burn[id];
      }
    }
    return result;
  },
  current: (state, getters) => {
    return state.members.map(member => {
      return getters.member(member.id, state.month);
    });
  },
  all: (state, getters) => {
    return state.members.map(member => {
      return getters.member(member.id, false);
    });
  },
  min: state => {
    const d = {};
    Object.values(state.ghg_balance).forEach(item => {
      d[item.member_id] = 0;
      item.list.forEach(s => {
        if (s.month === state.month) {
          d[item.member_id] = s.value;
        }
      });
    });
    let max = null;
    Object.keys(d).forEach(member_id => {
      if (max === null || d[member_id] < max.value) {
        max = {
          member: '-',
          member_id: Number(member_id),
          value: d[member_id]
        };
      }
    });
    if (max === null) {
      return {
        member: '-',
        member_id: 0,
        value: 0
      };
    }
    const member = state.members.find(item => {
      return item.id === max.member_id;
    });
    if (member) {
      return {
        ...max,
        member: member.name
      };
    }
    return max;
  },
  max: state => {
    const d = {};
    Object.values(state.ghg_balance).forEach(item => {
      d[item.member_id] = 0;
      item.list.forEach(s => {
        if (s.month === state.month) {
          d[item.member_id] = s.value;
        }
      });
    });
    let max = null;
    Object.keys(d).forEach(member_id => {
      if (max === null || d[member_id] > max.value) {
        max = {
          member: '-',
          member_id: Number(member_id),
          value: d[member_id]
        };
      }
    });
    if (max === null) {
      return {
        member: '-',
        member_id: 0,
        value: 0
      };
    }
    const member = state.members.find(item => {
      return item.id === max.member_id;
    });
    if (member) {
      return {
        ...max,
        member: member.name
      };
    }
    return max;
  },
  sum: state => {
    let sum = 0;
    Object.values(state.ghg_balance).forEach(item => {
      item.list.forEach(s => {
        if (s.month === state.month) {
          sum += Number(s.value);
        }
      });
    });
    return sum;
  }
};

// actions
const actions = {
  async members({ commit }) {
    const members = await api.getMembers();
    commit('members', members);
  },
  async load({ dispatch }) {
    dispatch('loadByType', 'electricity');
    dispatch('loadByType', 'ghg_emission');
    // dispatch('loadByType', 'ghg_balance');
    dispatch('loadGhgBalance');
    dispatch('loadFinance');
    dispatch('loadCarbonBurn');
  },
  async loadFinance({ commit }) {
    const data = await api.getFinanceBalances();
    const result = {};
    data.forEach(item => {
      result[item.member_id] = item.financial_balance;
    });
    commit('setData', { type: 'finance', data: result });
  },
  async loadCarbonBurn({ commit }) {
    const data = await api.getCarbonBurn();
    const result = {};
    data.forEach(item => {
      result[item.member_id] = item.vcu_burned;
    });
    commit('setData', { type: 'carbon_burn', data: result });
  },
  async loadGhgBalance({ commit }) {
    let result = {};
    const data = await api.getGhgBalances(date);
    data.balances.forEach(item => {
      if (!result[item.member_id]) {
        result[item.member_id] = {
          member_id: item.member_id,
          list: []
        };
      }
      result[item.member_id].list.push({
        month: data.month,
        value: item.balance
      });
    });
    commit('setData', { type: 'ghg_balance', data: result });
  },
  async loadByType({ commit }, type) {
    let method;
    let field;
    if (type === 'electricity') {
      method = 'getElectricity';
      field = 'consumption';
    } else if (type === 'ghg_emission') {
      method = 'getGhgEmission';
      field = 'ghg_emission';
    } else if (type === 'ghg_balance') {
      // method = 'getGhgBalances';
      // field = 'ghg_balance';
    }
    const data = await api[method]();
    const result = {};
    data.forEach(row => {
      row.records.forEach(item => {
        if (!result[item.member_id]) {
          result[item.member_id] = {
            member_id: item.member_id,
            list: []
          };
        }
        result[item.member_id].list.push({
          month: row.month,
          value: item[field]
        });
      });
    });
    commit('setData', { type, data: result });
  },
  save(_, data = false) {
    return api.postElectricity(data);
  }
};

// mutations
const mutations = {
  members(state, members) {
    state.members = members;
  },
  setData(state, { type, data }) {
    state[type] = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
