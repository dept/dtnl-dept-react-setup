import React from 'react'
import styled from 'styled-components'

import { Box, Input, InputProps, Label } from '@/components/atoms'
import { colors } from '@/theme/colors'

export type FieldInputProps = InputProps & {
  label?: string
  name: string
}

const InputWrapper = styled(Box)`
  position: relative;
`

export const FieldInput: React.FC<FieldInputProps> = ({ label, ...props }) => {
  return (
    <InputWrapper>
      {label && (
        <Label htmlFor={props.name} color={props.color || colors.grey.medium}>
          {label}
        </Label>
      )}
      <Input {...props} id={props.name} />
    </InputWrapper>
  )
}
