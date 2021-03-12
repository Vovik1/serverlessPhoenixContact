import { AREA_CHART_COLOR } from 'commonConstants';
import { SeriesOptionsType } from 'highcharts';
import { AreaChartTypes, ChartConfigOptions, ChartData } from '../types';

export const getChartConfig = (type: AreaChartTypes, data: ChartData): ChartConfigOptions => {
  const color = AREA_CHART_COLOR[type];

  const seriesData = data.timestamp.reverse().map((item, index) => [item, data.temperature[index]]);

  const series = [
    {
      type: 'area',
      name: 'Температура',
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

    plotOptions: {
      area: {
        color: color,
        marker: {
          enabled: false,
        },
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
    },
    yAxis: {
      visible: false,
      type: 'logarithmic',
      minorTickInterval: 'auto',
    },
    series,
  };
};
