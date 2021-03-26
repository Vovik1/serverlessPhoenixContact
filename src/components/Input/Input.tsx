import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { Input as AntdInput } from 'antd';
import styles from './Input.module.scss';

interface InputProps {
  value?: string | number;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  wrapClassName?: string;
  className?: string;
  placeholder?: string;
  type?: string;
}

function Input({ value, label, onChange, wrapClassName, className, ...props }: InputProps) {
  return (
    <div className={cn(styles.inputWrapper, wrapClassName)}>
      <span className={styles.label}>{label}</span>
      <AntdInput
        pattern="[0-9]*"
        {...props}
        className={className}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Input;
