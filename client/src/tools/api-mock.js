const db = {
  members: [
    {
      id: 1.0,
      name: 'Тестовый участник 1',
      ethereum_address: '0x3e46243259165152badf2EEB6fE324165cBf81c9'
    },
    {
      id: 2.0,
      name: 'Тестовый участник 2',
      ethereum_address: '0x3e46243259165152badf2EEB6fE324165cBf81c9'
    },
    {
      id: 3.0,
      name: 'Тестовый участник 3',
      ethereum_address: '0x3e46243259165152badf2EEB6fE324165cBf81c9'
    },
    {
      id: 4.0,
      name: 'Тестовый участник 4',
      ethereum_address: '0x3e46243259165152badf2EEB6fE324165cBf81c9'
    },
    {
      id: 5.0,
      name: 'Тестовый участник 5',
      ethereum_address: '0x3e46243259165152badf2EEB6fE324165cBf81c9'
    }
  ],
  electricity: [
    {
      month: '01/1970',
      records: [
        { member_id: 1, consumption: 22000 },
        { member_id: 2, consumption: 33333 },
        { member_id: 3, consumption: 100 },
        { member_id: 4, consumption: 100 },
        { member_id: 5, consumption: 843 }
      ]
    },
    {
      month: '01/1971',
      records: [
        { member_id: 1, consumption: 5555 },
        { member_id: 2, consumption: 4444 },
        { member_id: 3, consumption: 28345 },
        { member_id: 4, consumption: 3400 },
        { member_id: 5, consumption: 1202 }
      ]
    },
    { month: 'string', records: [{ member_id: 0, consumption: 0 }] },
    { month: 'string', records: [{ member_id: 0, consumption: 0 }] },
    { month: 'string', records: [{ member_id: 0, consumption: 0 }] },
    {
      month: '08/2019',
      records: [
        { member_id: 1, consumption: 1 },
        { member_id: 2, consumption: 2 },
        { member_id: 3, consumption: 3 },
        { member_id: 4, consumption: 4 },
        { member_id: 5, consumption: 5 }
      ]
    },
    {
      month: '07/2019',
      records: [
        { member_id: 1, consumption: 17340 },
        { member_id: 2, consumption: 11740 },
        { member_id: 3, consumption: 1743 },
        { member_id: 4, consumption: 84312 },
        { member_id: 5, consumption: 782 }
      ]
    },
    {
      month: '08/1970',
      records: [
        { member_id: 1, consumption: 17340 },
        { member_id: 2, consumption: 11740 },
        { member_id: 3, consumption: 1743 },
        { member_id: 4, consumption: 84312 },
        { member_id: 5, consumption: 782 }
      ]
    },
    {
      month: '08/1970',
      records: [
        { member_id: 1, consumption: 17340 },
        { member_id: 2, consumption: 11740 },
        { member_id: 3, consumption: 1743 },
        { member_id: 4, consumption: 84312 },
        { member_id: 5, consumption: 782 }
      ]
    }
  ],
  ghg_emission: [
    {
      month: '01/1970',
      records: [
        { member_id: 1, ghg_emission: 18546.0 },
        { member_id: 2, ghg_emission: 28099.718999999997 },
        { member_id: 3, ghg_emission: 84.3 },
        { member_id: 4, ghg_emission: 84.3 },
        { member_id: 5, ghg_emission: 710.649 }
      ]
    },
    {
      month: '01/1971',
      records: [
        { member_id: 1, ghg_emission: 4682.865 },
        { member_id: 2, ghg_emission: 3746.292 },
        { member_id: 3, ghg_emission: 23894.835 },
        { member_id: 4, ghg_emission: 2866.2 },
        { member_id: 5, ghg_emission: 1013.286 }
      ]
    },
    { month: 'string', records: [{ member_id: 0, ghg_emission: 0.0 }] },
    { month: 'string', records: [{ member_id: 0, ghg_emission: 0.0 }] },
    { month: 'string', records: [{ member_id: 0, ghg_emission: 0.0 }] },
    {
      month: '08/2019',
      records: [
        { member_id: 1, ghg_emission: 0.843 },
        { member_id: 2, ghg_emission: 1.686 },
        { member_id: 3, ghg_emission: 2.529 },
        { member_id: 4, ghg_emission: 3.372 },
        { member_id: 5, ghg_emission: 4.215 }
      ]
    },
    {
      month: '07/2019',
      records: [
        { member_id: 1, ghg_emission: 14617.619999999999 },
        { member_id: 2, ghg_emission: 9896.82 },
        { member_id: 3, ghg_emission: 1469.349 },
        { member_id: 4, ghg_emission: 71075.016 },
        { member_id: 5, ghg_emission: 659.226 }
      ]
    },
    {
      month: '08/1970',
      records: [
        { member_id: 1, ghg_emission: 14617.619999999999 },
        { member_id: 2, ghg_emission: 9896.82 },
        { member_id: 3, ghg_emission: 1469.349 },
        { member_id: 4, ghg_emission: 71075.016 },
        { member_id: 5, ghg_emission: 659.226 }
      ]
    },
    {
      month: '08/1970',
      records: [
        { member_id: 1, ghg_emission: 14617.619999999999 },
        { member_id: 2, ghg_emission: 9896.82 },
        { member_id: 3, ghg_emission: 1469.349 },
        { member_id: 4, ghg_emission: 71075.016 },
        { member_id: 5, ghg_emission: 659.226 }
      ]
    }
  ],
  ghg_balance: {
    month: '08/2019',
    base: '08/1970',
    balances: [
      {
        member_id: 1,
        balance: 484.8
      },
      {
        member_id: 2,
        balance: -4361.1
      },
      {
        member_id: 3,
        balance: -668.8000000000001
      },
      {
        member_id: 4,
        balance: 3049.2000000000003
      },
      {
        member_id: 5,
        balance: 67.60000000000001
      }
    ]
  },
  finance: [
    {
      member_id: 1,
      financial_balance: 10
    },
    {
      member_id: 2,
      financial_balance: 20
    },
    {
      member_id: 3,
      financial_balance: 30
    },
    {
      member_id: 4,
      financial_balance: 40
    },
    {
      member_id: 5,
      financial_balance: 50
    }
  ],
  carbon: [
    {
      member_id: 1,
      vcu_burned: 1.1e-8
    },
    {
      member_id: 2,
      vcu_burned: 1.1e-8
    },
    {
      member_id: 3,
      vcu_burned: 1.1e-8
    },
    {
      member_id: 4,
      vcu_burned: 0
    },
    {
      member_id: 5,
      vcu_burned: 0
    }
  ]
};

function get(params) {
  let data = null;
  if (params === '/members') {
    data = db.members;
  } else if (params === '/members/electricity/consumptions') {
    data = db.electricity;
  } else if (params === '/members/ghg/emissions') {
    data = db.ghg_emission;
  } else if (params === '/members/ghg/balances?month=08/2019&mitigated=true') {
    data = db.ghg_balance;
  } else if (params === '/members/finance/balances') {
    data = db.finance;
  } else if (params === '/members/finance/carbon_units_burned') {
    data = db.carbon;
  }
  return new Promise(resolve => resolve(data));
}
function post(/*params, data*/) {
  return new Promise(resolve => resolve(true));
}

export default {
  get,
  post
};
