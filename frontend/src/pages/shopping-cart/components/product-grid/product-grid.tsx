import { FC } from 'react';
import { ProductCard } from '../product-card/product-card';
import { useShoppingCart, useState } from '~/libs/hooks';
import styles from './styles.module.scss';

const ProductGrid: FC = (): JSX.Element => {
  const { removeFromCart, getCart } = useShoppingCart();
  const [cartItems, setCartItems] = useState(getCart());

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  return (
    <ul className={styles.container}>
      {cartItems.map((item) => (
        <ProductCard
          key={item.name + item.id}
          {...item}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </ul>
  );
};

export { ProductGrid };
