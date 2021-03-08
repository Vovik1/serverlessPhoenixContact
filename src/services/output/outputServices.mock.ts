import MockAdapter from 'axios-mock-adapter';
import { outputExample } from './outputSampleData.mock';

export default function createOutputMocks(mock: MockAdapter) {
  mock.onGet('/api/data').reply(() => {
    return [200, outputExample];
  });
}
