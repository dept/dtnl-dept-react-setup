import { FastField } from 'formik'
import React from 'react'

import { Omit } from '@/utils/types'

import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup'
import { FormikError } from './FormikError'

type FormikRadioGroupProps = Omit<FieldRadioGroupProps, 'onChange' | 'value'>

export const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form: { setFieldValue } }) => {
          return (
            <FieldRadioGroup
              {...props}
              {...field}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setFieldValue(name, e.currentTarget.value)
              }
            />
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
