import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';

import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';

import { getChartConfig } from './getChartConfig';
import { Chart } from 'highcharts';

import styles from './LineChart.module.scss';
import { outputStore as store } from 'stores';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

HighchartsMore(Highcharts);
// Highcharts.setOptions(styleOptions);

function LineChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const heaterData = {
    timestamp: store.controlledData?.timestamp || [],
    temperature: store.controlledData?.heater_temperature || [],
  };

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
