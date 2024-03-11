import { type CustomerInfo } from './customer-info.type.js';
import { type OrderItem } from './order-item.type.js';

type Order = { customerInfo: Omit<CustomerInfo, 'id'>; order: OrderItem[] };

export { type Order };
