import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import styles from './Monitoring.module.scss';
import { observer } from 'mobx-react';
const { Content } = Layout;

function Monitoring() {
  return (
    <>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Monitoring</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 360 }}>Monitoring</div>
      </Content>
    </>
  );
}

export default observer(Monitoring);
