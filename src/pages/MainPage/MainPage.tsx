import React from 'react';
import styles from './MainPage.module.scss';
import { PageLayout } from 'components';
import { Analysis, Header, LeftMenuPanel, Monitoring } from 'sections';
import { Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import PrivateRoute from 'routes/PrivateRoute';

function MainPage() {
  return (
    <PageLayout>
      <LeftMenuPanel />
      <PageLayout>
        <Header />
        <Switch>
          <PrivateRoute path="/main/analysis" component={() => <Analysis />} />
          <PrivateRoute path="/main/monitoring" component={() => <Monitoring />} />
        </Switch>
      </PageLayout>
    </PageLayout>
  );
}

export default observer(MainPage);
