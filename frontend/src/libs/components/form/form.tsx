import {
  type Control,
  type FieldErrors,
  type UseFormClearErrors,
  type UseFormSetError,
} from 'react-hook-form';

import { useAppForm, useCallback, useEffect } from '~/libs/hooks/index.js';
import {
  type DeepPartial,
  type FieldValues,
  type FormField,
  type ServerErrorHandling,
  type ValidationSchema,
} from '~/libs/types/index.js';

import { Button } from '../button/button.jsx';

import { Input } from '../input/input.jsx';
import { handleServerError } from './libs/helpers/handle-server-error.helper.js';
import styles from './styles.module.scss';
import { HttpException } from '~/libs/exceptions/exceptions.js';

type Properties<T extends FieldValues> = {
  fields: FormField<T>[];
  defaultValues: DeepPartial<T>;
  validationSchema: ValidationSchema;
  btnLabel?: string;
  isDisabled?: boolean;
  onSubmit: (payload: T) => void;
  serverError?: ServerErrorHandling;
  additionalFields?: JSX.Element;
};

type RenderFieldProperties<T extends FieldValues = FieldValues> = {
  field: FormField<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  clearServerError?: ServerErrorHandling['clearError'];
};

const renderField = <T extends FieldValues = FieldValues>({
  field,
  control,
  errors,
  setError,
  clearErrors,
  clearServerError,
}: RenderFieldProperties<T>): JSX.Element => {
  switch (field.type) {
    case 'number':
    case 'text':
    case 'email':
    case 'password': {
      return (
        <Input
          {...field}
          control={control as Control<FieldValues, null>}
          errors={errors}
          setError={setError as UseFormSetError<FieldValues>}
          clearServerError={clearServerError}
        />
      );
    }

    default: {
      return (
        <Input
          {...field}
          control={control as Control<FieldValues, null>}
          errors={errors}
          setError={setError as UseFormSetError<FieldValues>}
        />
      );
    }
  }
};

const Form = <T extends FieldValues = FieldValues>({
  fields,
  defaultValues,
  validationSchema,
  btnLabel,
  additionalFields,
  isDisabled,
  onSubmit,
  serverError,
}: Properties<T>): JSX.Element => {
  const { control, errors, handleSubmit, setError, clearErrors } =
    useAppForm<T>({
      defaultValues,
      validationSchema,
    });

  useEffect(() => {
    if (serverError?.error) {
      handleServerError(serverError.error as HttpException, setError, fields);
    }
  }, [fields, serverError?.error, setError]);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      event_.preventDefault();

      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const createInputs = (): JSX.Element[] => {
    return fields.map((field, index) => (
      <div key={field.id ?? index}>
        {renderField({
          field,
          control,
          errors,
          setError,
          clearErrors,
          clearServerError: serverError?.clearError,
        })}
      </div>
    ));
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
      {createInputs()}
      {additionalFields}
      <Button
        type="submit"
        label={btnLabel ?? 'Submit'}
        isDisabled={isDisabled}
        isFullWidth
      />
    </form>
  );
};

export { Form };
