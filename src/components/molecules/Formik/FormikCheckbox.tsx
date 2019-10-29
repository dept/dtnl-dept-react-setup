import { FastField } from 'formik'
import React from 'react'

import { Checkbox, CheckBoxProps } from '@/components/atoms'

import { FormikError } from './FormikError'

type FormikCheckboxProps = CheckBoxProps & {
  name: string
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ name, children, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form: { touched, errors, values, setFieldValue } }) => {
          return (
            <Checkbox
              {...props}
              {...field}
              hasError={touched[name] && errors[name]}
              value={'true'}
              checked={values[name]}
              onChange={e => setFieldValue(name, e.currentTarget.checked)}>
              {children}
            </Checkbox>
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
