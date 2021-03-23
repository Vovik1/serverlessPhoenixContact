import React from 'react';

import Icon, {
  NotificationOutlined,
  BellOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { ReactComponent as Scheme } from 'components/Icon/svg-icons/scheme.svg';

export const SVG_MAP: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  Scheme,
};

const ICONS: { [key: string]: typeof Icon } = {
  NotificationOutlined,
  BellOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  BarChartOutlined,
};

export function getIconByType(type: string) {
  return ICONS[type];
}
