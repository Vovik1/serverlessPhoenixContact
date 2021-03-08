import React from 'react';
import styles from './Info.module.scss';
import { observer } from 'mobx-react';
import { Card, Area, ColumnChart } from 'components';
import { AreaChartTypes } from 'components/Charts/types';
import { Progress } from 'antd';

function Info() {
  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <div className={styles.title}>Температура</div>
        <div className={styles.data}>32 ℃</div>
        <Area type={AreaChartTypes.LEVEL} />
      </Card>
      <Card className={styles.card}>
        <div className={styles.title}>Рівень</div>
        <div className={styles.data}>40 М</div>
        <Progress className={styles.progress} percent={40} showInfo={false} />
      </Card>
      <Card className={styles.card}>
        <div className={styles.title}>Тиск</div>
        <div className={styles.data}>7 кгс/см²</div>
        <Area type={AreaChartTypes.PRESSURE} />
      </Card>
      <Card className={styles.card}>
        <div className={styles.title}>Температура</div>
        <div className={styles.data}>32 ℃</div>
        <ColumnChart />
      </Card>
    </div>
  );
}

export default observer(Info);
