import { Box, BoxProps, Column, Contain, Row, Text } from '@tpdewolf/styled-primitives'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'

type AlertProps = BoxProps & {
  type?: 'succes' | 'warning' | 'neutral'
}

const StyledAlertBox = styled(Box)<AlertProps>`
  ${({ type }) =>
    type &&
    css`
      background-color: ${(props) => props.theme.colors[type]};
    `};
`

export const Alert: FC<AlertProps> = (props) => (
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
