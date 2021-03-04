import { chakra } from '@chakra-ui/system';

import { BoxProps } from './Box';

export type FlexProps = BoxProps;

export const Flex = chakra('div', {
  baseStyle: {
    display: 'flex',
  },
});
