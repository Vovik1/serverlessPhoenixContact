import React from 'react';
import { Layout } from 'antd';
import styles from './Content.module.scss';

const ContentBlock = Layout.Content;

interface ContentProps {
  children: NonNullable<React.ReactNode>;
}

export default function Content(props: ContentProps) {
  return <ContentBlock className={styles.root}>{props.children}</ContentBlock>;
}
