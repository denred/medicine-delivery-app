import { FC } from 'react';
import { Button, Image } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/index.js';
import { OrderItem } from '~/libs/types';
import styles from './styles.module.scss';

type ProductCardProps = {
  src: string;
  alt: string;
  title: string;
  product: OrderItem;
  addToCart: (product: OrderItem) => void;
};

const ProductCard: FC<ProductCardProps> = ({
  src,
  alt,
  title,
  product,
  addToCart,
}: ProductCardProps): JSX.Element => {
  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  return (
    <li key={title} className={styles.container}>
      <Image className={styles.img} src={src} alt={alt} />
      <div className={styles.title}>{title}</div>
      <Button
        size="sm"
        className={styles.btn}
        label={'Add to cart'}
        onClick={handleAddToCart}
      />
    </li>
  );
};

export { ProductCard };
