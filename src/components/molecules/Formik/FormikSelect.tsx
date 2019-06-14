import { FastField } from 'formik'

import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect'
import { FormikError } from './FormikError'

type FormikSelectProps = FieldSelectProps & {
  name: string
}

export const FormikSelect: React.FC<FormikSelectProps> = ({ name, ...props }) => {
  return (
    <>
      <FastField
        name={name}
        render={({ field, form: { touched, errors, setFieldValue, setFieldTouched } }: any) => (
          <FieldSelect
            {...props}
            {...field}
            onBlur={() => setFieldTouched(name, true)}
            onChange={option => {
              // @ts-ignore
              setFieldValue(name, option && !Array.isArray(option) && option.value)
            }}
            hasError={touched[name] && errors[name]}
          />
        )}
      />
      <FormikError name={name} />
    </>
  )
}
