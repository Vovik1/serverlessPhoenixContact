import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import styles from './Monitoring.module.scss';
import { observer } from 'mobx-react';
import LineChart from 'components/Charts/LineChart/LineChart';
const { Content } = Layout;

function Monitoring() {
  return (
    <>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Monitoring</Breadcrumb.Item>
        </Breadcrumb>
        <LineChart />
      </Content>
    </>
  );
}

export default observer(Monitoring);
