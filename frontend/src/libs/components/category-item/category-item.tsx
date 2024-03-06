import { FC } from 'react';
import { getValidClassNames } from '~/libs/helpers/helpers';
import styles from './styles.module.scss';

type CategoryItemProps = {
  title: string;
  current?: boolean;
  onClick: () => void;
};

const CategoryItem: FC<CategoryItemProps> = ({
  title,
  current = false,
  onClick,
}): JSX.Element => {
  return (
    <div
      className={getValidClassNames(styles.container, {
        [styles.filled]: current,
      })}
    >
      <button className={styles.button} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export { CategoryItem };
