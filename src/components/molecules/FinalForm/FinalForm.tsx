import { ValidationErrors, setIn } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { useMemo } from 'react';
import { Form, FormProps } from 'react-final-form';
import * as Yup from 'yup';

import { createScrollToErrorDecorator } from './utils/scrollToError';

export type FinalFormProps<FormValues> = FormProps<FormValues> & {
  validationSchema?: Yup.ObjectSchema<any>;
};

type RenderProps<FormValues> = {
  children: React.ReactNode | FinalFormProps<FormValues>['render'];
  render?: FinalFormProps<FormValues>['render'];
};

async function validateYup(
  schema: Yup.ObjectSchema<any>,
  values: any,
  errors: ValidationErrors | undefined = {},
) {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    errors = (e as Yup.ValidationError).inner.reduce((acc, error) => {
      return setIn(acc, error.path!, error.message);
    }, errors);
  }

  return errors;
}

interface BaseValues {
  [field: string]: any;
}

export function FinalForm<FormValues extends BaseValues = BaseValues>({
  onSubmit,
  initialValues,
  children,
  decorators,
  mutators,
  validate,
  validationSchema,
  render,
  ...props
}: FinalFormProps<FormValues> & RenderProps<FormValues>) {
  const formDecorators = useMemo(() => {
    return [createScrollToErrorDecorator(), ...(decorators || [])];
  }, [decorators]);

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      decorators={formDecorators}
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
            {render && render(formProps)}
            {!render && typeof children === 'function' ? (children as any)(formProps) : children}
          </form>
        );
      }}
    </Form>
  );
}
