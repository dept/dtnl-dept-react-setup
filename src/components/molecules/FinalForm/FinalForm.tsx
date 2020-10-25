import { ValidationErrors, setIn } from 'final-form';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form, FormProps, FormRenderProps } from 'react-final-form';
import * as Yup from 'yup';

import { createScrollToErrorDecorator } from './utils/scrollToError';

export type FinalFormProps<FormValues> = FormProps<FormValues> & {
  validationSchema?: Yup.ObjectSchema<any, any>;
};

type RenderProps<FormValues> = {
  children: (props: FormRenderProps<FormValues>) => React.ReactElement;
};

async function validateYup(
  schema: Yup.ObjectSchema<any, any>,
  values: any,
  errors: ValidationErrors | undefined = {},
) {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    errors = (e as Yup.ValidationError).inner.reduce((acc, error) => {
      return setIn(acc, error.path, error.message);
    }, errors);
  }

  return errors;
}

export function FinalForm<FormValues = any>({
  onSubmit,
  initialValues,
  children,
  decorators,
  mutators,
  validate,
  validationSchema,
  ...props
}: FinalFormProps<FormValues> & RenderProps<FormValues>) {
  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      decorators={[createScrollToErrorDecorator(), ...(decorators || [])]}
      validate={async values => {
        if (!validationSchema && !validate) return;

        let errors: ValidationErrors | undefined;

        if (validate) {
          errors = await validate(values);
        }

        if (validationSchema) {
          errors = await validateYup(validationSchema, values, errors);
        }

        return errors;
      }}
      mutators={{
        ...arrayMutators,
        ...mutators,
      }}>
      {formProps => {
        const { handleSubmit } = formProps;
        return (
          <form onSubmit={handleSubmit} noValidate={true} {...props}>
            {children(formProps)}
          </form>
        );
      }}
    </Form>
  );
}
