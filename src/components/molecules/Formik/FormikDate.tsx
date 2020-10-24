import { FastField, Field, FieldProps } from 'formik';
import React from 'react';

import { Omit } from '@/utils/types';

import { FieldDate, FieldDateProps } from '../Form/FieldDate';
import { FormikError } from './FormikError';

type FormikDate = Omit<FieldDateProps, 'onChange' | 'value'> & {
  name: string;
  optimized?: boolean;
};

export const FormikDate: React.FC<FormikDate> = ({ name, optimized, ...props }) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldDate
            {...props}
            {...field}
            onBlur={undefined}
            onClose={() => form.setFieldTouched(name, true)}
            onChange={date => {
              form.setFieldValue(name, date);
            }}
            onClear={() => {
              form.setFieldValue(name, undefined);
            }}
            hasError={Boolean(meta.touched && meta.error)}
          />
        )}
      </Component>

      <FormikError name={name} />
    </>
  );
};
