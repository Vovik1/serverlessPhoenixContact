import { makeObservable, observable, runInAction } from 'mobx';
import { OutputData } from 'services/output/OutputTypes';
import api from '../services';

export class OutputStore {
  service: typeof api.output;
  data: OutputData[] = [];

  constructor(OutputService: typeof api.output) {
    this.service = OutputService;
    makeObservable(this, { data: observable });
  }

  async load() {
    try {
      const initialData = await this.service.loadOutput();
      runInAction(() => {
        this.data = initialData;
      });
    } catch {
      console.log('error');
    }
  }
}

export const outputStore = new OutputStore(api.output);
