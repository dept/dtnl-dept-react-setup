import React, { FC } from 'react'
import styled from 'styled-components'

import { colors } from '@/theme/colors'

import { Box, BoxProps } from './Box'
import { Column } from './Grid/Column'
import { Contain } from './Grid/Contain'
import { Row } from './Grid/Row'
import { Text } from './Text'

type AlertProps = BoxProps & {
  type?: 'succes' | 'warning' | 'neutral'
}

const StyledAlertBox = styled(Box)<AlertProps>`
  ${({ type }) => (type ? `background-color: ${colors[type]}` : '')};
`

export const Alert: FC<AlertProps> = props => (
  <StyledAlertBox py="xxs" {...props}>
    <Contain>
      <Row>
        <Column>
          <Text>{props.children}</Text>
        </Column>
      </Row>
    </Contain>
  </StyledAlertBox>
)
