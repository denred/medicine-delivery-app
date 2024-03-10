import { FC } from 'react';
import joi from 'joi';
import { getUserInfoForm } from './libs/fields.js';
import { DEFAULT_VALUES } from './libs/constants';
import { Form } from '~/libs/components/components.js';
import { ProductGrid } from './components/product-grid/product-grid.js';
import styles from './styles.module.scss';

const ShoppingCart: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.customerInfo}>
        <div className={styles.formWrapper}>
          <Form
            defaultValues={DEFAULT_VALUES}
            onSubmit={() => {}}
            fields={getUserInfoForm}
            btnLabel={'Make order'}
            validationSchema={joi.object()}
          />
        </div>
      </div>
      <div className={styles.cart}>
        <ProductGrid />
      </div>
    </div>
  );
};

export { ShoppingCart };
