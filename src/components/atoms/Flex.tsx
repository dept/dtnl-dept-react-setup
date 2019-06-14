import styled from 'styled-components'
import {
  AlignItemsProps,
  FlexDirectionProps,
  FlexWrapProps,
  JustifyContentProps,
  alignItems,
  flexDirection,
  flexWrap,
  justifyContent,
} from 'styled-system'

import { Box, BoxProps } from './Box'

type FlexDoczProps = AlignItemsProps & FlexDirectionProps & FlexWrapProps & JustifyContentProps
export type FlexProps = BoxProps & FlexDoczProps

export const FlexDocz: React.FC<FlexDoczProps> = () => <div />

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${alignItems}
  ${flexDirection}
  ${flexWrap}
  ${justifyContent}
`
