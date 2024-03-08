import { FC, useCallback, useState } from 'react';
import { Sidebar } from './components/sidebar/sidebar';
import { ProductGrid } from './components/product-grid/product-grid';
import styles from './styles.module.scss';
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from '~/libs/packages/slices/product-api-slice';

const Shop: FC = () => {
  const [currentId, setCurrentId] = useState<number>(1);
  const { data: categories } = useGetCategoriesQuery();
  const data = useGetProductsByCategoryQuery(
    categories?.find(({ id }) => id === currentId)?.category ?? '',
  );

  const handleMenuClick = useCallback(
    (id: number) => {
      setCurrentId(id);
    },
    [currentId],
  );

  return (
    <div className={styles.container}>
      <Sidebar
        className={styles.sidebar}
        currentId={currentId}
        handleMenuClick={handleMenuClick}
        categories={categories ?? []}
      />
      <div className={styles.content}>
        <ProductGrid {...data} />
      </div>
    </div>
  );
};

export { Shop };
