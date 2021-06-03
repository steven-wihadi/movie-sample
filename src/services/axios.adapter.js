const axios = require('axios');

export function axiosGet(link, params) {
  return axios.get(link, {
    params
  });
}