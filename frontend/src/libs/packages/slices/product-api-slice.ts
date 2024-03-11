import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Order } from '~/libs/types';
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

export const makeOrder = createAsyncThunk<void, Order>(
  'productsApi/makeOrder',
  async (productData) => {
    const response = await fetch(
      'http://localhost:3001/api/v1/products/order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to send data to the server');
    }
  },
);

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
    makeOrder: builder.mutation<void, Order>({
      query: (order) => ({
        url: 'products/order',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useMakeOrderMutation,
} = productsApiSlice;
export { type Product };
