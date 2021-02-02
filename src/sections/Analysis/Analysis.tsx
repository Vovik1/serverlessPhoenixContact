import React, { useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import styles from './Analysis.module.scss';
import { outputStore as store } from 'stores';
import { observer } from 'mobx-react';
const { Content } = Layout;

function Analysis() {
  useEffect(() => {
    store.load();
  }, []);
  console.log(store.data);
  return (
    <>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Analysis</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 360 }}>Analysis</div>
      </Content>
    </>
  );
}

export default observer(Analysis);
