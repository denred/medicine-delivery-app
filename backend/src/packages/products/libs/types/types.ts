import { type InferSelectModel } from 'drizzle-orm';

import { type products } from '~/libs/packages/database/schema/tables-schema.js';

type ProductsDatabaseModel = InferSelectModel<typeof products>;

export { type ProductsDatabaseModel };
export { type ProductEntity } from 'shared/build/index.js';
