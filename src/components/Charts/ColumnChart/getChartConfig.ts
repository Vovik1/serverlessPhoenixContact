import { SeriesOptionsType } from 'highcharts';
import moment from 'moment';
import { ChartConfigOptions, ChartData } from '../types';

export const getChartConfig = (data: ChartData): ChartConfigOptions => {
  // const seriesData = data.timestamp.map((item, index) => [item, data.temperature[index]]);

  const series = [
    {
      type: 'column',
      name: 'Температура',
      data: data.temperature,
    } as SeriesOptionsType,
  ];

  //will be fixed after api int;
  const test = data.timestamp.map((item) => moment(item).format('MM-dddd-yyyy HH:mm'));

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
      zoomType: undefined,
    },
    xAxis: {
      type: 'datetime',
      visible: false,
      categories: test,
    },
    yAxis: {
      visible: false,
      type: 'logarithmic',
      minorTickInterval: 'auto',
    },
    series,
  };
};
