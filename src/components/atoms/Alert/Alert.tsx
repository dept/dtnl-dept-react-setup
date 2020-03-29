import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { Box, BoxProps, Column, Grid, Row } from '../Grid'
import { Text } from '../Text'

type AlertProps = BoxProps & {
  type?: 'succes' | 'warning' | 'neutral'
}

const StyledAlertBox = styled(Box)<AlertProps>`
  ${({ type }) =>
    type &&
    css`
      background-color: ${props => props.theme.colors[type]};
    `};
`

export const Alert: FC<AlertProps> = props => (
  <StyledAlertBox py="xxs" {...props}>
    <Grid>
      <Row>
        <Column>
          <Text>{props.children}</Text>
        </Column>
      </Row>
    </Grid>
  </StyledAlertBox>
)
