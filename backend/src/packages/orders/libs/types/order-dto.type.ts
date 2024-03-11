import { type Order } from '~/libs/types/types';

type OrderDTO = Order['customerInfo'] & {
  id: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export { type OrderDTO };
