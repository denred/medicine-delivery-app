CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(1024),
	"price" real NOT NULL,
	"image" varchar(256),
	"vendorCode" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_category_unique" UNIQUE("category")
);
