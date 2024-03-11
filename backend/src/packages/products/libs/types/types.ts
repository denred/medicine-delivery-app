import { type InferSelectModel } from 'drizzle-orm';

import { type products } from '~/libs/packages/database/schema/tables-schema.js';

type ProductsDatabaseModel = InferSelectModel<typeof products>;

export { type ProductsDatabaseModel };
export {
  type CustomerInfo,
  type Order,
  type OrderItem,
  type ProductEntity,
} from 'shared/build/index.js';
