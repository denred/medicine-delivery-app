import { type IEntity } from '~/libs/interfaces/entity.interface';
import { type NullableProperties } from '~/libs/types/types';

import { type OrderItemEntityT } from './libs/types/types.js';

class OrderItemEntity implements IEntity {
  private id: number | null;

  private orderId: number;

  private productId: number;

  private quantity: number;

  private createdAt: string | null;

  private updatedAt: string | null;

  public constructor({
    id,
    orderId,
    productId,
    quantity,
    createdAt,
    updatedAt,
  }: NullableProperties<OrderItemEntityT, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId || 0;
    this.quantity = quantity || 0;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toObject(): OrderItemEntityT {
    return {
      id: this.id || 0,
      orderId: this.orderId,
      productId: this.productId,
      quantity: this.quantity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toNewObject(): Omit<
    OrderItemEntityT,
    'id' | 'createdAt' | 'updatedAt'
  > {
    return {
      orderId: this.orderId,
      productId: this.productId,
      quantity: this.quantity,
    };
  }
}

export { OrderItemEntity };
