import { FC } from 'react';
import { Header } from '~/libs/components/components.js';
import styles from './styles.module.scss';

const Shop: FC = () => (
  <div className={styles.container}>
    <Header />
  </div>
);

export { Shop };
