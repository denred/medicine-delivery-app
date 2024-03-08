import {
  type ErrorOption,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { type FormLabel, HttpMessage, InputType } from '~/libs/enums/index.js';
import { ValueOf } from 'shared/build/index.js';

type KnownErrorMessages = ValueOf<typeof HttpMessage>;

type ErrorDescriptor =
  | {
      errorMessage: KnownErrorMessages;
      error: ErrorOption;
      options?: {
        shouldFocus: boolean;
      };
    }
  | KnownErrorMessages;

type FormField<T extends FieldValues> = {
  type?: ValueOf<typeof InputType>;
  label: string;
  placeholder?: string;
  name: FieldPath<T>;
  min?: number;
  max?: number;
  currency?: string;
  step?: number;
  id?: ValueOf<typeof FormLabel>;
  associateServerErrors?: ErrorDescriptor[];
};

export { type ErrorDescriptor, type FormField };
