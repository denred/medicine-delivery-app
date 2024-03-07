import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import { type ProductEntity as ProductEntityT } from './libs/types/types.js';
import { ProductEntity } from './product.entity.js';
import { type ProductRepository } from './product.repository.js';

class ProductService implements IService {
  private productRepository: ProductRepository;

  public constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async findById(id: number): Promise<ProductEntityT | null> {
    const [product = null] = await this.productRepository.findById(id);

    return product ? ProductEntity.initialize(product).toObject() : null;
  }

  public async create(
    payload: Omit<ProductEntityT, 'id' | 'createdAt'>,
  ): Promise<ProductEntityT> {
    const { vendorCode, description, image, ...product } = payload;

    if (vendorCode) {
      const existingProduct = await this.productRepository.find(vendorCode);

      if (existingProduct.length > 0) {
        throw new HttpError({
          status: HttpCode.BAD_REQUEST,
          message: HttpMessage.PRODUCT_EXIST,
        });
      }
    }

    const [result] = await this.productRepository.create({
      vendorCode: vendorCode ?? null,
      description: description ?? null,
      image: image ?? null,
      ...product,
    });

    return ProductEntity.initialize(result).toObject();
  }

  public async update(
    id: number,
    payload: Partial<Omit<ProductEntityT, 'createdAt'>>,
  ): Promise<ProductEntityT> {
    const product = await this.findById(id);

    if (!product) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.NOT_FOUND,
      });
    }

    const [result] = await this.productRepository.update(id, payload);

    return ProductEntity.initialize(result).toObject();
  }

  public async delete(id: number): Promise<boolean> {
    return this.productRepository.delete(id);
  }

  public async getAll(): Promise<ProductEntityT[]> {
    const result = await this.productRepository.findAll();

    return result.map((element) =>
      ProductEntity.initialize(element).toObject(),
    );
  }
}

export { ProductService };
