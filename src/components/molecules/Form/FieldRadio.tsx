import { hideVisually } from 'polished'
import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

import { Flex, Label, Text } from '@/components/atoms'
import { colors } from '@/theme/colors'

export interface FieldRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  checked?: boolean
  value?: string
}

const HiddenInput = styled.input`
  ${hideVisually()};
`

const Circle = styled.div`
  height: 25px;
  width: 25px;
  display: inline-flex;
  background-color: ${colors.white};
  border: 1px solid ${colors.black};
  margin-right: 15px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
  input:checked + & {
    border-width: 6px;
  }
  input:focus + & {
    outline: none;
    box-shadow: ${props => props.theme.shadows.outline || 'inherit'};
  }
`

export const FieldRadio: React.FC<FieldRadioProps> = ({ children, ...rest }) => {
  return (
    <Label style={{ cursor: 'pointer' }}>
      <Flex>
        <HiddenInput type="radio" {...rest} />
        <Circle />
        <Text>{children}</Text>
      </Flex>
    </Label>
  )
}
