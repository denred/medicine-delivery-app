import { and, eq, sql } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import {
  type DatabaseSchema,
  type IDatabase,
} from '~/libs/packages/database/database.js';

import {
  type ProductEntity,
  type ProductsDatabaseModel,
} from './libs/types/types.js';

class ProductRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private productsSchema: DatabaseSchema['products'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    productsSchema: DatabaseSchema['products'],
  ) {
    this.db = database;
    this.productsSchema = productsSchema;
  }

  public findById(id: number): Promise<ProductsDatabaseModel[]> {
    return this.db
      .driver()
      .select()
      .from(this.productsSchema)
      .where(eq(this.productsSchema.id, id));
  }

  public async findAll(): Promise<ProductsDatabaseModel[]> {
    return this.db.driver().select().from(this.productsSchema);
  }

  public async create(
    entity: Omit<ProductEntity, 'id' | 'createdAt' | 'status'>,
  ): Promise<ProductsDatabaseModel[]> {
    const preparedQuery = this.db
      .driver()
      .insert(this.productsSchema)
      .values(entity)
      .returning()
      .prepare('createProduct');

    return preparedQuery.execute();
  }

  public async update(
    id: number,
    payload: Partial<Omit<ProductEntity, 'createdAt'>>,
  ): Promise<ProductsDatabaseModel[]> {
    const preparedQuery = this.db
      .driver()
      .update(this.productsSchema)
      .set(payload)
      .where(eq(this.productsSchema.id, sql.placeholder('id')))
      .returning()
      .prepare('updateProduct');

    return preparedQuery.execute({ id });
  }

  public async delete(id: number): Promise<boolean> {
    return Boolean(
      await this.db
        .driver()
        .delete(this.productsSchema)
        .where(eq(this.productsSchema.id, id))
        .returning()
        .execute(),
    );
  }

  public find(
    partial: Partial<ProductsDatabaseModel>,
  ): Promise<ProductsDatabaseModel[]> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.productsSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver()
      .query.products.findMany({
        where: finalQuery,
        with: { group: true },
      })
      .execute();
  }
}

export { ProductRepository };
