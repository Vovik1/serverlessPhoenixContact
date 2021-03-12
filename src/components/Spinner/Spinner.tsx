import React from 'react';
import { Spin } from 'antd';
import cn from 'classnames';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'small' | 'default' | 'large';
  fullscreen?: boolean;
}

function Spinner({ size = 'default', fullscreen }: SpinnerProps) {
  const className = cn(styles.spinnerWrapper, {
    [styles.fullHeight]: size === 'large',
    [styles.fullscreen]: fullscreen,
  });
  return (
    <div className={className}>
      <Spin size={size} />
      <div className={styles.text}>Loading...</div>
    </div>
  );
}

export default Spinner;
