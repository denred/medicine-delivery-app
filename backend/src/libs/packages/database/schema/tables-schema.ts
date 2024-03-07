import { pgTable, real, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const products = pgTable('products', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 256 }).notNull().unique(),
  title: varchar('title', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  price: real('price').notNull(),
  image: varchar('image', { length: 256 }),
  vendorCode: varchar('vendorCode', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export { products };
