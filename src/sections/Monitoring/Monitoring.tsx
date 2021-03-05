import React, { useEffect } from 'react';
import styles from './Monitoring.module.scss';
import { observer } from 'mobx-react';
import LineChart from 'components/Charts/LineChart/LineChart';
import { outputStore as store } from 'stores';
import { Card, Content, Breadcrumb } from 'components';
import Info from './Info/Info';

const breadcrumbLabels = ['Dashboard', 'Monitoring'];

function Monitoring() {
  useEffect(() => {
    store.load();
  }, []);

  return (
    <Content>
      <Breadcrumb labels={breadcrumbLabels} />
      <Info />
      <Card className={styles.lineChartCard}>
        <LineChart />
      </Card>
    </Content>
  );
}

export default observer(Monitoring);
