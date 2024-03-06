import { FC } from 'react';
import { getValidClassNames } from '~/libs/helpers/helpers';
import styles from './styles.module.scss';
import { Button } from '../button/button.js';

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
      <Button
        className={getValidClassNames(styles.button, {
          [styles.filled]: current,
        })}
        onClick={onClick}
        label={title}
      />
    </div>
  );
};

export { CategoryItem };
