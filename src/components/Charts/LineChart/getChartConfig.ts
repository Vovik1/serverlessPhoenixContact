import { SeriesOptionsType } from 'highcharts';
import { ChartConfigOptions, ChartData } from '../types';

export const getChartConfig = (data: ChartData): ChartConfigOptions => {
  const seriesData = data.timestamp.map((item, index) => [item, data.temperature[index]]);

  const series = [
    {
      type: 'line',
      name: 'Temperature',
      data: seriesData,
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
    chart: {
      zoomType: 'xy',
    },
    xAxis: {
      type: 'datetime',
    },

    yAxis: {
      opposite: false,
      type: 'logarithmic',
      title: {
        text: 'Temperature',
      },
    },
    series,
  };
};
