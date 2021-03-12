import { SeriesOptionsType } from 'highcharts';
import { ChartConfigOptions, ChartData } from '../types';

export const getChartConfig = (data: ChartData): ChartConfigOptions => {
  const seriesData = data.timestamp.map((item, index) => [item, data.temperature[index]]);

  const series = [
    {
      type: 'column',
      name: 'Температура',
      // data: data.temperature,
      data: seriesData,
    } as SeriesOptionsType,
  ];

  return {
    constructorType: 'chart',
    time: {
      useUTC: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
    rangeSelector: {
      //   enabled: false,
    },
    plotOptions: {
      area: {
        color: '#9660E4',
      },
    },
    legend: {
      enabled: false,
    },
    chart: {
      width: 320,
      height: 70,
      zoomType: undefined,
    },
    xAxis: {
      type: 'datetime',
      visible: false,
    },
    yAxis: {
      visible: false,
      type: 'logarithmic',
      minorTickInterval: 'auto',
    },
    series,
  };
};
