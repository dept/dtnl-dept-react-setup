import { FastField, Field, FieldProps } from 'formik';
import { FC } from 'react';

import { FieldNumberFormat, FieldNumberFormatProps } from '../Form/FieldNumberFormat';
import { FormikError } from './FormikError';

type FormikNumberFormatProps = FieldNumberFormatProps & {
  name: string;
  optimized?: boolean;
};

export const FormikNumberFormat: FC<FormikNumberFormatProps> = ({
  name,
  type,
  optimized = true,
  ...props
}) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldNumberFormat
            {...props}
            {...field}
            onChange={() => {
              /** noop */
            }}
            type={type}
            hasError={Boolean(meta.touched && meta.error)}
            onValueChange={object => {
              form.setFieldValue(name, object.floatValue);
            }}
            onClear={() => {
              form.setFieldValue(name, '');
            }}
          />
        )}
      </Component>
      <FormikError name={name} />
    </>
  );
};
