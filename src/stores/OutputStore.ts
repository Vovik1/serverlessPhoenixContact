import { POPOVER_MOCK_DATA } from 'commonConstants';
import { makeAutoObservable, runInAction } from 'mobx';
import { ErrorData, OutputData } from 'services/output/OutputTypes';
import api from '../services';

export class OutputStore {
  service: typeof api.output;
  data: OutputData[] = [];
  errorData: ErrorData[] = POPOVER_MOCK_DATA;

  constructor(OutputService: typeof api.output) {
    this.service = OutputService;
    makeAutoObservable(this);
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

  setResolvedErrors = (id?: number, all?: boolean) => {
    if (all) {
      this.errorData = [];
      return;
    }
    this.errorData.forEach((item) => {
      if (item.id === id) {
        item.resolved = true;
      }
    });
    // call API to save
  };
}

export const outputStore = new OutputStore(api.output);
