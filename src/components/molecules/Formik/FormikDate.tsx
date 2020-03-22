import { FastField, FastFieldProps } from 'formik'
import React from 'react'

import { Omit } from '@/utils/types'

import { FieldDate, FieldDateProps } from '../Form/FieldDate'
import { FormikError } from './FormikError'

type FormikDate = Omit<FieldDateProps, 'onChange' | 'value'> & {
  name: string
}

export const FormikDate: React.FC<FormikDate> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form, meta }: FastFieldProps) => {
          return (
            <FieldDate
              {...props}
              {...field}
              onBlur={undefined}
              onClose={() => form.setFieldTouched(name, true)}
              onChange={(date) => form.setFieldValue(name, date)}
              hasError={Boolean(meta.touched && meta.error)}
            />
          )
        }}
      </FastField>
      <FormikError name={name} />
    </>
  )
}
