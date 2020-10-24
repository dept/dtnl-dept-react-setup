import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldCheckbox, FieldCheckboxProps } from '../Form/FieldCheckbox';
import { FinalFormError } from './FinalFormError';

type FinalFormCheckboxProps = FieldCheckboxProps & {
  name: string;
};

export const FinalFormCheckbox: React.FC<FinalFormCheckboxProps> = ({
  name,
  children,
  ...props
}) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldCheckbox
        {...props}
        {...input}
        hasError={meta.touched && meta.error}
        value={'true'}
        checked={!!input.value}
        onChange={e => form.change(name, e.currentTarget.checked)}>
        {children}
      </FieldCheckbox>

      <FinalFormError name={name} />
    </>
  );
};
