import { Box } from '@tpdewolf/styled-primitives'
import React, { FC } from 'react'
import { InView } from 'react-intersection-observer'
import styled from 'styled-components'
import { BackgroundProps, SpaceProps } from 'styled-system'

import { colors } from '@/theme/colors'

interface Props {
  id?: string
  bg?: string
  inView?: boolean
  borderTop?: boolean
  borderBottom?: boolean
}

export type SectionProps = Props & SpaceProps & BackgroundProps

const StyledSection = styled(Box)<SectionProps>`

  display: block;
  opacity: 0;
  transition: opacity 0.15s ease-in 0.2s;

  ${({ borderTop }) => borderTop && `border-top: 1px solid ${colors.grey.light};`}
  ${({ borderBottom }) => borderBottom && `border-bottom: 1px solid ${colors.grey.light};`}

  ${({ inView }) =>
    inView &&
    `
    opacity: 1;`}
`

export const Section: FC<SectionProps> = props => {
  const { children } = props

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <StyledSection as="section" ref={ref} inView={inView} {...props}>
          {children}
        </StyledSection>
      )}
    </InView>
  )
}
