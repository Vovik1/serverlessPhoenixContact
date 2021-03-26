import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import styles from './Switch.module.scss';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <div className={styles.switchWrapper}>
      <span className={styles.label}>{label}</span>
      <AntdSwitch className={styles.switch} checked={checked} onChange={onChange} />
    </div>
  );
}
