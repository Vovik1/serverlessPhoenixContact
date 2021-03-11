import React from 'react';
import styles from './CardInfo.module.scss';
import { observer } from 'mobx-react';
import { Card } from 'components';

interface CardInfoOptions {
  title: string;
  value: string;
  children: React.ReactNode;
}

interface CardInfoProps {
  options: CardInfoOptions[];
}

function CardInfo({ options }: CardInfoProps) {
  return (
    <div className={styles.wrap}>
      {options.map((item) => (
        <Card className={styles.card} key={`${item.title}-${item.value}`}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.data}>{item.value}</div>
          {item.children}
        </Card>
      ))}
    </div>
  );
}

export default observer(CardInfo);
