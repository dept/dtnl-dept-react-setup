import { FastField } from 'formik'

import { Omit } from '@/utils/types'

import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup'
import { FormikError } from './FormikError'

type FormikRadioGroupProps = Omit<FieldRadioGroupProps, 'onChange' | 'value'>

export const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField
        name={name}
        render={({ field, form: { touched, errors, setFieldValue } }: any) => (
          <FieldRadioGroup
            {...props}
            {...field}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFieldValue(name, e.currentTarget.value)
            }
            hasError={touched[name] && errors[name]}
          />
        )}
      />
      <FormikError name={name} />
    </>
  )
}
