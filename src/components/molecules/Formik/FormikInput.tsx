import { useField } from 'formik'
import React from 'react'

import { useFastField } from '@/utils/hooks'

import { FieldInput, FieldInputProps } from '../Form/FieldInput'
import { FormikError } from './FormikError'

type FormikInput = FieldInputProps & {
  name: string
  optimized?: boolean
}

export const FormikInput: React.FC<FormikInput> = ({ name, optimized, ...props }) => {
  const [field, meta, helpers] = (optimized ? useFastField : useField)(name)

  return (
    <>
      <FieldInput
        {...props}
        {...field}
        hasError={Boolean(meta.touched && meta.error)}
        onClear={() => {
          helpers.setValue('')
          field.onBlur(undefined)
        }}
      />
      <FormikError name={name} />
    </>
  )
}
