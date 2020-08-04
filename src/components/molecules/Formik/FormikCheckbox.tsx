import { useField } from 'formik'
import React from 'react'

import { useFastField } from '@/utils/hooks'

import { FieldCheckbox, FieldCheckboxProps } from '../Form/FieldCheckbox'
import { FormikError } from './FormikError'

type FormikCheckboxProps = FieldCheckboxProps & {
  name: string
  optimized?: boolean
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({
  name,
  optimized,
  children,
  ...props
}) => {
  const [field, meta, helpers] = (optimized ? useFastField : useField)(name)

  return (
    <>
      <FieldCheckbox
        {...props}
        {...field}
        hasError={meta.touched && meta.error}
        value={'true'}
        checked={meta.value}
        onChange={e => helpers.setValue(e.currentTarget.checked)}>
        {children}
      </FieldCheckbox>

      <FormikError name={name} />
    </>
  )
}
