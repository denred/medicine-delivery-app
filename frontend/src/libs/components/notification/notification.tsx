import { FC } from 'react';
import { type ToastContainerProps, ToastContainer } from 'react-toastify';

const Notification: FC<ToastContainerProps> = (properties) => {
  return <ToastContainer {...properties} />;
};

export { Notification };
