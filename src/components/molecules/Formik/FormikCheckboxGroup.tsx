import { FastField, Field, FieldProps } from 'formik';
import React, { FC } from 'react';

import { Omit } from '@/utils/types';

import { FieldCheckboxGroup, FieldCheckboxGroupProps } from '../Form/FieldCheckboxGroup';
import { FormikError } from './FormikError';

type FormikCheckboxGroupProps = Omit<FieldCheckboxGroupProps, 'onChange' | 'value'> & {
  optimized?: boolean;
};

export const FormikCheckboxGroup: FC<FormikCheckboxGroupProps> = ({
  name,
  optimized,
  ...props
}) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldCheckboxGroup
            {...props}
            {...field}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.currentTarget;
              const newValue = [...field.value] || [];
              if (target.checked) {
                newValue.push(target.value);
              } else {
                newValue.splice(
                  newValue.findIndex(item => item === target.value),
                  1,
                );
              }
              form.setFieldValue(name, newValue);
            }}
            hasError={meta.touched && meta.error}
          />
        )}
      </Component>
      <FormikError name={name} />
    </>
  );
};
