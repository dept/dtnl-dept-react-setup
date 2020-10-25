import { ValidationErrors, setIn } from 'final-form';
import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form, FormProps, FormRenderProps } from 'react-final-form';
import * as Yup from 'yup';

type FinalFormProps<FormValues> = FormProps<FormValues> & {
  children: (props: FormRenderProps<FormValues>) => React.ReactElement;
  validationSchema?: Yup.ObjectSchema<any, any>;
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

export function FinalForm<FormValues extends Record<string, unknown>>({
  onSubmit,
  initialValues,
  children,
  mutators,
  validate,
  validationSchema,
  ...props
}: FinalFormProps<FormValues>) {
  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
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
