import { createMocks } from './initMocks';
import output from './output/outputServices';
import initAxios from './serviceInstance';

createMocks();

initAxios();

const api = {
  output,
};

export default api;
