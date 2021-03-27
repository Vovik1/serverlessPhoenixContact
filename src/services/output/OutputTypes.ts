export interface OutputLastData {
  operationalData: OperationalData;
  plc_id: string;
  timestamp: number;
}

export interface OperationalData {
  hornBlinkIntTime: number;
  fillDrainIntTime: number;
  heaterTemperature: number;
  highTempAlValue: number;
  supplyValveOutBit: boolean;
  systemMode: number;
  tankPumpBit: boolean;
  tankTemperature: number;
}

export interface OutputControlledData {
  heaterTemperature: number[];
  tankTemperature: number[];
  timestamp: number[];
}

export interface ErrorData {
  id: number;
  title: string;
  resolved: boolean;
}

export interface Settings {
  FILL_DRAIN_INT_TIME?: number;
  remoteOnOff: boolean;
  HIGH_TEMP_AL_VALUE?: number;
  HORN_BLINK_INT_TIME?: number;
}
