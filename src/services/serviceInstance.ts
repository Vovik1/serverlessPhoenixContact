import axios from 'axios';

export default function initAxios() {
  axios.defaults.timeout = 60000;
  axios.defaults.baseURL = process.env.REACT_APP_API;
}
