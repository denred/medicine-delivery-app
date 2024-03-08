import { FC } from 'react';
import styles from './styles.module.scss';

const ShoppingCart: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.customerInfo}> LEFT</div>
      <div className={styles.cart}>RIGHT</div>
    </div>
  );
};

export { ShoppingCart };
