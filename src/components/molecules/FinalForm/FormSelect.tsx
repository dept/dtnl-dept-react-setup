import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect';
import { FormError } from './FormError';

type FormSelectProps = FieldSelectProps & {
  name: string;
};

export const FormSelect: React.FC<FormSelectProps> = ({ name, ...props }) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldSelect
        {...props}
        {...input}
        onChange={item => {
          form.change(name, item);
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FormError name={name} />
    </>
  );
};
