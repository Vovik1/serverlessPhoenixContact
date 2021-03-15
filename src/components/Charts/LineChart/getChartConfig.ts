import { SeriesOptionsType } from 'highcharts';
import { ChartConfigOptions, ChartData } from '../types';

export const getChartConfig = (data: ChartData): ChartConfigOptions => {
  const seriesData = data.timestamp.map((item, index) => [item, data.temperature[index]]);

  const series = [
    {
      color: '#1890ff',
      type: 'line',
      name: 'Температура',
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

    yAxis: {
      opposite: false,
      // type: 'logarithmic',
      gridLineDashStyle: 'Dash',
      title: {
        text: 'Температура',
      },
    },
    series,
  };
};
