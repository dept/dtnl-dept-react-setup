import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import {
  BackgroundProps,
  BottomProps,
  ColorProps,
  DisplayProps,
  FlexProps,
  FontSizeProps,
  FontWeightProps,
  HeightProps,
  JustifyContentProps,
  LeftProps,
  MaxHeightProps,
  MaxWidthProps,
  MinHeightProps,
  MinWidthProps,
  OpacityProps,
  OrderProps,
  PositionProps,
  RightProps,
  SpaceProps,
  TextAlignProps,
  TopProps,
  WidthProps,
  ZIndexProps,
  background,
  bottom,
  color,
  display,
  flex,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  left,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  order,
  position,
  right,
  space,
  textAlign,
  top,
  width,
  zIndex,
} from 'styled-system'

type BoxDoczProps = BackgroundProps &
  BottomProps &
  ColorProps &
  DisplayProps &
  FlexProps &
  FontSizeProps &
  FontWeightProps &
  HeightProps &
  JustifyContentProps &
  LeftProps &
  MaxHeightProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  OpacityProps &
  OrderProps &
  PositionProps &
  RightProps &
  SpaceProps &
  TextAlignProps &
  TopProps &
  WidthProps &
  ZIndexProps

export const BoxDocz: React.FC<BoxDoczProps> = () => <div />

export type BoxProps = BoxDoczProps & HTMLAttributes<any>

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${background}
  ${bottom}
  ${color}
  ${display}
  ${flex}
  ${fontSize}
  ${fontWeight}
  ${height}
  ${justifyContent}
  ${left}
  ${maxHeight}
  ${maxWidth}
  ${minHeight}
  ${minWidth}
  ${opacity}
  ${order}
  ${position}
  ${right}
  ${space}
  ${textAlign}
  ${top}
  ${width}
  ${zIndex}
`
