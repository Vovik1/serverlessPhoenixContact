import React, { useMemo } from 'react';
import styles from './Info.module.scss';
import { observer } from 'mobx-react';
import { Area, Card, ColumnChart } from 'components';
import { AreaChartTypes } from 'components/Charts/types';
import { Progress } from 'antd';
import { outputStore as store } from 'stores';
import { OperationalData, OutputControlledData } from 'services/output/OutputTypes';

interface InfoProps {
  controlledData: OutputControlledData;
  lastData: OperationalData;
}

function Info({ controlledData, lastData }: InfoProps) {
  const { heaterTemperature, tankTemperature } = lastData;

  const heaterData = useMemo(
    () => ({
      timestamp: controlledData.timestamp.slice(0, 20),
      temperature: controlledData.heaterTemperature.slice(0, 20),
    }),
    [controlledData]
  );

  const tankData = useMemo(
    () => ({
      timestamp: controlledData.timestamp.slice(0, 20),
      temperature: controlledData.tankTemperature.slice(0, 20),
    }),
    [controlledData]
  );

  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <div className={styles.title}>Температура</div>
        <div className={styles.data}>{heaterTemperature.toFixed(3)} ℃</div>
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
        <div className={styles.data}>{tankTemperature.toFixed(3)} ℃</div>
        <ColumnChart data={tankData} />
      </Card>
    </div>
  );
}

export default observer(Info);
