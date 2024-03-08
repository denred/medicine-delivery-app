import { CustomerInfo } from '~/libs/types/index.js';

const DEFAULT_VALUES: Omit<CustomerInfo, 'id'> = {
  email: '',
  phone: '',
  name: '',
  address: '',
};

export { DEFAULT_VALUES };
