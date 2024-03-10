import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { Method, ProductsApiPath } from './libs/enums/enums.js';
import { type ProductEntity } from './libs/types/types.js';
import { type ProductService } from './product.service.js';

/**
 * @swagger
 * tags:
 *   name: product
 *   description: Products API
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           example: drugs
 *         title:
 *           type: string
 *           example: paracetamol
 *         description:
 *           type: string
 *           example: description
 *         price:
 *           type: number
 *           example: 12.3
 *         image:
 *           type: string
 *           example: http://image
 *         vendorCode:
 *           type: string
 *           example: 10001
 *
 *     ProductResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         category:
 *           type: string
 *           example: drugs
 *         title:
 *           type: string
 *           example: paracetamol
 *         description:
 *           type: string
 *           example: description
 *         price:
 *           type: number
 *           example: 12.3
 *         image:
 *           type: string
 *           example: http://image
 *         vendorCode:
 *           type: string
 *           example: 10001
 *
 *     ErrorType:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *           example: COMMON
 *           enum:
 *             - COMMON
 *             - VALIDATION
 *
 *     ProductAlreadyExists:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Product already exists!
 */

class ProductController extends Controller {
  private productsService: ProductService;

  public constructor(logger: ILogger, productsService: ProductService) {
    super(logger, ApiPath.PRODUCTS);
    this.productsService = productsService;

    this.addRoute({
      path: ProductsApiPath.$ID,
      method: Method.PUT,
      handler: (request) =>
        this.update(
          request as ApiHandlerOptions<{
            body: Partial<Omit<ProductEntity, 'createdAt'>>;
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: ProductsApiPath.ROOT,
      method: Method.POST,
      handler: (request) =>
        this.create(
          request as ApiHandlerOptions<{
            body: Omit<ProductEntity, 'id' | 'createdAt'>;
          }>,
        ),
    });

    this.addRoute({
      path: ProductsApiPath.ROOT,
      method: Method.GET,
      handler: () => this.getAll(),
    });

    this.addRoute({
      path: ProductsApiPath.CATEGORIES,
      method: Method.GET,
      handler: () => this.getCategories(),
    });

    this.addRoute({
      path: ProductsApiPath.$ID,
      method: Method.GET,
      handler: (request) =>
        this.get(
          request as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: ProductsApiPath.$ID,
      method: Method.DELETE,
      handler: (request) =>
        this.delete(
          request as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: ProductsApiPath.$CATEGORY,
      method: Method.GET,
      handler: (request) =>
        this.getByCategory(
          request as ApiHandlerOptions<{
            params: { category: string };
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /products/{id}:
   *   put:
   *     summary: Update a product by ID
   *     tags:
   *       - product
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the product to update
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       description: Updated product data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       '200':
   *         description: Product updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProductResponse'
   *       '400':
   *         description: Bad request
   *       '404':
   *         description: Product not found
   *
   */

  private async update(
    options: ApiHandlerOptions<{
      body: Partial<Omit<ProductEntity, 'createdAt'>>;
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const { params, body } = options;

    const updated = await this.productsService.update(params.id, body);

    return {
      status: HttpCode.OK,
      payload: updated,
    };
  }

  /**
   * @swagger
   * /products/:
   *   post:
   *     summary: Create a new product
   *     tags:
   *       - product
   *     requestBody:
   *       description: Product data to create
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       '201':
   *         description: Product created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProductResponse'
   *       '400':
   *         description: Bad request
   */
  private async create(
    options: ApiHandlerOptions<{
      body: Omit<ProductEntity, 'id' | 'createdAt'>;
    }>,
  ): Promise<ApiHandlerResponse> {
    const { body } = options;

    const createdProduct = await this.productsService.create(body);

    return {
      status: HttpCode.CREATED,
      payload: createdProduct,
    };
  }

  /**
   * @swagger
   * /products/:
   *   get:
   *     summary: Get all products
   *     tags:
   *       - product
   *     responses:
   *       '200':
   *         description: List of products
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ProductResponse'
   */
  private async getAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.productsService.getAll(),
    };
  }

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     summary: Get a Product by ID
   *     tags:
   *       - product
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the Product to retrieve
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Product retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProductResponse'
   *       '404':
   *         description: Product not found
   */
  private async get(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.productsService.findById(options.params.id),
    };
  }

  /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     summary: Delete a Product by ID
   *     tags:
   *       - product
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the Product to delete
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '204':
   *         description: Product deleted successfully
   *       '404':
   *         description: Product not found
   */
  private async delete(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.NO_CONTENT,
      payload: await this.productsService.delete(options.params.id),
    };
  }

  /**
   * @swagger
   * /products/rank/{category}:
   *   get:
   *     summary: Get products by category
   *     tags:
   *       - product
   *     parameters:
   *       - name: category
   *         in: path
   *         description: Category of products to retrieve
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Products retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ProductResponse'
   *       '404':
   *         description: Products not found for the given category
   */
  private async getByCategory(
    options: ApiHandlerOptions<{
      params: { category: string };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.productsService.findByCategory(
        options.params.category,
      ),
    };
  }

  /**
   * @swagger
   * /products/categories/:
   *   get:
   *     summary: Get all product categories
   *     tags:
   *       - product
   *     responses:
   *       '200':
   *         description: List of product categories
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: number
   *                     example: 1
   *                   category:
   *                     type: string
   *                     example: drugs
   *       '404':
   *         description: No product categories found
   */
  private async getCategories(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.productsService.getCategories(),
    };
  }
}

export { ProductController };
