import React from 'react';

import { Box, Flex } from '../Grid';
import { Skeleton } from './Skeleton';

export default { title: 'Atoms/Skeleton', component: Skeleton };

export const example = () => (
  <Box borderRadius={10} border="1px solid #ddd" p={4}>
    <Flex width="100%" alignItems="center">
      <Skeleton width="60px" height="60px" circle></Skeleton>
      <Box flex={1} ml={2}>
        <Skeleton width="70%"></Skeleton>
      </Box>
    </Flex>

    <Skeleton width="100%" count={2}></Skeleton>

    <Box>
      <Skeleton width="60%" count={1}></Skeleton>
    </Box>
  </Box>
);

example.story = {
  parameters: {
    info: 'Perfect for loading placeholders',
  },
};
