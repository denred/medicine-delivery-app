import {
  type IconDefinition,
  faEye,
  faPlus,
  faMinus,
  faShop,
  faShoppingCart,
  faClose,
} from '@fortawesome/free-solid-svg-icons';

import { IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types';

const iconNameToSvg: Record<ValueOf<typeof IconName>, IconDefinition> = {
  [IconName.PLUS]: faPlus,
  [IconName.MINUS]: faMinus,
  [IconName.EYE]: faEye,
  [IconName.SHOP]: faShop,
  [IconName.CART]: faShoppingCart,
  [IconName.CLOSE]: faClose,
};

export { iconNameToSvg };
