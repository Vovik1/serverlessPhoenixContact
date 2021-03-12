import React, { useMemo, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';

import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';

import { getChartConfig } from './getChartConfig';

import styles from './ColumnChart.module.scss';
import { ChartData, ChartRef } from '../types';
import { useSetChartSize } from 'hooks';

HighchartsMore(Highcharts);
// Highcharts.setOptions(styleOptions);

interface ColumnChartProps {
  data: ChartData;
}

function ColumnChart({ data }: ColumnChartProps) {
  const options = useMemo(() => getChartConfig(data), [data]);
  const chartRef = useRef<ChartRef>(null);

  const wrapRef = useSetChartSize(chartRef);

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

export default React.memo(ColumnChart);
