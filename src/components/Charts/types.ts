import { Chart } from 'highcharts';
import { RefObject } from 'react';

export interface ChartConfigOptions extends Highcharts.Options {
  constructorType: string;
}

export enum AreaChartTypes {
  PRESSURE = 'pressure',
  LEVEL = 'level',
}

export interface ChartData {
  timestamp: number[];
  temperature: number[];
}

export interface ChartRef {
  chart: Chart;
  container: RefObject<HTMLDivElement>;
}
