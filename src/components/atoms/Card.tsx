import styled from 'styled-components'
import {
  BackgroundImageProps,
  BackgroundPositionProps,
  BackgroundRepeatProps,
  BackgroundSizeProps,
  BorderBottomProps,
  BorderColorProps,
  BorderLeftProps,
  BorderProps,
  BorderRadiusProps,
  BorderRightProps,
  BorderTopProps,
  BoxShadowProps,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  border,
  borderBottom,
  borderColor,
  borderLeft,
  borderRadius,
  borderRight,
  borderTop,
  boxShadow,
} from 'styled-system'

import { Box } from './Box'

type CardProps = BackgroundImageProps &
  BackgroundPositionProps &
  BackgroundRepeatProps &
  BackgroundSizeProps &
  BorderBottomProps &
  BorderColorProps &
  BorderLeftProps &
  BorderProps &
  BorderRadiusProps &
  BorderRightProps &
  BorderTopProps &
  BoxShadowProps

export const Card = styled(Box)<CardProps>`
  ${backgroundImage}
  ${backgroundPosition}
  ${backgroundRepeat}
  ${backgroundSize}
  ${border}
  ${borderBottom}
  ${borderColor}
  ${borderLeft}
  ${borderRadius}
  ${borderRight}
  ${borderTop}
  ${boxShadow}
`
