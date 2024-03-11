import { orderItems, orders,products } from './tables-schema.js';

const schema = { products, orderItems, orders };

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
