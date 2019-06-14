import React, { FC } from 'react'

import { Box } from './Box'
import { Flex } from './Flex'
import { Icon } from './Icon'

interface Props {
  score: number
  stars?: number
}

const SPACING = 8

export const Rating: FC<Props> = ({ score, stars = 3 }) => (
  <Box maxWidth={(18 + SPACING) * stars}>
    <Flex>
      {Array.from(Array(stars)).map((_item, index) => (
        <Box key={index} width={1 / stars} mr={SPACING}>
          <Icon icon={index < score ? 'starFull' : 'star'} size={18} />
        </Box>
      ))}
    </Flex>
  </Box>
)
