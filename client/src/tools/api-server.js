import axios from 'axios';

const url = 'http://hbrz.khassanov.me/api/v1';

function get(params) {
  return axios.get(url + params).then(r => {
    return r.data;
  });
}
function post(params, data) {
  return axios.post(url + params, data);
}

export default {
  get,
  post
};
