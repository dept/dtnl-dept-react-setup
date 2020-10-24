import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect';
import { FinalFormError } from './FinalFormError';

type FinalFormSelectProps = FieldSelectProps & {
  name: string;
};

export const FinalFormSelect: React.FC<FinalFormSelectProps> = ({ name, ...props }) => {
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

      <FinalFormError name={name} />
    </>
  );
};
