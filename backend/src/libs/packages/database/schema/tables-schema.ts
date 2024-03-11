import {
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const products = pgTable('products', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 1024 }).notNull(),
  title: varchar('title', { length: 1024 }).notNull(),
  description: varchar('description', { length: 1024 }),
  price: real('price').notNull(),
  image: varchar('image', { length: 1024 }),
  vendorCode: varchar('vendorCode', { length: 1024 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  phone: varchar('phone').notNull(),
  email: varchar('email').notNull(),
  name: varchar('name').notNull(),
  address: varchar('address').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .references(() => orders.id)
    .notNull(),
  productId: integer('productId')
    .references(() => products.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export { orderItems, orders,products };
