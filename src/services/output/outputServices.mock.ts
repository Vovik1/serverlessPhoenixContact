import MockAdapter from 'axios-mock-adapter';
import { outputExample } from './outputSampleData.mock';

export default function createOutputMocks(mock: MockAdapter) {
  mock.onGet(`/dev/api/temperature/last`).passThrough();
}
