import {
  type DatabaseSchema,
  type IDatabase,
} from '~/libs/packages/database/database.js';

import {
  type OrderItemsDatabaseModel,
  type OrdersDatabaseModel,
} from './libs/types/types.js';

class OrderRepository {
  private db: Pick<IDatabase, 'driver'>;

  private ordersSchema: DatabaseSchema['orders'];

  private orderItemsSchema: DatabaseSchema['orderItems'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    ordersSchema: DatabaseSchema['orders'],
    orderItemsSchema: DatabaseSchema['orderItems'],
  ) {
    this.db = database;
    this.ordersSchema = ordersSchema;
    this.orderItemsSchema = orderItemsSchema;
  }

  public insertOrder(
    data: Omit<OrdersDatabaseModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrdersDatabaseModel['id']> {
    return this.db
      .driver()
      .insert(this.ordersSchema)
      .values(data)
      .returning({ id: this.ordersSchema.id })
      .then((result) => result[0].id);
  }

  public insertOrderItems(
    data: Omit<OrderItemsDatabaseModel, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<OrderItemsDatabaseModel['id'][]> {
    return this.db
      .driver()
      .insert(this.orderItemsSchema)
      .values(data)
      .returning()
      .then((rows) => rows.map((row) => row.id));
  }
}

export { OrderRepository };
