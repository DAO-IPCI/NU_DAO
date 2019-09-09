import api from './api-server';
// import api from './api-mock';

function getMembers() {
  return api.get('/members');
}
function getElectricity() {
  return api.get('/members/electricity/consumptions');
}
function getGhgEmission() {
  return api.get('/members/ghg/emissions');
}
function getGhgBalances(date) {
  return api.get('/members/ghg/balances?month=' + date + '&mitigated=true');
}
function getFinanceBalances() {
  return api.get('/members/finance/balances');
}
function getCarbonBurn() {
  return api.get('/members/finance/carbon_units_burned');
}
function postElectricity(data) {
  return api.post('/members/electricity/consumptions', data);
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

function auth({ url, method, data }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || 'GET'](data));
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });
}

export default {
  getMembers,
  getElectricity,
  getGhgEmission,
  getGhgBalances,
  getFinanceBalances,
  getCarbonBurn,
  postElectricity,
  auth
};
