import { FormikHelpers } from 'formik';

export type FormikSubmitHandler<FormValues> = (
  values: FormValues,
  actions: FormikHelpers<FormValues>,
) => void;
