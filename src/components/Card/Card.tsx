import React from 'react';
import cn from 'classnames';
import styles from './Card.module.scss';

interface CardProps {
  children: NonNullable<React.ReactNode>;
  className?: string;
}

export default function Card({ className, children }: CardProps) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}
