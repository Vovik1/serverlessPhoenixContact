import React, { useMemo } from 'react';
import styles from './Info.module.scss';
import { observer } from 'mobx-react';
import { Area, ColumnChart } from 'components';
import { AreaChartTypes } from 'components/Charts/types';
import { Progress } from 'antd';
import { outputStore as store } from 'stores';
import CardInfo from './CardInfo/CardInfo';
import { OutputControlledData } from 'services/output/OutputTypes';

interface InfoProps {
  controlledData: OutputControlledData;
}

function Info({ controlledData }: InfoProps) {
  const lastData = store.lastData[0];
  const { HEATER_TEMPERATURE, TANK_LEVEL } = lastData.data;

  const heaterData = useMemo(
    () => ({
      timestamp: controlledData.timestamp.slice(0, 20),
      temperature: controlledData.heater_temperature.slice(0, 20),
    }),
    [controlledData]
  );

  const options = useMemo(
    () => [
      {
        title: 'Температура',
        value: `${HEATER_TEMPERATURE.toFixed(3)} ℃`,
        children: <Area data={heaterData} type={AreaChartTypes.LEVEL} />,
      },
      {
        title: 'Рівень',
        value: '40 М',
        children: <Progress className={styles.progress} percent={40} showInfo={false} />,
      },
      {
        title: 'Тиск',
        value: '7 кгс/см²',
        children: <Area data={heaterData} type={AreaChartTypes.PRESSURE} />,
      },
      {
        title: 'Температура',
        value: `${TANK_LEVEL.toFixed(3)} ℃`,
        children: <ColumnChart data={heaterData} />,
      },
    ],
    [HEATER_TEMPERATURE, TANK_LEVEL, heaterData]
  );

  return <CardInfo options={options} />;
}

export default observer(Info);
