import { FastField, FastFieldProps } from 'formik'
import React from 'react'

import { FieldCheckbox, FieldCheckboxProps } from '../Form/FieldCheckbox'
import { FormikError } from './FormikError'

type FormikCheckboxProps = FieldCheckboxProps & {
  name: string
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ name, children, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form, meta }: FastFieldProps) => {
          return (
            <FieldCheckbox
              {...props}
              {...field}
              hasError={meta.touched && meta.error}
              value={'true'}
              checked={meta.value}
              onChange={e => form.setFieldValue(name, e.currentTarget.checked)}>
              {children}
            </FieldCheckbox>
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
