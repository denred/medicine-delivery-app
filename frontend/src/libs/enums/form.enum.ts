const FormName = {
  FULL_NAME: 'fullName',
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address',
} as const;

const FormLabel = {
  FULL_NAME: 'Name',
  EMAIL: 'Email',
  PHONE: 'Phone',
  ADDRESS: 'Address',
} as const;

export { FormLabel, FormName };
