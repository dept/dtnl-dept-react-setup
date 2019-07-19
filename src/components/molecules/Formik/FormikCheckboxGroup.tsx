import { FastField } from 'formik'
import { Omit } from '@/utils/types'

import { FieldCheckBoxGroup, FieldCheckBoxGroupProps } from '../Form/FieldCheckboxGroup'
import { FormikError } from './FormikError'

type FormikCheckBoxGroupProps = Omit<FieldCheckBoxGroupProps, 'onChange' | 'value'>

export const FormikCheckBoxGroup: React.FC<FormikCheckBoxGroupProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField
        name={name}
        render={({ field, form: { touched, errors, setFieldValue } }: any) => (
          <FieldCheckBoxGroup
            {...props}
            {...field}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.currentTarget
              const newValue = [...field.values[name]] || []

              if (target.checked) {
                newValue.push(target.value)
              } else {
                newValue.splice(newValue.findIndex(item => item === target.value), 1)
              }
              setFieldValue(name, newValue)
            }}
            hasError={touched[name] && errors[name]}
          />
        )}
      />
      <FormikError name={name} />
    </>
  )
}
