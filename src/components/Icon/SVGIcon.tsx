import Icon from '@ant-design/icons';
import React from 'react';
import { SVG_MAP } from './IconsMap';

interface SVGIconProps {
  type: string;
  className: string;
}

function SVGIcon({ type, className }: SVGIconProps) {
  if (!SVG_MAP[type]) {
    return null;
  }

  return (
    <span className={className}>
      <Icon component={SVG_MAP[type]} />
    </span>
  );
}

export default SVGIcon;
