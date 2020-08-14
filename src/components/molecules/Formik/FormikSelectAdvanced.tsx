import { useField } from 'formik';
import React from 'react';

import { useFastField } from '@/utils/hooks';

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
  const [field, meta, helpers] = (optimized ? useFastField : useField)(name);

  return (
    <>
      <FieldSelectAdvanced
        {...props}
        {...field}
        onBlur={() => helpers.setValue(true)}
        onChange={option => {
          // @ts-ignore
          helpers.setValue(option && !Array.isArray(option) && option?.value);
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FormikError name={name} />
    </>
  );
};
