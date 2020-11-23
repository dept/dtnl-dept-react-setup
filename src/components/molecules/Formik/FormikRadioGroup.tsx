import { FastField, Field, FieldProps } from 'formik';
import { FC } from 'react';

import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup';
import { FormikError } from './FormikError';

type FormikRadioGroupProps = Omit<FieldRadioGroupProps, 'onChange' | 'value'> & {
  optimized?: boolean;
};

export const FormikRadioGroup: FC<FormikRadioGroupProps> = ({
  name,
  optimized = true,
  ...props
}) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, form, meta }: FieldProps<any>) => (
          <FieldRadioGroup
            {...props}
            {...field}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              form.setFieldValue(name, e.currentTarget.value)
            }
            hasError={meta.touched && meta.error}
          />
        )}
      </Component>

      <FormikError name={name} />
    </>
  );
};
