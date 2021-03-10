export interface OutputDataResponse {
  plc_id: string;
  data: OutputData;
}

export interface OutputData {
  HEATER_TEMPERATURE: number;
  TANK_LEVEL: number;
  timestamp: string;
}
export interface OutputControlledData {
  heater_temperature: number[];
  tank_level: number[];
  timestamp: string[];
}

export interface ErrorData {
  id: number;
  title: string;
  resolved: boolean;
}
