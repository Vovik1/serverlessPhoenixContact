export interface OutputLastData {
  operationalData: OperationalData;
  plc_id: string;
  timestamp: number;
}

export interface OperationalData {
  HORN_BLINK_INT_TIME: number;
  FILL_DRAIN_INT_TIME: number;
  HEATER_TEMPERATURE: number;
  HIGH_TEMP_AL_VALUE: number;
  SUPPLY_VALVE_OUT_BIT: boolean;
  SYSTEM_MODE: number;
  TANK_PUMP_BIT: boolean;
  TANK_TEMPERATURE: number;
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
  SYSTEM_MODE?: number;
  HIGH_TEMP_AL_VALUE?: number;
  HORN_BLINK_INT_TIME?: number;
}
