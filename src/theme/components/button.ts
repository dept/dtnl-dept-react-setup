import { ComponentStyleConfig, theme } from '@chakra-ui/react';

import { link } from './link';

export const button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'none',
    fontWeight: 'regular',
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
  variants: {
    primary: {
      backgroundColor: 'primary',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'secondary',
      color: 'white',
    },
    link: {
      // Imports next base styles
      ...theme.components.Link.baseStyle,
      // Overries with our own changes
      ...link.baseStyle,
    },
    icon: {
      backgroundColor: 'black',
      width: '40px',
      height: '40px',
      minWidth: '0px',
      borderRadius: 'full',
      p: '0',
      _hover: {
        backgroundColor: 'secondary',
        transform: 'scale(1.2)',
      },
      _focus: {
        backgroundColor: 'secondary',
        transform: 'scale(1.2)',
      },
      svg: {
        width: '20px',
        height: '20px',
      },
      path: {
        fill: 'white',
      },
    },
  },
};
