import { FC } from 'react';
import { ProductCard } from '../product-card/product-card.js';
import styles from './styles.module.scss';
import {
  Product,
  useGetProductsQuery,
} from '~/libs/packages/slices/product-api-slice.js';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type SerializedError } from '@reduxjs/toolkit';
import { useShoppingCart } from '~/libs/hooks/index.js';

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
  const { addToCart } = useShoppingCart();
  return (
    <ul className={styles.list}>
      {data?.map(({ id, category, title, image, description, price }) => (
        <li key={id} className={styles.item}>
          <ProductCard
            title={title}
            src={image}
            alt={description}
            addToCart={addToCart}
            product={{
              id,
              name: title,
              price,
              totalPrice: price,
              quantity: 1,
              image,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export { ProductGrid };
