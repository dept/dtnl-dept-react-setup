import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldInput, FieldInputProps } from '../Form/FieldInput';
import { FinalFormError } from './FinalFormError';

type FinalFormInput = FieldInputProps & {
  name: string;
};

export const FinalFormInput: React.FC<FinalFormInput> = ({ name, type = 'text', ...props }) => {
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

      <FinalFormError name={name} />
    </>
  );
};
