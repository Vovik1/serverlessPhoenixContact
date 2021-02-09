import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  labels: string[];
  className?: string;
}

export default function Breadcrumb({ labels }: BreadcrumbProps) {
  return (
    <AntdBreadcrumb className={styles.root}>
      {labels.map((label) => (
        <AntdBreadcrumb.Item key={label}>{label}</AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  );
}
