import { pgTable, real, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

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

export { products };
