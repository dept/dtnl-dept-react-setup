import React from 'react';
import { useField, useForm } from 'react-final-form';

import { FieldSelectAdvanced, FieldSelectAdvancedProps } from '../Form/FieldSelectAdvanced';
import { FinalFormError } from './FinalFormError';

type FinalFormSelectAdvancedProps = FieldSelectAdvancedProps & {
  name: string;
};

export const FinalFormSelectAdvanced: React.FC<FinalFormSelectAdvancedProps> = ({
  name,

  ...props
}) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldSelectAdvanced
        {...(props as any)}
        {...input}
        onChange={option => {
          // @ts-ignore
          form.change(name, option && !Array.isArray(option) && option?.value);
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FinalFormError name={name} />
    </>
  );
};
