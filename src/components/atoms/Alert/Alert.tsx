import React, { FC } from 'react'

import { Box, BoxProps, Column, Grid, Row } from '../Grid'
import { Text } from '../Text'

type AlertProps = BoxProps & {
  type: 'succes' | 'warning' | 'neutral'
}

export const Alert: FC<AlertProps> = ({ type, ...props }) => (
  <Box py="xxs" bg={type} {...props}>
    <Grid>
      <Row>
        <Column>
          <Text>{props.children}</Text>
        </Column>
      </Row>
    </Grid>
  </Box>
)
