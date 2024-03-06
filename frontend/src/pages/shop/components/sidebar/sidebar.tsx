import { CategoryItem } from '~/libs/components/components.js';
import { useCallback, useState } from '~/libs/hooks';
import styles from './styles.module.scss';
import { FC } from 'react';

type Product = {
  id: string;
  category: string;
};

const mockProducts: Product[] = [
  {
    id: '01',
    category: 'Drugs 24',
  },
  {
    id: '02',
    category: 'Pharmacy',
  },
  {
    id: '03',
    category: 'Pharmacy01',
  },
  {
    id: '04',
    category: 'Pharmacy02',
  },
  {
    id: '05',
    category: 'Pharmacy03',
  },
];

type SidebarProps = {
  className: string;
};

const Sidebar: FC<SidebarProps> = ({ className }: SidebarProps) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<string>(
    mockProducts?.[0]?.id,
  );

  const handleMenuClick = useCallback(
    (id: string) => {
      setCurrentMenuItem(id);
    },
    [currentMenuItem],
  );

  const renderTabs = useCallback(() => {
    return mockProducts.map(({ id, category }) => (
      <li className={styles.item} key={id}>
        <CategoryItem
          key={id}
          title={category}
          onClick={() => handleMenuClick(id)}
          current={id === currentMenuItem}
        />
      </li>
    ));
  }, [mockProducts, handleMenuClick]);

  return (
    <div className={className}>
      <h2 className={styles.header}>Shops:</h2>
      <ul className={styles.list}>{renderTabs()}</ul>
    </div>
  );
};

export { Sidebar };
