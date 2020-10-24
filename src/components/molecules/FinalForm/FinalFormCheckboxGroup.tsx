import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldCheckboxGroup, FieldCheckboxGroupProps } from '../Form/FieldCheckboxGroup';
import { FinalFormError } from './FinalFormError';

type FinalFormCheckboxGroupProps = Omit<FieldCheckboxGroupProps, 'onChange' | 'value'> & {
  optimized?: boolean;
};

export const FinalFormCheckboxGroup: React.FC<FinalFormCheckboxGroupProps> = ({
  name,
  ...props
}) => {
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

      <FinalFormError name={name} />
    </>
  );
};
