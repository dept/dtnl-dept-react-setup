import React, { FC } from 'react'
import styled from 'styled-components'
import {
  AlignItemsProps,
  FlexDirectionProps,
  FlexProps,
  FlexWrapProps,
  JustifyContentProps,
  SpaceProps,
  WidthProps,
  flexWrap,
  style,
} from 'styled-system'

import { grid } from '@/theme/grid'

import { Flex } from '../Flex'
import { Space } from './Space'

interface GutterProps {
  gutter?: any[] | number
}

type RowProps = AlignItemsProps &
  FlexDirectionProps &
  FlexProps &
  FlexWrapProps &
  GutterProps &
  JustifyContentProps &
  SpaceProps &
  WidthProps

const gutterLeft = style({
  prop: 'gutter',
  cssProperty: 'marginLeft',
  transformValue: n => {
    return (Number(n) / 2) * -1
  },
})

const gutterRight = style({
  prop: 'gutter',
  cssProperty: 'marginRight',
  transformValue: n => {
    return (Number(n) / 2) * -1
  },
})

const StyledRow = styled(Flex)<RowProps>`
  flex-wrap: wrap;
  ${flexWrap}
  ${gutterLeft}
  ${gutterRight}
`

export const Row: FC<RowProps> = ({
  gutter = [grid.gutterSmall, null, grid.gutter],
  children,
  ...props
}) => {
  const spacing =
    gutter && Array.isArray(gutter) ? gutter.map(space => space && space / 2) : gutter / 2

  return (
    <StyledRow gutter={gutter} {...props}>
      <Space px={spacing}>{children}</Space>
    </StyledRow>
  )
}
