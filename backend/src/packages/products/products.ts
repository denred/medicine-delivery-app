import { database, schema } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { ProductController } from './product.controller.js';
import { ProductRepository } from './product.repository.js';
import { ProductService } from './product.service.js';

const productRepository = new ProductRepository(database, schema.products);
const productService = new ProductService(productRepository);
const productController = new ProductController(logger, productService);

export { productController };
