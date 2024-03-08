import { FormLabel, FormName, HttpMessage } from '~/libs/enums/index.js';
import { type CustomerInfo, type FormField } from '~/libs/types/index.js';

const getUserInfoForm: FormField<Omit<CustomerInfo, 'id'>>[] = [
  {
    type: 'text',
    label: FormLabel.FULL_NAME,
    placeholder: 'Enter your full name',
    name: FormName.FULL_NAME,
  },
  {
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter your email',
    name: FormName.EMAIL,
  },
  {
    label: FormLabel.PHONE,
    placeholder: 'Enter your phone',
    name: FormName.PHONE,
    type: 'phone',
  },
  {
    type: 'text',
    label: FormLabel.ADDRESS,
    placeholder: 'Enter your address',
    name: FormName.ADDRESS,
  },
];

export { getUserInfoForm };
