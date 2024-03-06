import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type IconName, type IconSize } from '~/libs/enums';
import { type ValueOf } from '~/libs/types';

import { iconNameToSvg } from './maps/maps.js';

type Properties = {
  iconName: ValueOf<typeof IconName>;
  className?: string;
  size?: ValueOf<typeof IconSize>;
  onClick?: () => void;
};

const Icon: FC<Properties> = ({
  iconName,
  className,
  size,
  onClick,
}: Properties) => (
  <FontAwesomeIcon
    className={className}
    icon={iconNameToSvg[iconName]}
    size={size}
    onClick={onClick}
  />
);

export { Icon };
