import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import {
  LetterSpacingProps,
  LineHeightProps,
  TextAlignProps,
  fontFamily,
  letterSpacing,
  lineHeight,
} from 'styled-system'

import { Box, BoxProps } from './Box'

type TextDoczProps = LetterSpacingProps &
  LineHeightProps &
  TextAlignProps & {
    as?:
      | 'p'
      | 'small'
      | 'strong'
      | 'em'
      | 'span'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'label'
    target?: string
    singleLine?: boolean
  }

export type TextProps = BoxProps &
  TextDoczProps &
  HTMLAttributes<HTMLParagraphElement> &
  HTMLAttributes<HTMLLabelElement>

export const TextDocz: React.FC<TextDoczProps> = () => <div />

const StyledText = styled(Box)<TextProps>`
  max-width: 100%;
  ${props =>
    props.singleLine ? 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' : ''}

  ${fontFamily}
  ${letterSpacing}
  ${lineHeight}

`

export const Text: React.FC<TextProps> = ({ as = 'span', children, ...props }) => (
  <StyledText as={as} {...props}>
    {children}
  </StyledText>
)
