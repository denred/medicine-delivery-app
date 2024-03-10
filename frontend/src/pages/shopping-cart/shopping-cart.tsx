import { FC } from 'react';
import joi from 'joi';
import { getUserInfoForm } from './libs/fields.js';
import { DEFAULT_VALUES } from './libs/constants';
import { Form } from '~/libs/components/components.js';
import { ProductGrid } from './components/product-grid/product-grid.js';
import {
  useShoppingCart,
  useEffect,
  useState,
  useCallback,
} from '~/libs/hooks';
import { OrderItem } from '~/libs/types/order-item.type.js';
import styles from './styles.module.scss';

const ShoppingCart: FC = () => {
  const { getTotalPrice, removeFromCart, getCart, changeProductQuantity } =
    useShoppingCart();
  const [totalPrice, setTotalPrice] = useState<number>(getTotalPrice());
  const [cartItems, setCartItems] = useState<OrderItem[]>(getCart());

  const handleChangeQuantity = useCallback(
    (id: number, change: number) => {
      changeProductQuantity(id, change);
    },
    [changeProductQuantity],
  );

  const handleRemoveItem = useCallback((id: number) => {
    removeFromCart(id);
  }, []);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
    setCartItems(getCart());
  }, [getTotalPrice, getCart]);

  return (
    <div className={styles.container}>
      <div className={styles.customerInfo}>
        <div className={styles.formWrapper}>
          <Form
            defaultValues={DEFAULT_VALUES}
            onSubmit={() => {}}
            fields={getUserInfoForm}
            btnLabel={'Make order'}
            validationSchema={joi.object()}
          />
        </div>
      </div>
      <div className={styles.cart}>
        <ProductGrid
          cartItems={cartItems}
          handleRemoveItem={handleRemoveItem}
          handleChangeQuantity={handleChangeQuantity}
        />
        <div className={styles.totalPrice}>
          <p>Total Price: {totalPrice.toFixed(1)} $</p>
        </div>
      </div>
    </div>
  );
};

export { ShoppingCart };
