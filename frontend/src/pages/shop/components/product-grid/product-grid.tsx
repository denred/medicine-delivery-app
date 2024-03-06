import { FC } from 'react';
import image from 'src/assets/img/paracetamol.jpg';
import { ProductCard } from '../product-card/product-card.js';
import styles from './styles.module.scss';

type Product = {
  id: string;
  title: string;
  src: string;
  alt: string;
};

const mocks: Product[] = [
  {
    id: '01',
    title: 'Paracetamol',
    src: image,
    alt: 'Paracetamol',
  },
  {
    id: '02',
    title: 'Ibuprofen',
    src: image,
    alt: 'Ibuprofen',
  },
  {
    id: '03',
    title: 'Aspirin',
    src: image,
    alt: 'Aspirin',
  },
  {
    id: '04',
    title: 'Cough Syrup',
    src: image,
    alt: 'Cough Syrup',
  },
];

const ProductGrid: FC = (): JSX.Element => (
  <ul className={styles.list}>
    {mocks.map(({ id, title, src, alt }) => (
      <li key={id} className={styles.item}>
        <ProductCard title={title} src={src} alt={alt} />
      </li>
    ))}
  </ul>
);

export { ProductGrid };
