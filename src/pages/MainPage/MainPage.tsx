import React from 'react';
import styles from './MainPage.module.scss';
import { PageLayout } from 'components';
import { Analysis, LeftMenuPanel, Monitoring } from 'sections';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import { observer } from 'mobx-react';

function MainPage() {
  return (
    <Router>
      <PageLayout>
        <LeftMenuPanel />
        <PageLayout>
          <Header className={styles.header} />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/analysis" />} />
            <Route exact path="/analysis">
              <Analysis />
            </Route>
            <Route exact path="/monitoring">
              <Monitoring />
            </Route>
          </Switch>
        </PageLayout>
      </PageLayout>
    </Router>
  );
}

export default observer(MainPage);
