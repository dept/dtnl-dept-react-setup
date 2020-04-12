import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Box } from '../Grid'

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  color?: string
  htmlFor?: string
}

const StyledLabel = styled(Box)<LabelProps>`
  cursor: pointer;
  user-select: none;
  display: block;
`

export const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return (
    <StyledLabel as="label" {...rest}>
      {children}
    </StyledLabel>
  )
}
