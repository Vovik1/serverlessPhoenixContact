import { POPOVER_MOCK_DATA } from 'commonConstants';
import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { ErrorData, OutputControlledData, OutputDataResponse } from 'services/output/OutputTypes';
import api from '../services';

export class OutputStore {
  service: typeof api.output;
  lastData: OutputDataResponse[] = [];
  controlledData: OutputControlledData | undefined;
  errorData: ErrorData[] = POPOVER_MOCK_DATA;
  isLastDataLoaded = false;
  isControlledDataLoaded = false;

  constructor(OutputService: typeof api.output) {
    this.service = OutputService;
    makeAutoObservable(this);
  }

  async loadlastData() {
    runInAction(() => {
      this.isLastDataLoaded = false;
    });
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
    runInAction(() => {
      this.isControlledDataLoaded = false;
    });
    try {
      const initialData = await this.service.loadControlledData();
      runInAction(() => {
        initialData.timestamp = initialData.timestamp
          .reverse()
          .map((item) => moment(item).valueOf());
        initialData.tank_level.reverse();
        initialData.heater_temperature.reverse();

        this.controlledData = initialData;
        this.isControlledDataLoaded = true;
      });
    } catch {
      console.log('error');
      this.isControlledDataLoaded = false;
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
