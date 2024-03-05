import { FC } from 'react';
import styles from './styles.module.scss';

const Header: FC = () => (
  <header className={styles.container}>
    <div className={styles.content}>
      <ul>
        <li>Shop</li>
        <li>Shopping cart</li>
      </ul>
    </div>
  </header>
);

export { Header };
