import axios from 'axios';

// Експорт запитів до API від http-клієнта
export const http = {
  get(url) {
    return axios.get(url);
  },
  post(url, body) {
    return axios.post(url, body);
  },
};
