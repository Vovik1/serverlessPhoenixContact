import { SeriesOptionsType, Series } from 'highcharts';
import { ChartConfigOptions } from '../types';

export const getChartConfig = (onLoad: (series: Series) => void): ChartConfigOptions => {
  const series = [
    {
      type: 'line',
      name: 'Temperature',
      data: (function () {
        const data = [];
        const time = new Date().getTime();
        let i;

        for (i = -999; i <= 0; i += 1) {
          data.push([time + i * 1000, Math.round(Math.random() * 100)]);
        }
        return data;
      })(),
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
      events: {
        load: function () {
          const series = this.series[0];
          onLoad(series);
        },
      },
    },
    xAxis: {
      type: 'datetime',
    },

    yAxis: {
      opposite: false,
      title: {
        text: 'Temperature',
      },
    },
    series,
  };
};
