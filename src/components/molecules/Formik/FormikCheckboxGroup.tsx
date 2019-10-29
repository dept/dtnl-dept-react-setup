import { FastField } from 'formik'
import React, { FC } from 'react'

import { Omit } from '@/utils/types'

import { FieldCheckBoxGroup, FieldCheckBoxGroupProps } from '../Form/FieldCheckboxGroup'
import { FormikError } from './FormikError'

type FormikCheckBoxGroupProps = Omit<FieldCheckBoxGroupProps, 'onChange' | 'value'>

export const FormikCheckBoxGroup: FC<FormikCheckBoxGroupProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form: { touched, errors, setFieldValue } }) => {
          return (
            <FieldCheckBoxGroup
              {...props}
              {...field}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const target = e.currentTarget
                const newValue = [...field.value] || []
                if (target.checked) {
                  newValue.push(target.value)
                } else {
                  newValue.splice(newValue.findIndex(item => item === target.value), 1)
                }
                setFieldValue(name, newValue)
              }}
              hasError={touched[name] && errors[name]}
            />
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
