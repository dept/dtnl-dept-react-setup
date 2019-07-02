import { Box,BoxProps } from '@tpdewolf/styled-system'
import { Omit } from 'next/router'
import React, { FC } from 'react'
import styled from 'styled-components'

import arrow from './svgs/arrow.svg'
import badge from './svgs/badge.svg'
import calender from './svgs/calender.svg'
import check from './svgs/check.svg'
import chevron from './svgs/chevron.svg'
import clock from './svgs/clock.svg'
import closeLight from './svgs/close_light.svg'
import closeNormal from './svgs/close_normal.svg'
import dot from './svgs/dot.svg'
import errorIcon from './svgs/error.svg'
import euro from './svgs/euro.svg'
import formatBold from './svgs/format_bold.svg'
import formatItalic from './svgs/format_italic.svg'
import formatUnderline from './svgs/format_underline.svg'
import heartFull from './svgs/heart_full.svg'
import heart from './svgs/heart.svg'
import hint from './svgs/hint.svg'
import info from './svgs/info.svg'
import person from './svgs/person.svg'
import pin from './svgs/pin.svg'
import search from './svgs/search.svg'
import starFull from './svgs/star_full.svg'
import star from './svgs/star.svg'
import trash from './svgs/trash.svg'

export type IconOption = keyof typeof icons

const icons = {
  arrow,
  badge,
  calender,
  check,
  chevron,
  clock,
  closeLight,
  closeNormal,
  dot,
  error: errorIcon,
  euro,
  formatBold,
  formatItalic,
  formatUnderline,
  heart,
  heartFull,
  hint,
  info,
  person,
  pin,
  star,
  starFull,
  search,
  trash,
}

type IconProps = Omit<BoxProps, 'width' | 'height'> & {
  icon: IconOption
  rotate?: number
  color?: string
  size: number | any[]
}

const StyledIconWrapper = styled(Box)<BoxProps & { rotate?: number }>`
  transition: transform 0.2s ease-in-out;
  ${props => props.rotate && `transform: rotate(${props.rotate}deg);`};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`

export const Icon: FC<IconProps> = ({ size, icon, ...props }) => {
  const IconComponent = icons[icon]

  return (
    <StyledIconWrapper {...props} width={size} height={size}>
      <IconComponent
        role="presentation"
        aria-hidden="true"
        focusable="false"
        color={props.color}
        style={{
          fill: 'currentColor',
        }}
        width={'100%'}
      />
    </StyledIconWrapper>
  )
}
