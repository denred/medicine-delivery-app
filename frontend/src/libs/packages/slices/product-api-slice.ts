import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Category } from '~/pages/shop/components/sidebar/sidebar';

interface Product {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
  vendorCode: string;
}

export const productsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/',
  }),
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products/',
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) =>
        `products/rank/${category.length > 0 ? category : 'j'}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => 'products/categories',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
} = productsApiSlice;
export { type Product };
