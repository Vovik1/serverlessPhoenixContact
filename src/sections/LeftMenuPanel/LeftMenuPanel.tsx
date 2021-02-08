import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import styles from './LeftMenuPanel.module.scss';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

function LeftMenuPanel() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const activeMenu = location.pathname.includes('monitoring') ? '1' : '2';

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" style={{ height: 60 }} />
      <Menu theme="dark" mode="inline" selectedKeys={[activeMenu]}>
        <Menu.Item key="1">
          <Link to="/dashboard/monitoring">Monitoring</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/dashboard/analysis">Analysis</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default LeftMenuPanel;
