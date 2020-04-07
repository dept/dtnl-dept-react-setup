import { FastField, FastFieldProps } from 'formik'
import React, { FC } from 'react'

import { Omit } from '@/utils/types'

import { FieldCheckboxGroup, FieldCheckboxGroupProps } from '../Form/FieldCheckboxGroup'
import { FormikError } from './FormikError'

type FormikCheckboxGroupProps = Omit<FieldCheckboxGroupProps, 'onChange' | 'value'>

export const FormikCheckboxGroup: FC<FormikCheckboxGroupProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form, meta }: FastFieldProps) => {
          return (
            <FieldCheckboxGroup
              {...props}
              {...field}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const target = e.currentTarget
                const newValue = [...field.value] || []
                if (target.checked) {
                  newValue.push(target.value)
                } else {
                  newValue.splice(
                    newValue.findIndex(item => item === target.value),
                    1,
                  )
                }
                form.setFieldValue(name, newValue)
              }}
              hasError={meta.touched && meta.error}
            />
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
