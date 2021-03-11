import { OutputControlledData, OutputDataResponse } from './OutputTypes';
import axios from 'axios';

function loadlastData() {
  return axios.get<OutputDataResponse[]>(`/api/temperature/last`).then((payload) => payload.data);
}

function loadControlledData() {
  return axios.get<OutputControlledData>(`/api/temperature/latest`).then((payload) => payload.data);
}

const outputServices = { loadlastData, loadControlledData };
export default outputServices;
