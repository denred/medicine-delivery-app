import { FC } from 'react';
import { useNavigate, useCallback } from '~/libs/hooks';
import { AppRoute, IconName } from '~/libs/enums';
import { Button } from '../components';
import { type ValueOf } from '~/libs/types';
import styles from './styles.module.scss';

const Header: FC = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (route: ValueOf<typeof AppRoute>) => {
      navigate(route);
    },
    [navigate],
  );

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <ul>
          <li className={styles.listItem}>
            <Button
              className={styles.link}
              label={IconName.SHOP}
              onClick={() => handleClick(AppRoute.ROOT)}
            />
          </li>
          <div className={styles.delimiter}></div>
          <li className={styles.listItem}>
            <Button
              className={styles.link}
              label={IconName.CART}
              onClick={() => handleClick(AppRoute.SHOPPING_CART)}
            />
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Header };
