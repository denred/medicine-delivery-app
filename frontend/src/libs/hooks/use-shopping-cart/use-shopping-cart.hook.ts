import { useState } from 'react';
import { OrderItem, type OrderItem as Product } from '~/libs/types/index.js';
import { useLocalStorage } from '../use-local-storage/use-local-storage.hook';
import { StorageKey } from '~/libs/enums';

const useShoppingCart = () => {
  const { getItem, setItem } = useLocalStorage<Product[]>(StorageKey.TOKEN, []);

  const [cart, setCart] = useState<Product[]>(getItem());

  const updateCart = (newCart: Product[]): void => {
    setItem(newCart);
  };

  const getCart = (): OrderItem[] => getItem();

  const addToCart = (product: Product): void => {
    setCart((currentCart) => {
      const index = currentCart.findIndex(({ id }) => id === product.id);
      let newCart = [...currentCart];

      if (index >= 0) {
        const updatedCart = newCart.map((item, i) => {
          if (i === index) {
            const qty = item.quantity + 1;
            return { ...item, quantity: qty };
          }
          return item;
        });
        newCart = updatedCart;
      } else {
        newCart = [...newCart, { ...product, quantity: 1 }];
      }

      updateCart(newCart);

      return newCart;
    });
  };

  const removeFromCart = (productId: number): void => {
    const currentCart = getCart();
    const updatedCart = currentCart.filter(({ id }) => id !== productId);
    setCart(updatedCart);
    updateCart(updatedCart);
  };

  const changeProductQuantity = (
    productId: number,
    newQuantity: number,
  ): void => {
    const currentCart = getCart();
    const updatedCart = currentCart.map((product) =>
      product.id === productId
        ? { ...product, quantity: newQuantity }
        : product,
    );

    setCart(updatedCart);
    updateCart(updatedCart);
  };

  const clearCart = (): void => {
    updateCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    changeProductQuantity,
    clearCart,
    updateCart,
    getCart,
  };
};

export { useShoppingCart };
