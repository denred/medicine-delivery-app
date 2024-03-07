ALTER TABLE "products" DROP CONSTRAINT "products_category_unique";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "title" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "vendorCode" SET DATA TYPE varchar(1024);