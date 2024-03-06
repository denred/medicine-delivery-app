import { FC } from 'react';
import { Route } from 'react-router-dom';
import { NotFound, Shop, ShoppingCart } from '~/pages';
import { RouterProvider } from '../router-provider/router-provider.js';
import { AppRoute } from '~/libs/enums';
import { PageLayout } from '../page-layout/page-layout.js';

const Router: FC = (): JSX.Element => (
  <RouterProvider>
    <Route
      path={AppRoute.ROOT}
      element={
        <PageLayout>
          <Shop />
        </PageLayout>
      }
    />

    <Route
      path={AppRoute.SHOPPING_CART}
      element={
        <PageLayout>
          <ShoppingCart />
        </PageLayout>
      }
    />

    <Route
      path={AppRoute.ANY}
      element={
        <PageLayout>
          <NotFound />
        </PageLayout>
      }
    />
  </RouterProvider>
);

export { Router };
export { Outlet as RouterOutlet } from 'react-router-dom';
