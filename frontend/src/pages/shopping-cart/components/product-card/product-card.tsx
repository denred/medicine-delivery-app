import { FC } from 'react';
import {
  useCallback,
  useShoppingCart,
  useEffect,
  useState,
} from '~/libs/hooks';
import { Image } from '~/libs/components/image/image.js';
import { Button, Icon } from '~/libs/components/components';
import { IconName } from '~/libs/enums';
import styles from './styles.module.scss';

type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  handleRemoveItem: (id: number) => void;
};

const ProductCard: FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  quantity,
  handleRemoveItem,
}): JSX.Element => {
  const [count, setCount] = useState(quantity);
  const { changeProductQuantity } = useShoppingCart();

  const handleQuantityChange = useCallback((change: number) => {
    setCount((prevCount) => Math.max(1, prevCount + change));
  }, []);

  useEffect(() => {
    changeProductQuantity(id, count);
  }, [count]);

  return (
    <li key={id} className={styles.container}>
      <Button
        className={styles.closeBtn}
        size="sm"
        onClick={() => handleRemoveItem(id)}
      >
        <Icon iconName={IconName.CLOSE} />
      </Button>
      <Image className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <h2 className={styles.header}>{name}</h2>
        <p>Price: {price} $</p>
        <div className={styles.countBox}>
          <Button
            className={styles.btn}
            size="sm"
            onClick={() => handleQuantityChange(-1)}
          >
            <Icon iconName={IconName.MINUS} />
          </Button>
          <div className={styles.price}>{count}</div>
          <Button
            className={styles.btn}
            size="sm"
            onClick={() => handleQuantityChange(1)}
          >
            <Icon iconName={IconName.PLUS} />
          </Button>
        </div>
      </div>
    </li>
  );
};

export { ProductCard };
