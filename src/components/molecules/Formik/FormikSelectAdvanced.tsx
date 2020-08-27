import { FastField, Field, FieldProps } from 'formik';
import React from 'react';

import { FieldSelectAdvanced, FieldSelectAdvancedProps } from '../Form/FieldSelectAdvanced';
import { FormikError } from './FormikError';

type FormikSelectAdvancedProps = FieldSelectAdvancedProps & {
  name: string;
  optimized?: boolean;
};

export const FormikSelectAdvanced: React.FC<FormikSelectAdvancedProps> = ({
  name,
  optimized,
  ...props
}) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldSelectAdvanced
            {...props}
            {...field}
            onBlur={() => form.setFieldValue(name, true)}
            onChange={option => {
              // @ts-ignore
              form.setFieldValue(name, option && !Array.isArray(option) && option?.value);
            }}
            hasError={Boolean(meta.touched && meta.error)}
          />
        )}
      </Component>
      <FormikError name={name} />
    </>
  );
};
