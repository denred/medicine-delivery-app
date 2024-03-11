import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import {
  type NullableProperties,
  type Order as OrderT,
} from '~/libs/types/types.js';

import { type OrderDTO, type OrdersDatabaseModel } from './libs/types/types.js';

class OrderEntity implements IEntity {
  private id: number | null;

  private phone: OrderT['customerInfo']['phone'];

  private email: OrderT['customerInfo']['email'];

  private name: OrderT['customerInfo']['name'];

  private address: OrderT['customerInfo']['address'];

  private createdAt: string | null;

  private updatedAt: string | null;

  public constructor({
    id,
    phone,
    email,
    name,
    address,
    createdAt,
    updatedAt,
  }: NullableProperties<OrderDTO, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = id;
    this.phone = phone;
    this.email = email;
    this.name = name;
    this.address = address;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    phone,
    email,
    name,
    address,
    createdAt,
    updatedAt,
  }: OrdersDatabaseModel): OrderEntity {
    return new OrderEntity({
      id,
      phone,
      email,
      name,
      address,
      createdAt: new Date(createdAt).toISOString(),
      updatedAt: new Date(updatedAt).toISOString(),
    });
  }

  public toObject(): OrderDTO {
    return {
      id: this.id,
      phone: this.phone,
      email: this.email,
      name: this.name,
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toNewObject(): Omit<OrderDTO, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      phone: this.phone,
      email: this.email,
      name: this.name,
      address: this.address,
    };
  }
}

export { OrderEntity };
