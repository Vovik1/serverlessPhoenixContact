import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';

import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';

import { getChartConfig } from './getChartConfig';
import { Series } from 'highcharts';

import styles from './LineChart.module.scss';

HighchartsMore(Highcharts);
// Highcharts.setOptions(styleOptions);

interface LineChartProps {
  data?: number[][];
}

const LineChart = ({ data }: LineChartProps) => {
  const intervalFunction = useRef<NodeJS.Timeout>();

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
    <div className={styles.root}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={options.constructorType}
        options={options}
        immutable
      />
    </div>
  );
};

export default LineChart;
