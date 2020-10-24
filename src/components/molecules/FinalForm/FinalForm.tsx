import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form, FormProps, FormRenderProps } from 'react-final-form';

type FinalFormProps<FormValues> = FormProps<FormValues> & {
  children: (props: FormRenderProps<FormValues>) => React.ReactElement;
};

export function FinalForm<FormValues extends Record<string, unknown>>({
  onSubmit,
  initialValues,
  children,
  mutators,
  validate,
  ...props
}: FinalFormProps<FormValues>) {
  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      mutators={{
        ...arrayMutators,
        ...mutators,
      }}>
      {formProps => {
        const { handleSubmit } = formProps;
        return (
          <form onSubmit={handleSubmit} {...props}>
            {children(formProps)}
          </form>
        );
      }}
    </Form>
  );
}
