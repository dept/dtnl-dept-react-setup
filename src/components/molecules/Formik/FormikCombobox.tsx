import { FastField, Field, FieldProps } from 'formik';
import { FC } from 'react';

import { FieldCombobox, FieldComboboxProps } from '../Form/FieldCombobox';
import { FormikError } from './FormikError';

type FormikComboboxProps = FieldComboboxProps & {
  name: string;
  optimized?: boolean;
};

export const FormikCombobox: FC<FormikComboboxProps> = ({ name, optimized = true, ...props }) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldCombobox
            {...props}
            {...field}
            onBlur={() => form.setFieldTouched(name, true)}
            onChange={item => {
              form.setFieldValue(name, item);
            }}
            hasError={Boolean(meta.touched && meta.error)}
          />
        )}
      </Component>
      <FormikError name={name} />
    </>
  );
};
