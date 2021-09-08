import axios from 'axios';
import config from './configs';

const client = axios.create({
  baseURL: config.apiURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

client.interceptors.request.use(
  request => {
    return request;
  },
  error => Promise.reject(error)
);

client.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error) {
      return Promise.reject(error);
    }
  }
);

export default client;