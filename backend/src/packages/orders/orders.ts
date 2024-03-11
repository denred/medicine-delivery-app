import { database, schema } from '~/libs/packages/database/database.js';

import { OrderRepository } from './order.repository.js';
import { OrderService } from './order.service.js';

const orderRepository = new OrderRepository(
  database,
  schema.orders,
  schema.orderItems,
);
const orderService = new OrderService(orderRepository);

export { orderService };
export { type OrderService } from './order.service.js';