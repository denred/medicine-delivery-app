import { FC } from 'react';
import { ProductCard } from '../product-card/product-card.js';
import styles from './styles.module.scss';
import {
  Product,
  useGetProductsQuery,
} from '~/libs/packages/slices/product-api-slice.js';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type SerializedError } from '@reduxjs/toolkit';

type ProductGridProps = {
  data?: Product[];
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
};

const ProductGrid: FC<ProductGridProps> = ({
  data,
  error,
  isLoading,
}): JSX.Element => {
  return (
    <ul className={styles.list}>
      {data?.map(({ id, category, title, image, description }) => (
        <li key={id} className={styles.item}>
          <ProductCard title={title} src={image} alt={description} />
        </li>
      ))}
    </ul>
  );
};

export { ProductGrid };
