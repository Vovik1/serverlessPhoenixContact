import React, { useCallback, useEffect } from 'react';
import styles from './Monitoring.module.scss';
import { observer } from 'mobx-react';
import LineChart from 'components/Charts/LineChart/LineChart';
import { outputStore as store } from 'stores';
import { Card, Content, Breadcrumb, Spinner, ObjectImages } from 'components';
import Info from './Info/Info';
import SettingsModal from './SettingsModal/SettingsModal';
import { Settings } from 'services/output/OutputTypes';

const breadcrumbLabels = ['Dashboard', 'Monitoring'];

function Monitoring() {
  const { controlledData, lastData, isControlledDataLoaded, isLastDataLoaded } = store;

  const isDataLoaded = isControlledDataLoaded && isLastDataLoaded;

  useEffect(() => {
    store.loadlastData();
    store.loadControlledData();
    const loadLastData = setInterval(() => {
      store.loadlastData();
      store.loadControlledData();
    }, 5000);
    return () => clearInterval(loadLastData);
  }, []);

  const handleSaveSettings = useCallback((settings: Settings) => {
    store.saveSettings(settings);
  }, []);

  return (
    <>
      {isDataLoaded ? (
        <Content>
          <Breadcrumb labels={breadcrumbLabels} />
          {lastData && controlledData && (
            <Info controlledData={controlledData} lastData={lastData.operationalData} />
          )}
          <Card className={styles.imagesCard}>
            {lastData && (
              <SettingsModal
                saveSettings={handleSaveSettings}
                lastData={lastData.operationalData}
              />
            )}
            <ObjectImages objectData={lastData?.operationalData} />
          </Card>
          <Card className={styles.lineChartCard}>
            <LineChart />
          </Card>
        </Content>
      ) : (
        <Spinner size="large" />
      )}
    </>
  );
}

export default observer(Monitoring);
