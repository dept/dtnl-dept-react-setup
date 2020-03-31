import { FastField, FastFieldProps } from 'formik'
import React from 'react'

import { FieldSelectAdvanced, FieldSelectAdvancedProps } from '../Form/FieldSelectAdvanced'
import { FormikError } from './FormikError'

type FormikSelectAdvancedProps = FieldSelectAdvancedProps & {
  name: string
}

export const FormikSelectAdvanced: React.FC<FormikSelectAdvancedProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form, meta }: FastFieldProps) => {
          return (
            <FieldSelectAdvanced
              {...props}
              {...field}
              onBlur={() => form.setFieldTouched(name, true)}
              onChange={option => {
                // @ts-ignore
                form.setFieldValue(name, option && !Array.isArray(option) && option.value)
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
