import { OutputData } from './OutputTypes';
import axios from 'axios';

function loadOutput() {
  return axios.get<OutputData[]>(`/data`).then((payload) => payload.data);
}

const outputServices = { loadOutput };
export default outputServices;
