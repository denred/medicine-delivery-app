const ProductsApiPath = {
  ROOT: '/',
  $ID: '/:id',
  $CATEGORY: '/rank/:category',
  CATEGORIES: '/categories/',
  ORDER: '/order',
} as const;

export { ProductsApiPath };
