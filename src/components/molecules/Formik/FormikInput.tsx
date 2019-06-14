import { FastField } from 'formik'

import { FieldInput, FieldInputProps } from '../Form/FieldInput'
import { FormikError } from './FormikError'

type FormikInput = FieldInputProps & {
  name: string
}

export const FormikInput: React.FC<FormikInput> = ({ name, ...props }) => {
  return (
    <>
      <FastField
        name={name}
        render={({ field, form: { touched, errors, setFieldValue } }: any) => {
          return (
            <FieldInput
              {...props}
              {...field}
              hasError={touched[name] && errors[name]}
              onClear={() => {
                setFieldValue(name, '')
                field.onBlur()
              }}
            />
          )
        }}
      />
      <FormikError name={name} />
    </>
  )
}
