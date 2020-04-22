import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  ButtonStyleProps,
  color,
  ColorProps,
  colorStyle,
  ColorStyleProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  style,
  textStyle,
  TextStyleProps,
  typography,
  TypographyProps,
} from 'styled-system'

type TextDecorationOption = 'overline' | 'line-through' | 'underline'
type TextTransformOption = 'uppercase' | 'lowercase' | 'capitalize'

export type BoxProps = BackgroundProps &
  ButtonStyleProps &
  ColorProps &
  BorderProps &
  ColorStyleProps &
  FlexboxProps &
  LayoutProps &
  OpacityProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TextStyleProps &
  TypographyProps & {
    textDecoration?: TextDecorationOption | (TextDecorationOption | null | string)[]
    textTransform?: TextTransformOption | (TextTransformOption | null | string)[]
  } & HTMLAttributes<any>

const textDecoration = style({
  prop: 'textDecoration',
  cssProperty: 'textDecoration',
})

const textTransform = style({
  prop: 'textTransform',
  cssProperty: 'textTransform',
})

const boxStyles = compose(
  background,
  border,
  color,
  colorStyle,
  flexbox,
  layout,
  opacity,
  position,
  shadow,
  space,
  textDecoration,
  textStyle,
  textTransform,
  typography,
)

export const Box = styled.div<BoxProps>(
  {
    boxSizing: 'border-box',
  },
  boxStyles,
)
