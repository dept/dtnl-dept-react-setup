import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup';
import { FinalFormError } from './FinalFormError';

type FinalFormRadioGroupProps = Omit<FieldRadioGroupProps, 'onChange' | 'value'>;

export const FinalFormRadioGroup: React.FC<FinalFormRadioGroupProps> = ({ name, ...props }) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldRadioGroup
        {...props}
        {...input}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          form.change(name, e.currentTarget.value)
        }
        hasError={meta.touched && meta.error}
      />

      <FinalFormError name={name} />
    </>
  );
};
