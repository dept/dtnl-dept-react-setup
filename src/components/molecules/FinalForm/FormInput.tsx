import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldInput, FieldInputProps } from '../Form/FieldInput';
import { FormError } from './FormError';

type FormInputProps = FieldInputProps & {
  name: string;
};

export const FormInput: React.FC<FormInputProps> = ({ name, type = 'text', ...props }) => {
  const form = useForm();
  const { input, meta } = useField(name, {
    type,
  });

  return (
    <>
      <FieldInput
        {...props}
        {...input}
        type={type}
        value={input.value ?? ''}
        hasError={Boolean(meta.touched && meta.error)}
        onClear={() => {
          form.change(name, '');
        }}
      />

      <FormError name={name} />
    </>
  );
};
