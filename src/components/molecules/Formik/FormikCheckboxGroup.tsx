import { useField } from 'formik';
import React, { FC } from 'react';

import { useFastField } from '@/utils/hooks';
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
  const [field, meta, helpers] = (optimized ? useFastField : useField)(name);

  return (
    <>
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
          helpers.setValue(newValue);
        }}
        hasError={meta.touched && meta.error}
      />

      <FormikError name={name} />
    </>
  );
};
