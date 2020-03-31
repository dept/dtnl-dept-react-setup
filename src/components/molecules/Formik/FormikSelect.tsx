import { FastField, FastFieldProps } from 'formik'
import React from 'react'

import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect'
import { FormikError } from './FormikError'

type FormikSelectProps = FieldSelectProps & {
  name: string
}

export const FormikSelectAdvanced: React.FC<FormikSelectProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form, meta }: FastFieldProps) => {
          return (
            <FieldSelect
              {...props}
              {...field}
              onBlur={() => form.setFieldTouched(name, true)}
              onChange={item => {
                form.setFieldValue(name, item)
              }}
              hasError={Boolean(meta.touched && meta.error)}
            />
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
