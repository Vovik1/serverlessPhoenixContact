import React from 'react';
import styles from './Header.module.scss';
import { Header as AntdHeader } from 'antd/lib/layout/layout';
import { AmplifySignOut } from '@aws-amplify/ui-react';

function Header() {
  return (
    <div className={styles.root}>
      <AntdHeader className={styles.header}>
        <AmplifySignOut />
      </AntdHeader>
    </div>
  );
}

export default Header;
