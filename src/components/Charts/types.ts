export interface ChartConfigOptions extends Highcharts.Options {
  constructorType: string;
}

export enum AreaChartTypes {
  PRESSURE = 'pressure',
  LEVEL = 'level',
}
