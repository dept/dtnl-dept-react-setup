import { Box, Card, Flex } from '@tpdewolf/styled-primitives'
import React from 'react'

import { Skeleton } from './Skeleton'

export default { title: 'Atoms|Skeleton', component: Skeleton }

export const example = () => (
  <Card borderRadius={10} border="1px solid #ddd" p={20}>
    <Flex width="100%" alignItems="center">
      <Skeleton width="60px" height="60px" circle></Skeleton>
      <Box flex={1} ml={10}>
        <Skeleton width="70%"></Skeleton>
      </Box>
    </Flex>

    <Skeleton width="100%" count={2}></Skeleton>

    <Box>
      <Skeleton width="60%" count={1}></Skeleton>
    </Box>
  </Card>
)

example.story = {
  parameters: {
    info: 'Perfect for loading placeholders',
  },
}
