import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { colors } from '@/theme/colors'

import { Flex } from '../Flex'
import { Text } from '../Text'
import { Label } from './Label'

export interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  checked?: boolean
  value?: string
}

const HiddenInput = styled.input``

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
    outline: ${props => props.theme.outline || 'inherit'};
  }
`

export const Radio: React.FC<RadioProps> = ({ children, ...rest }) => {
  return (
    <Label style={{ cursor: 'pointer' }}>
      <Flex>
        <HiddenInput className="sr-only" type="radio" {...rest} />
        <Circle />
        <Text>{children}</Text>
      </Flex>
    </Label>
  )
}
