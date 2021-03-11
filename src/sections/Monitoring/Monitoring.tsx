import React, { useEffect, useMemo } from 'react';
import styles from './Monitoring.module.scss';
import { observer } from 'mobx-react';
import LineChart from 'components/Charts/LineChart/LineChart';
import { outputStore as store } from 'stores';
import { Card, Content, Breadcrumb } from 'components';
import Info from './Info/Info';

const breadcrumbLabels = ['Dashboard', 'Monitoring'];

function Monitoring() {
  useEffect(() => {
    store.loadlastData();
    store.loadControlledData();
    const loadLastData = setInterval(() => {
      store.loadlastData();
      store.loadControlledData();
    }, 60000);
    return () => clearInterval(loadLastData);
  }, []);

  const { controlledData, lastData } = store;

  return (
    <Content>
      <Breadcrumb labels={breadcrumbLabels} />
      {lastData.length > 0 && controlledData && <Info controlledData={controlledData} />}
      <Card className={styles.lineChartCard}>
        <LineChart />
      </Card>
    </Content>
  );
}

export default observer(Monitoring);
