import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldSelectAdvanced, FieldSelectAdvancedProps } from '../Form/FieldSelectAdvanced';
import { FormError } from './FormError';

type FormSelectAdvancedProps = FieldSelectAdvancedProps & {
  name: string;
};

export const FormSelectAdvanced: React.FC<FormSelectAdvancedProps> = ({
  name,

  ...props
}) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldSelectAdvanced
        {...(props as any)}
        {...input}
        onChange={option => {
          // @ts-ignore
          form.change(name, option && !Array.isArray(option) && option?.value);
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FormError name={name} />
    </>
  );
};
