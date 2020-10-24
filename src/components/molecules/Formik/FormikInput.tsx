import { FastField, Field, FieldProps } from 'formik';
import React from 'react';

import { FieldInput, FieldInputProps } from '../Form/FieldInput';
import { FormikError } from './FormikError';

type FormikInput = FieldInputProps & {
  name: string;
  optimized?: boolean;
};

export const FormikInput: React.FC<FormikInput> = ({
  name,
  type = 'text',
  optimized = true,
  ...props
}) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldInput
            type={type}
            {...props}
            {...field}
            value={field.value ?? ''}
            hasError={Boolean(meta.touched && meta.error)}
            onClear={() => {
              form.setFieldValue(name, '');
            }}
          />
        )}
      </Component>
      <FormikError name={name} />
    </>
  );
};
