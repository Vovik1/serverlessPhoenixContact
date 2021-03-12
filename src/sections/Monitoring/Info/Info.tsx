import React, { useMemo } from 'react';
import styles from './Info.module.scss';
import { observer } from 'mobx-react';
import { Area, Card, ColumnChart } from 'components';
import { AreaChartTypes } from 'components/Charts/types';
import { Progress } from 'antd';
import { outputStore as store } from 'stores';
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

  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <div className={styles.title}>Температура</div>
        <div className={styles.data}>{HEATER_TEMPERATURE.toFixed(3)} ℃</div>
        <Area data={heaterData} type={AreaChartTypes.LEVEL} />
      </Card>
      <Card className={styles.card}>
        <div className={styles.title}>Рівень</div>
        <div className={styles.data}>40 М</div>
        <Progress className={styles.progress} percent={40} showInfo={false} />
      </Card>
      <Card className={styles.card}>
        <div className={styles.title}>Тиск</div>
        <div className={styles.data}>7 кгс/см²</div>
        <Area data={heaterData} type={AreaChartTypes.PRESSURE} />
      </Card>
      <Card className={styles.card}>
        <div className={styles.title}>Температура</div>
        <div className={styles.data}>{TANK_LEVEL.toFixed(3)} ℃</div>
        <ColumnChart data={heaterData} />
      </Card>
    </div>
  );
}

export default observer(Info);
