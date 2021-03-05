import { AREA_CHART_COLOR } from 'commonConstants';
import { SeriesOptionsType, Series } from 'highcharts';
import { AreaChartTypes, ChartConfigOptions } from '../types';

export const getChartConfig = (type?: AreaChartTypes): ChartConfigOptions => {
  const color = type ? AREA_CHART_COLOR[type] : undefined;
  const series = [
    {
      type: 'area',
      name: 'Temperature',
      data: [11, 17, 13, 15, 15, 26, 27],
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
    // rangeSelector: {
    //     enabled: false,
    // },
    plotOptions: {
      area: {
        color: color,
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
    },
    series,
  };
};
