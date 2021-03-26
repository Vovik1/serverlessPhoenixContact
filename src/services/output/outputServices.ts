import { OutputControlledData, OutputLastData, Settings } from './OutputTypes';
import axios from 'axios';

function loadlastData() {
  return axios.get<OutputLastData>(`/api/temperature/last`).then((payload) => payload.data);
}

function loadControlledData() {
  return axios.get<OutputControlledData>(`/api/temperature/latest`).then((payload) => payload.data);
}

function saveSettings(settings: Settings) {
  return axios.post<Settings>(`/post-data`, settings).then((payload) => payload.data);
}

const outputServices = { loadlastData, loadControlledData, saveSettings };
export default outputServices;
