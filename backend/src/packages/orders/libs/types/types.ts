import { type InferSelectModel } from 'drizzle-orm';

import {
  type orderItems,
  type orders,
} from '~/libs/packages/database/schema/tables-schema.js';

type OrdersDatabaseModel = InferSelectModel<typeof orders>;

type OrderItemsDatabaseModel = InferSelectModel<typeof orderItems>;

export { type OrderItemsDatabaseModel,type OrdersDatabaseModel };
export { type OrderDTO } from './order-dto.type.js';
export { type OrderItemEntityT } from './order-item.entity.type.js';
