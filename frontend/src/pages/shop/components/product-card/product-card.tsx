import { FC } from 'react';
import { Button, Image } from '~/libs/components/components.js';
import styles from './styles.module.scss';

type ProductCardProps = {
  src: string;
  alt: string;
  title: string;
};

const ProductCard: FC<ProductCardProps> = ({
  src,
  alt,
  title,
}: ProductCardProps): JSX.Element => (
  <div className={styles.container}>
    <Image className={styles.img} src={src} alt={alt} />
    <div className={styles.title}>{title}</div>
    <Button size="sm" className={styles.btn} label={'Add to cart'} />
  </div>
);

export { ProductCard };
