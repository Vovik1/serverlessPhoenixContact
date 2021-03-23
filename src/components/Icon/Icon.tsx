import React from 'react';
import cn from 'classnames';
import { getIconByType } from './IconsMap';
import styles from './Icon.module.scss';
import { omit } from 'lodash';
import SVGIcon from './SVGIcon';

type sizeType = 'inherit' | 'sm' | 'md' | 'mdLg' | 'lg';

interface IconProps {
  type: string;
  disabled?: boolean;
  size?: sizeType;
  className?: string;
  selected?: boolean;
  spin?: boolean;
  rotate?: number;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

class AntIcon extends React.Component<IconProps> {
  onClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (this.props.disabled || !this.props.onClick) {
      return;
    }
    this.props.onClick(event);
  };

  render() {
    const { size = 'inherit', className, disabled, selected, ...props } = this.props;
    // TO TEST IN FUTURE!
    const IconComponent = getIconByType(this.props.type) || SVGIcon;
    if (!IconComponent) {
      return null;
    }

    const iconClassName = cn(
      styles[size],
      { [styles.disabled]: disabled },
      { [styles.selected]: selected },
      className
    );

    const componentProps = omit(props, 'onClick');

    return <IconComponent className={iconClassName} {...componentProps} />;
  }
}

export default AntIcon;
