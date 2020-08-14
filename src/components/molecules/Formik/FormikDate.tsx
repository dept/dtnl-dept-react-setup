import { useField } from 'formik';
import React from 'react';

import { useFastField } from '@/utils/hooks';
import { Omit } from '@/utils/types';

import { FieldDate, FieldDateProps } from '../Form/FieldDate';
import { FormikError } from './FormikError';

type FormikDate = Omit<FieldDateProps, 'onChange' | 'value'> & {
  name: string;
  optimized?: boolean;
};

export const FormikDate: React.FC<FormikDate> = ({ name, optimized, ...props }) => {
  const [field, meta, helpers] = (optimized ? useFastField : useField)(name);

  return (
    <>
      <FieldDate
        {...props}
        {...field}
        onBlur={undefined}
        onClose={() => helpers.setTouched(true)}
        onChange={date => {
          if (date !== field.value) {
            helpers.setValue(date);
          }
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FormikError name={name} />
    </>
  );
};
