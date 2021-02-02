import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import styles from './LeftMenuPanel.module.scss';
import { Link } from 'react-router-dom';
import { DesktopOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

function LeftMenuPanel() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <SubMenu key="dashboard" icon={<DesktopOutlined />} title="Dashboard">
          <Menu.Item key="1">
            <Link to="/analysis">Analysis</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/monitoring">Monitoring</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default LeftMenuPanel;
