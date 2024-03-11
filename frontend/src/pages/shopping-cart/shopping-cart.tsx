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
import { CustomerInfo } from '~/libs/types/index.js';
import { useMakeOrderMutation } from '~/libs/packages/slices/product-api-slice.js';
import styles from './styles.module.scss';

const ShoppingCart: FC = () => {
  const { getTotalPrice, removeFromCart, getCart, changeProductQuantity } =
    useShoppingCart();
  const [totalPrice, setTotalPrice] = useState<number>(getTotalPrice());
  const [cartItems, setCartItems] = useState<OrderItem[]>(getCart());
  const [makeOrder] = useMakeOrderMutation();

  const handleChangeQuantity = useCallback(
    (id: number, change: number) => {
      changeProductQuantity(id, change);
      setCartItems(getCart());
    },
    [changeProductQuantity],
  );

  const handleRemoveItem = useCallback((id: number) => {
    removeFromCart(id);
    setCartItems(getCart());
  }, []);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [cartItems]);

  const onSubmit = useCallback((formData: Omit<CustomerInfo, 'id'>) => {
    makeOrder({ customerInfo: formData, order: getCart() })
      .unwrap()
      .then(() => {
        console.log('Data sent successfully');
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.customerInfo}>
        <div className={styles.formWrapper}>
          <Form
            defaultValues={DEFAULT_VALUES}
            onSubmit={onSubmit}
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
