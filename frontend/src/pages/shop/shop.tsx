import { FC } from 'react';
import { Sidebar } from './components/sidebar/sidebar';
import { ProductGrid } from './components/product-grid/product-grid';
import styles from './styles.module.scss';

const Shop: FC = () => (
  <div className={styles.container}>
    <Sidebar className={styles.sidebar} />
    <div className={styles.content}>
      <ProductGrid />
    </div>
  </div>
);

export { Shop };
