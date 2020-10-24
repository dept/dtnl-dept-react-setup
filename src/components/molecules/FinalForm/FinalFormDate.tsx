import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldDate, FieldDateProps } from '../Form/FieldDate';
import { FinalFormError } from './FinalFormError';

type FinalFormDate = Omit<FieldDateProps, 'onChange' | 'value'> & {
  name: string;
};

export const FinalFormDate: React.FC<FinalFormDate> = ({ name, ...props }) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldDate
        {...props}
        {...input}
        onBlur={undefined}
        onClose={() => form.change(name, true)}
        onChange={date => {
          form.change(name, date);
        }}
        onClear={() => {
          form.change(name, undefined);
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FinalFormError name={name} />
    </>
  );
};
