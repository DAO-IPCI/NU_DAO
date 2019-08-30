import axios from 'axios';

const url = 'http://hbrz.khassanov.me/api/v1';

const db = {
  members: [
    {
      id: 1,
      name: 'Блок Б'
    },
    {
      id: 2,
      name: 'Технопарк'
    }
  ],
  electricity: [
    {
      month: '01/1970',
      records: [
        { member_id: 1, consumption: 28341 },
        { member_id: 2, consumption: 11243 },
        { member_id: 3, consumption: 536 },
        { member_id: 4, consumption: 113 },
        { member_id: 5, consumption: 4243 }
      ]
    },
    {
      month: '02/1970',
      records: [
        { member_id: 1, consumption: 28341 },
        { member_id: 2, consumption: 11243 },
        { member_id: 3, consumption: 536 },
        { member_id: 4, consumption: 113 },
        { member_id: 5, consumption: 4243 }
      ]
    },
    {
      month: '01/1971',
      records: [
        { member_id: 1, consumption: 28341 },
        { member_id: 2, consumption: 11243 },
        { member_id: 3, consumption: 536 },
        { member_id: 4, consumption: 113 },
        { member_id: 5, consumption: 4243 }
      ]
    },
    {
      month: '02/1971',
      records: [
        { member_id: 1, consumption: 28341 },
        { member_id: 2, consumption: 11243 },
        { member_id: 3, consumption: 536 },
        { member_id: 4, consumption: 113 },
        { member_id: 5, consumption: 4243 }
      ]
    },
    {
      month: '02/1972',
      records: [
        { member_id: 1, consumption: 28341 },
        { member_id: 2, consumption: 11243 },
        { member_id: 3, consumption: 536 },
        { member_id: 4, consumption: 113 },
        { member_id: 5, consumption: 4243 }
      ]
    }
  ],
  ghg: [
    {
      month: '01/1970',
      records: [
        { member_id: 1, ghg: 28341 },
        { member_id: 2, ghg: 11243 },
        { member_id: 3, ghg: 536 },
        { member_id: 4, ghg: 113 },
        { member_id: 5, ghg: 4243 }
      ]
    },
    {
      month: '02/1970',
      records: [
        { member_id: 1, ghg: 28341 },
        { member_id: 2, ghg: 11243 },
        { member_id: 3, ghg: 536 },
        { member_id: 4, ghg: 113 },
        { member_id: 5, ghg: 4243 }
      ]
    },
    {
      month: '01/1971',
      records: [
        { member_id: 1, ghg: 28341 },
        { member_id: 2, ghg: 11243 },
        { member_id: 3, ghg: 536 },
        { member_id: 4, ghg: 113 },
        { member_id: 5, ghg: 4243 }
      ]
    },
    {
      month: '02/1971',
      records: [
        { member_id: 1, ghg: 28341 },
        { member_id: 2, ghg: 11243 },
        { member_id: 3, ghg: 536 },
        { member_id: 4, ghg: 113 },
        { member_id: 5, ghg: 4243 }
      ]
    },
    {
      month: '02/1972',
      records: [
        { member_id: 1, ghg: 28341 },
        { member_id: 2, ghg: 11243 },
        { member_id: 3, ghg: 536 },
        { member_id: 4, ghg: 113 },
        { member_id: 5, ghg: 4243 }
      ]
    }
  ],
  finance: [
    {
      month: '01/1970',
      records: [
        { member_id: 1, finance: 0 },
        { member_id: 2, finance: 0 },
        { member_id: 3, finance: 0 },
        { member_id: 4, finance: 0 },
        { member_id: 5, finance: 0 }
      ]
    },
    {
      month: '02/1970',
      records: [
        { member_id: 1, finance: 0 },
        { member_id: 2, finance: 0 },
        { member_id: 3, finance: 0 },
        { member_id: 4, finance: 0 },
        { member_id: 5, finance: 0 }
      ]
    },
    {
      month: '01/1971',
      records: [
        { member_id: 1, finance: 0 },
        { member_id: 2, finance: 0 },
        { member_id: 3, finance: 0 },
        { member_id: 4, finance: 0 },
        { member_id: 5, finance: 0 }
      ]
    },
    {
      month: '02/1971',
      records: [
        { member_id: 1, finance: 0 },
        { member_id: 2, finance: 0 },
        { member_id: 3, finance: 0 },
        { member_id: 4, finance: 0 },
        { member_id: 5, finance: 0 }
      ]
    },
    {
      month: '02/1972',
      records: [
        { member_id: 1, finance: 0 },
        { member_id: 2, finance: 0 },
        { member_id: 3, finance: 0 },
        { member_id: 4, finance: 0 },
        { member_id: 5, finance: 0 }
      ]
    }
  ]
};

function get(params) {
  return axios.get(url + params).then(r => {
    return r.data;
  });
}
function post(params, data) {
  return axios.post(url + params, data);
  // .then(r => {
  //   console.log(r);
  //   // return r.data;
  // });
}
export function getMembers() {
  return get('/members');
  // return new Promise(resolve => resolve(db.members));
}
export function getElectricity(date = null) {
  if (date) {
    return get('/members/electricity/consumptions?month=' + date);
    // return new Promise(resolve => resolve(db.electricity));
  }
  return get('/members/electricity/consumptions');
  // return new Promise(resolve => resolve(db.electricity));
}
export function getGhg(date = null) {
  if (date) {
    return get('/members/ghg/emissions?month=' + date);
    // return new Promise(resolve => resolve(db.ghg));
  }
  return get('/members/ghg/emissions');
  // return new Promise(resolve => resolve(db.ghg));
}
export function getGhgBalances(date = null) {
  if (date) {
    return get('/members/ghg/balances?month=' + date);
    // return new Promise(resolve => resolve(db.ghg));
  }
  return get('/members/ghg/balances');
  // return new Promise(resolve => resolve(db.ghg));
}
export function getFinance(date = null) {
  if (date) {
    // return get('/members/finance/balances?month=' + date);
    return new Promise(resolve => resolve(db.finance));
  }
  // return get('/members/finance/balances');
  return new Promise(resolve => resolve(db.finance));
}
export function save(data) {
  return post('/members/electricity/consumptions', data);
  // return new Promise(resolve => resolve(true));
}

const mocks = {
  auth: {
    POST: data => {
      if (data.login === 'admin' && data.password === 'admin') {
        return { token: 'This-is-a-mocked-token' };
      }
      throw new Error('err');
    }
  },
  'user/me': {
    GET: data => {
      if (data.token === 'This-is-a-mocked-token') {
        return { name: 'admin' };
      }
      throw new Error('err');
    }
  }
};

export const apiAuth = ({ url, method, data }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || 'GET'](data));
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });
};

export default {
  getMembers,
  getElectricity,
  getGhg,
  getGhgBalances,
  getFinance,
  save
};
