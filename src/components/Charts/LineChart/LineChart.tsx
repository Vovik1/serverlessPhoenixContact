import React, { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';

import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';

import { getChartConfig } from './getChartConfig';

import styles from './LineChart.module.scss';
import { outputStore as store } from 'stores';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useSetChartSize } from 'hooks';
import { ChartRef } from '../types';

HighchartsMore(Highcharts);
// Highcharts.setOptions(styleOptions);

function LineChart() {
  const heaterData = {
    timestamp: store.controlledData?.timestamp || [],
    temperature: store.controlledData?.heater_temperature || [],
  };

  const chartRef = useRef<ChartRef>(null);

  const wrapRef = useSetChartSize(chartRef);

  const options = getChartConfig(toJS(heaterData));

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

export default observer(LineChart);
