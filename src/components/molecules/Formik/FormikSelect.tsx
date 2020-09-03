import { FastField, Field, FieldProps } from 'formik';
import React from 'react';

import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect';
import { FormikError } from './FormikError';

type FormikSelectProps = FieldSelectProps & {
  name: string;
  optimized?: boolean;
};

export const FormikSelect: React.FC<FormikSelectProps> = ({ name, optimized, ...props }) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldSelect
            {...props}
            {...field}
            onBlur={() => form.setFieldTouched(name, true)}
            onChange={item => {
              form.setFieldValue(name, item);
            }}
            hasError={Boolean(meta.touched && meta.error)}
          />
        )}
      </Component>
      <FormikError name={name} />
    </>
  );
};
