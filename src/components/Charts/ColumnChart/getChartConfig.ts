import { SeriesOptionsType, Series } from 'highcharts';
import { ChartConfigOptions } from '../types';

export const getChartConfig = (): ChartConfigOptions => {
  const series = [
    {
      type: 'column',
      data: [11, 17, 13, 15, 15, 26, 27, 30, 22, 25, 24, 23, 26, 29, 33, 34],
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
    },
    series,
  };
};
