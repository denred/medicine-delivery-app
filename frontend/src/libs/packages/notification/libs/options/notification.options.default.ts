import { type ToastPosition, type ToastTransition } from 'react-toastify';
import { type ValueOf } from '~/libs/types/index.js';
import { NotificationTheme, NotificationTransition } from '../enums/enums.js';

type ToastOptions = {
  position?: ToastPosition;
  theme?: ValueOf<typeof NotificationTheme>;
  autoClose?: number;
  transition?: ToastTransition;
};

const DEFAULT_NOTIFICATION_OPTIONS: ToastOptions = {
  position: 'top-right',
  theme: NotificationTheme.LIGHT,
  autoClose: 4000,
  transition: NotificationTransition.SLIDE,
};

export { type ToastOptions, DEFAULT_NOTIFICATION_OPTIONS };
