import React from 'react';
import cn from 'classnames';
import { Modal as AntModal } from 'antd';
import styles from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  className?: string;
  children: React.ReactNode;
  title?: string;
}

function Modal({ open, onOk, onCancel, className, children, title }: ModalProps) {
  return (
    <div className={styles.modalWrapper}>
      <AntModal
        className={className}
        centered
        visible={open}
        onOk={onOk}
        width={500}
        onCancel={onCancel}
        title={title}
        okText="Застосувати"
        cancelText="Закрити"
      >
        {children}
      </AntModal>
    </div>
  );
}

export default Modal;
