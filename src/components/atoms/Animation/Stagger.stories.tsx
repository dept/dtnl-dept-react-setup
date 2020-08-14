import { number } from '@storybook/addon-knobs';
import React from 'react';

import { Box } from '../Grid';
import { Stagger } from './Stagger';

export default { title: 'Atoms/Animation', component: Stagger };

export const stagger = () => {
  const props = {
    duration: number('Duration', 2),
    staggerDelay: number('Stagger delay', 0.2),
  };

  return (
    <Stagger key={Object.values(props).join('-')} {...props}>
      <Box bg="red.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="orange.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="yellow.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="green.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="blue.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="purple.300" mb={1} p={2}>
        Child
      </Box>
    </Stagger>
  );
};
