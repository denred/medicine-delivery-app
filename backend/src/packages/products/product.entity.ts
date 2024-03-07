import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import {
  type ProductEntity as ProductEntityT,
  type ProductsDatabaseModel,
} from './libs/types/types.js';

class ProductEntity implements IEntity {
  private id: ProductEntityT['id'] | null;

  private category: ProductEntityT['category'];

  private title: ProductEntityT['title'];

  private description: ProductEntityT['description'];

  private price: ProductEntityT['price'];

  private image: ProductEntityT['image'] | null;

  private vendorCode: ProductEntityT['vendorCode'] | null;

  private createdAt: string | null;

  private constructor({
    id,
    category,
    title,
    description,
    price,
    image,
    vendorCode,
    createdAt,
  }: NullableProperties<
    ProductEntityT,
    'id' | 'image' | 'vendorCode' | 'createdAt'
  >) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
    this.vendorCode = vendorCode;
    this.createdAt = createdAt ?? null;
  }

  public static initialize({
    id,
    category,
    title,
    description,
    price,
    image,
    vendorCode,
    createdAt,
  }: ProductsDatabaseModel): ProductEntity {
    return new ProductEntity({
      id,
      category,
      title,
      description: description ?? undefined,
      price,
      image,
      vendorCode,
      createdAt: new Date(createdAt).toISOString(),
    });
  }

  public static initializeNew({
    category,
    title,
    description,
    price,
    image,
    vendorCode,
    createdAt,
  }: Omit<ProductEntityT, 'id'>): ProductEntity {
    return new ProductEntity({
      id: null,
      category,
      title,
      description,
      price,
      image,
      vendorCode,
      createdAt,
    });
  }

  public toObject(): ProductEntityT {
    return {
      id: this.id as number,
      category: this.category,
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.image ?? undefined,
      vendorCode: this.vendorCode ?? undefined,
      createdAt: this.createdAt ?? undefined,
    };
  }

  public toNewObject(): Omit<ProductEntityT, 'id'> {
    return {
      category: this.category,
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.image ?? undefined,
      vendorCode: this.vendorCode ?? undefined,
      createdAt: this.createdAt ?? undefined,
    };
  }
}

export { ProductEntity };
