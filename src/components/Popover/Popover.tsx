import React from 'react';
import { Popover as AntdPopover } from 'antd';
import styles from './Popover.module.scss';
import { observer } from 'mobx-react';

interface PopoverProps {
  children: NonNullable<React.ReactNode>;
  visible: boolean;
  onChange: (visible: boolean) => void;
  content?:  React.ReactNode;
}

function Popover({ children, content, visible, onChange }: PopoverProps) {
  return (
    <div className={styles.wrap}>
      <AntdPopover
        placement="bottomRight"
        content={content}
        trigger="click"
        visible={visible}
        onVisibleChange={onChange}
        arrowPointAtCenter={false}
        className={styles.block}
        overlayClassName={styles.popupBlock}
      >
        {children}
      </AntdPopover>
    </div>
  );
}

export default observer(Popover);
