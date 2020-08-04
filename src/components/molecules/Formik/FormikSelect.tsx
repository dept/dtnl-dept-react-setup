import { useField } from 'formik'
import React from 'react'

import { useFastField } from '@/utils/hooks'

import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect'
import { FormikError } from './FormikError'

type FormikSelectProps = FieldSelectProps & {
  name: string
  optimized?: boolean
}

export const FormikSelect: React.FC<FormikSelectProps> = ({ name, optimized, ...props }) => {
  const [field, meta, helpers] = (optimized ? useFastField : useField)(name)

  return (
    <>
      <FieldSelect
        {...props}
        {...field}
        onBlur={() => helpers.setTouched(true)}
        onChange={item => {
          helpers.setValue(item)
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FormikError name={name} />
    </>
  )
}
