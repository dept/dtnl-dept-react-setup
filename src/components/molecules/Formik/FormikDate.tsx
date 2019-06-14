import { FastField } from 'formik'
import { Omit } from 'next/router'

import { FieldDate, FieldDateProps } from '../Form/FieldDate'
import { FormikError } from './FormikError'

type FormikDate = Omit<FieldDateProps, 'onChange' | 'value'> & {
  name: string
}

export const FormikDate: React.FC<FormikDate> = ({ name, ...props }) => {
  return (
    <>
      <FastField
        name={name}
        render={({ field, form: { touched, errors, setFieldValue, setFieldTouched } }: any) => (
          <FieldDate
            {...props}
            {...field}
            onBlur={undefined}
            onClose={() => setFieldTouched(name, true)}
            onChange={date => setFieldValue(name, date)}
            hasError={touched[name] && errors[name]}
          />
        )}
      />
      <FormikError name={name} />
    </>
  )
}
