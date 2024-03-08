import { FC } from 'react';
import { CategoryItem } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks';
import styles from './styles.module.scss';

type Category = {
  id: number;
  category: string;
};

type SidebarProps = {
  className: string;
  currentId: number;
  categories: Category[];
  handleMenuClick: (id: number) => void;
};

const Sidebar: FC<SidebarProps> = ({
  className,
  handleMenuClick,
  currentId,
  categories,
}: SidebarProps) => {
  const renderTabs = useCallback(() => {
    return categories.map(({ id, category }) => (
      <li className={styles.item} key={id}>
        <CategoryItem
          key={id}
          title={category}
          onClick={() => handleMenuClick(id)}
          current={id === currentId}
        />
      </li>
    ));
  }, [categories, handleMenuClick]);

  return (
    <div className={className}>
      <h2 className={styles.header}>Shops:</h2>
      <ul className={styles.list}>{renderTabs()}</ul>
    </div>
  );
};

export { Sidebar, type Category };
