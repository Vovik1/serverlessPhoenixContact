import React from 'react';
import { PageLayout } from 'components';
import { Analysis, Header, LeftMenuPanel, Monitoring } from 'sections';
import { Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import PrivateRoute from 'routes/PrivateRoute';

function Dashboard() {
  return (
    <PageLayout>
      <LeftMenuPanel />
      <PageLayout>
        <Header />
        <Switch>
          <PrivateRoute path="/dashboard/analysis" component={() => <Analysis />} />
          <PrivateRoute path="/dashboard/monitoring" component={() => <Monitoring />} />
        </Switch>
      </PageLayout>
    </PageLayout>
  );
}

export default observer(Dashboard);
