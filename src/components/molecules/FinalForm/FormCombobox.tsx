import { FC } from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldCombobox, FieldComboboxProps } from '../Form/FieldCombobox';
import { FormError } from './FormError';

type FormComboboxProps = FieldComboboxProps & {
  name: string;
};

export const FormCombobox: FC<FormComboboxProps> = ({ name, ...props }) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldCombobox
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
