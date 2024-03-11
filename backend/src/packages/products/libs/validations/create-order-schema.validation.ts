import Joi from 'joi';

import {
  type CustomerInfo,
  type Order,
  type OrderItem,
} from '../types/types.js';

const orderItemSchema = Joi.object<OrderItem>({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  totalPrice: Joi.number().required(),
  quantity: Joi.number().required(),
  image: Joi.string().required(),
});

const customerInfoSchema = Joi.object<Omit<CustomerInfo, 'id'>>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

const createOrderSchema = Joi.object<Order>({
  customerInfo: customerInfoSchema.required(),
  order: Joi.array().items(orderItemSchema).min(1).required(),
});

export { createOrderSchema };
