import React, { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, BarChartOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link, useLocation } from 'react-router-dom';
import styles from './LeftMenuPanel.module.scss';

const { Sider } = Layout;

const menu = [
  {
    id: 1,
    icon: <DesktopOutlined />,
    label: 'Monitoring',
    route: '/dashboard/monitoring',
  },
  {
    id: 2,
    icon: <BarChartOutlined />,
    label: 'Analysis',
    route: '/dashboard/analysis',
  },
];

export default function LeftMenuPanel() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const onCollapse = useCallback((collapsed: boolean) => {
    setCollapsed(collapsed);
  }, []);
  const activeMenu = location.pathname.includes('monitoring') ? '1' : '2';

  return (
    <Sider
      trigger={<MenuUnfoldOutlined width="40" height="40" />}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className={styles.logo}>
        <img src={`${process.env.PUBLIC_URL}/logo.svg`} />
        {!collapsed && <span>Smart Systems</span>}
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[activeMenu]}>
        {menu.map(({ id, icon, label, route }) => (
          <Menu.Item key={id} icon={icon}>
            <Link to={route}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
