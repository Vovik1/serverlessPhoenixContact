import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createOutputMocks from './output/outputServices.mock';

export function createMocks() {
  const mock = new MockAdapter(axios);
  createOutputMocks(mock);
}
