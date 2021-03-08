import React from 'react';
import { Layout } from 'antd';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children: NonNullable<React.ReactNode>;
}

function PageLayout(props: PageLayoutProps) {
  return <Layout className={styles.root}>{props.children}</Layout>;
}

export default PageLayout;
