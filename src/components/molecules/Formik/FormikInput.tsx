import { FastField } from 'formik'
import React from 'react'

import { FieldInput, FieldInputProps } from '../Form/FieldInput'
import { FormikError } from './FormikError'

type FormikInput = FieldInputProps & {
  name: string
}

export const FormikInput: React.FC<FormikInput> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form: { touched, errors, setFieldValue } }) => {
          return (
            <FieldInput
              {...props}
              {...field}
              hasError={Boolean(touched[name] && errors[name])}
              onClear={() => {
                setFieldValue(name, '')
                field.onBlur(undefined)
              }}
            />
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
