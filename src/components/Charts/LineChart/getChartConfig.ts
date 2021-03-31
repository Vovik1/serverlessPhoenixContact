import { SeriesOptionsType } from 'highcharts';
import { ChartConfigOptions, LineChartData } from '../types';

export const getChartConfig = (data: LineChartData): ChartConfigOptions => {
  const heaterData: number[][] = [];
  const tankData: number[][] = [];
  data.timestamp.forEach((item, index) => {
    heaterData.push([item, data.heaterTemperature[index]]);
    tankData.push([item, data.tankTemperature[index]]);
  });

  const series = [
    {
      color: '#1890ff',
      type: 'line',
      name: 'Heater',
      data: heaterData,
    } as SeriesOptionsType,
    {
      color: 'red',
      type: 'line',
      name: 'Tank',
      data: tankData,
    } as SeriesOptionsType,
  ];

  return {
    constructorType: 'stockChart',
    time: {
      useUTC: false,
    },
    credits: {
      text: 'Trial version of HighCharts library',
    },
    rangeSelector: {
      //   enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    navigator: {
      adaptToUpdatedData: true,
      height: 26,
      maskFill: 'rgba(224,231,246, 0.4)',
      xAxis: {
        labels: {
          enabled: false,
        },
      },
    },
    chart: {
      zoomType: 'xy',
    },
    xAxis: {
      type: 'datetime',
    },

    yAxis: [
      {
        opposite: false,
        // type: 'logarithmic',
        gridLineDashStyle: 'Dash',
        title: {
          text: 'Heater Temperature',
        },
      },
      {
        opposite: true,
        // type: 'logarithmic',
        gridLineDashStyle: 'Dash',
        title: {
          text: 'Tank Temperature',
        },
      },
    ],
    series,
  };
};
