import React, { FC } from 'react'

import { Box, BoxProps } from '../Grid'
import { Text } from '../Text'

type AlertProps = BoxProps & {
  type: 'succes' | 'warning' | 'neutral'
}

export const Alert: FC<AlertProps> = ({ type, ...props }) => (
  <Box py="2" px="4" bg={type} {...props}>
    <Text color="rgba(0,0,0,0.7)">{props.children}</Text>
  </Box>
)
