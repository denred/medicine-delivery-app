import { type FC } from 'react';
import { Header } from '../header/header.js';
import { RouterOutlet } from '../router/router.js';
import { Sidebar } from '~/pages/shop/components/sidebar/sidebar.js';
import styles from './styles.module.scss';

type Properties = {
  children?: JSX.Element;
};

const PageLayout: FC<Properties> = ({ children }: Properties) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <main className={styles.content}>
        <RouterOutlet />
        {children}
      </main>
    </div>
  );
};

export { PageLayout };
