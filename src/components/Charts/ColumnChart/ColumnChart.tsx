import React, { useMemo } from 'react';
import HighchartsReact from 'highcharts-react-official';

import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';

import { getChartConfig } from './getChartConfig';

import styles from './ColumnChart.module.scss';
import { ChartData } from '../types';

HighchartsMore(Highcharts);
// Highcharts.setOptions(styleOptions);

interface ColumnChartProps {
  data: ChartData;
}

export default function ColumnChart({ data }: ColumnChartProps) {
  const options = useMemo(() => getChartConfig(data), [data]);

  return (
    <div className={styles.root}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={options.constructorType}
        options={options}
      />
    </div>
  );
}
