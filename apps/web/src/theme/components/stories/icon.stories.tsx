import { Box, Heading, Text } from '@chakra-ui/react';

import { MotionBox } from '@/components/shared/MotionBox';
import { ArrowIcon } from '@/icons/components';

export default { title: 'Chakra Components/Icon', component: null };

export const icon = () => (
  <>
    <Box mb="24">
      <Heading size="icons">Icons</Heading>
      <Text mb="8">Responsive icon sizing (based on boxSize prop)</Text>
      <ArrowIcon boxSize={{ base: 20, md: 40, lg: 60 }} color="primary" />

      <Text mb="8">Framer motion solution for icon</Text>
      <MotionBox
        as={ArrowIcon}
        boxSize={{ base: 20, md: 40, lg: 60 }}
        /**
         * Setting the initial keyframe to "null" will use
         * the current value to allow for interruptable keyframes.
         */
        whileHover={{ scale: [null, 1.5, 1.4], cursor: 'pointer' }}
        transition={{ duration: 0.3 }}
      />
    </Box>{' '}
  </>
);
