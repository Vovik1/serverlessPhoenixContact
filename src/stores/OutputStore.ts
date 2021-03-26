import { POPOVER_MOCK_DATA } from 'commonConstants';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ErrorData,
  OutputControlledData,
  OutputLastData,
  Settings,
} from 'services/output/OutputTypes';
import api from '../services';

export class OutputStore {
  service: typeof api.output;
  lastData: OutputLastData | undefined;
  controlledData: OutputControlledData | undefined;
  errorData: ErrorData[] = POPOVER_MOCK_DATA;
  isLastDataLoaded = false;
  isControlledDataLoaded = false;

  constructor(OutputService: typeof api.output) {
    this.service = OutputService;
    makeAutoObservable(this);
  }

  async loadlastData() {
    try {
      const initialData = await this.service.loadlastData();
      runInAction(() => {
        this.lastData = initialData;
        this.isLastDataLoaded = true;
      });
    } catch {
      console.log('error');
      this.isLastDataLoaded = false;
    }
  }
  async loadControlledData() {
    try {
      const initialData = await this.service.loadControlledData();
      runInAction(() => {
        this.controlledData = initialData;
        this.isControlledDataLoaded = true;
      });
    } catch {
      console.log('error');
      this.isControlledDataLoaded = false;
    }
  }
  async saveSettings(settings: Settings) {
    try {
      await this.service.saveSettings(settings);
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
