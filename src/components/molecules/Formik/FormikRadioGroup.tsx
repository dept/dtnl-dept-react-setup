import { useField } from 'formik'
import React from 'react'

import { useFastField } from '@/utils/hooks'
import { Omit } from '@/utils/types'

import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup'
import { FormikError } from './FormikError'

type FormikRadioGroupProps = Omit<FieldRadioGroupProps, 'onChange' | 'value'> & {
  optimized?: boolean
}

export const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({
  name,
  optimized,
  ...props
}) => {
  const [field, meta, helpers] = (optimized ? useFastField : useField)(name)

  return (
    <>
      <FieldRadioGroup
        {...props}
        {...field}
        onChange={(e: React.FormEvent<HTMLInputElement>) => helpers.setValue(e.currentTarget.value)}
      />

      <FormikError name={name} />
    </>
  )
}
