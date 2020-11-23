import { FC } from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldCheckboxGroup, FieldCheckboxGroupProps } from '../Form/FieldCheckboxGroup';
import { FormError } from './FormError';

type FormCheckboxGroupProps = Omit<FieldCheckboxGroupProps, 'onChange' | 'value'> & {
  optimized?: boolean;
};

export const FormCheckboxGroup: FC<FormCheckboxGroupProps> = ({ name, ...props }) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldCheckboxGroup
        {...props}
        {...input}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const target = e.currentTarget;
          const newValue = [...input.value] || [];
          if (target.checked) {
            newValue.push(target.value);
          } else {
            newValue.splice(
              newValue.findIndex(item => item === target.value),
              1,
            );
          }
          form.change(name, newValue);
        }}
        hasError={meta.touched && meta.error}
      />

      <FormError name={name} />
    </>
  );
};
