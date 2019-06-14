import { FastField } from 'formik'
import { Omit } from 'next/router'

import { FieldDob, FieldDobProps } from '../Form/FieldDob'
import { FormikError } from './FormikError'

type FormikDob = Omit<FieldDobProps, 'onChange' | 'value'> & {
  name: string
}

export const FormikDob: React.FC<FormikDob> = ({ name, ...props }) => {
  return (
    <>
      <FastField
        name={name}
        render={({ field, form: { touched, errors, setFieldValue, setFieldTouched } }: any) => (
          <FieldDob
            {...props}
            {...field}
            onChange={date => setFieldValue(name, date)}
            onBlur={() => setFieldTouched(name, true)}
            hasError={touched[name] && errors[name]}
          />
        )}
      />
      <FormikError name={name} />
    </>
  )
}
