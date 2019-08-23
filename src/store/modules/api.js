// import axios from 'axios';

const url = 'https://simple.com/api/v1';

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
  electricity_all: [
    {
      id_member: 1,
      value: 245
    },
    {
      id_member: 2,
      value: 504
    }
  ],
  ghg_all: [
    {
      id_member: 1,
      value: 1232
    },
    {
      id_member: 2,
      value: 1603
    }
  ],
  finance_all: [
    {
      id_member: 1,
      value: 23
    },
    {
      id_member: 2,
      value: 34
    }
  ],
  electricity: [
    {
      id_member: 1,
      value: 24
    },
    {
      id_member: 2,
      value: 50
    }
  ],
  ghg: [
    {
      id_member: 1,
      value: 159
    },
    {
      id_member: 2,
      value: 160
    }
  ],
  finance: [
    {
      id_member: 1,
      value: 5
    },
    {
      id_member: 2,
      value: 4
    }
  ]
};

function get(params) {
  // eslint-disable-next-line no-console
  console.log(url + params);
  // return axios.get(url + params).then(r => {
  //   return r.data;
  // });
}
export function getMembers() {
  get('/members');
  return new Promise(resolve => resolve(db.members));
}
export function getElectricity(date = null) {
  if (date) {
    get('/members/electricity/consumptions?date=' + date);
    return new Promise(resolve => resolve(db.electricity));
  }
  get('/members/electricity/consumptions');
  return new Promise(resolve => resolve(db.electricity_all));
}
export function getGhg(date = null) {
  if (date) {
    get('/members/ghg/balances?date=' + date);
    return new Promise(resolve => resolve(db.ghg));
  }
  get('/members/ghg/balances');
  return new Promise(resolve => resolve(db.ghg_all));
}
export function getFinance(date = null) {
  if (date) {
    get('/members/finance/balances?date=' + date);
    return new Promise(resolve => resolve(db.finance));
  }
  get('/members/finance/balances');
  return new Promise(resolve => resolve(db.finance_all));
}
export default {
  getMembers,
  getElectricity,
  getGhg,
  getFinance
};
