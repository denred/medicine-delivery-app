import { FC } from 'react';
import { ProductCard } from '../product-card/product-card';
import { OrderItem } from '~/libs/types';
import styles from './styles.module.scss';

type ProductGridProps = {
  cartItems: OrderItem[];
  handleRemoveItem: (id: number) => void;
  handleChangeQuantity: (id: number, quantity: number) => void;
};

const ProductGrid: FC<ProductGridProps> = ({
  cartItems,
  handleRemoveItem,
  handleChangeQuantity,
}): JSX.Element => (
  <ul className={styles.container}>
    {cartItems.map((item) => (
      <ProductCard
        key={item.name + item.id}
        {...item}
        handleRemoveItem={handleRemoveItem}
        handleChangeQuantity={handleChangeQuantity}
      />
    ))}
  </ul>
);

export { ProductGrid };
