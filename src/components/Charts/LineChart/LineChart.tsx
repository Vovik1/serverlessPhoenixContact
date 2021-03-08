import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';

import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';

import { getChartConfig } from './getChartConfig';
import { Chart, Series } from 'highcharts';

import styles from './LineChart.module.scss';

HighchartsMore(Highcharts);
// Highcharts.setOptions(styleOptions);

interface LineChartProps {
  data?: number[][];
}

export default function LineChart({ data }: LineChartProps) {
  const intervalFunction = useRef<NodeJS.Timeout>();

  const wrapRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<{ chart: Chart; container: RefObject<HTMLDivElement> }>(null);
  //testing
  useEffect(() => {
    function handleResize() {
      setTimeout(() => {
        chartRef.current?.chart.setSize(
          wrapRef.current?.offsetWidth,
          wrapRef.current?.offsetHeight
        );
      }, 0);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onLoad = useCallback((series: Series) => {
    intervalFunction.current = setInterval(() => {
      const x = new Date().getTime(); // current time
      const y = Math.round(Math.random() * 100);
      series.addPoint([x, y]);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalFunction.current as NodeJS.Timeout);
  });

  const options = useMemo(() => getChartConfig(onLoad), [onLoad]);

  return (
    <div className={styles.root} ref={wrapRef}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={options.constructorType}
        options={options}
        ref={chartRef}
      />
    </div>
  );
}
