import { Box, BoxProps, Column, Contain, Row, Text } from '@tpdewolf/styled-primitives'
import React, { FC } from 'react'
import styled from 'styled-components'

import { colors } from '@/theme/colors'

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
