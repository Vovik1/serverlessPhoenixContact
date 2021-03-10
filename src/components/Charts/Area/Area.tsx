import React, { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';

import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';

import { getChartConfig } from './getChartConfig';
import { Chart, Series } from 'highcharts';

import styles from './Area.module.scss';
import { ChartData, AreaChartTypes } from '../types';

HighchartsMore(Highcharts);
// Highcharts.setOptions(styleOptions);

interface AreaProps {
  data: ChartData;
  type: AreaChartTypes;
}

export default function Area({ data, type }: AreaProps) {
  const options = useMemo(() => getChartConfig(type, data), [type, data]);
  const wrapRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<{ chart: Chart; container: RefObject<HTMLDivElement> }>(null);
  useEffect(() => {
    setTimeout(() => {
      if (wrapRef.current && chartRef.current) {
        const height = wrapRef.current.offsetHeight;
        const width = wrapRef.current.offsetWidth;
        chartRef.current?.chart.setSize(width, height);
      }
    }, 0);
  }, [wrapRef]);

  return (
    <div className={styles.root} ref={wrapRef}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={options.constructorType}
        options={options}
        containerProps={{ style: { width: '100%', height: '70px' } }}
        ref={chartRef}
      />
    </div>
  );
}
