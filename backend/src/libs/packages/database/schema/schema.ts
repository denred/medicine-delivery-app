import { products } from './tables-schema.js';

const schema = { products };

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
