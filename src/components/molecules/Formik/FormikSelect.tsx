import { FastField } from 'formik'
import React from 'react'

import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect'
import { FormikError } from './FormikError'

type FormikSelectProps = FieldSelectProps & {
  name: string
}

export const FormikSelect: React.FC<FormikSelectProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField name={name}>
        {({ field, form: { touched, errors, setFieldValue, setFieldTouched } }) => {
          return (
            <FieldSelect
              {...props}
              {...field}
              onBlur={() => setFieldTouched(name, true)}
              onChange={option => {
                // @ts-ignore
                setFieldValue(name, option && !Array.isArray(option) && option.value)
              }}
              hasError={Boolean(touched[name] && errors[name])}
            />
          )
        }}
      </FastField>

      <FormikError name={name} />
    </>
  )
}
