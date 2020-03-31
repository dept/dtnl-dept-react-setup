import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { Box, Input, InputProps, Label } from '@/components/atoms'
import { colors } from '@/theme/colors'

export type FieldInputProps = InputProps & {
  label?: string
  name: string
}

const floatingLabelStyles = css`
  & ${String(Label)} {
  }
`

const FieldInputWrapper = styled(Box)<{ isFloating: boolean }>`
  position: relative;
  ${props => props.isFloating && floatingLabelStyles}
`

export const FieldInput: React.FC<FieldInputProps> = ({ label, ...props }) => {
  const initFloat = Boolean(props.value || props.defaultValue || props.start || props.end)

  const [shouldFloat, setShouldFloat] = useState(initFloat)

  useEffect(() => {
    setShouldFloat(initFloat)
  }, [initFloat])

  console.log(shouldFloat)

  return (
    <FieldInputWrapper isFloating={shouldFloat}>
      {label && (
        <Label htmlFor={props.name} color={props.color || colors.grey.medium}>
          {label}
        </Label>
      )}
      <Input {...props} id={props.name} floatCallback={setShouldFloat} />
    </FieldInputWrapper>
  )
}
