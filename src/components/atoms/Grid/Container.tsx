import { useTheme } from '@chakra-ui/system';
import { FC } from 'react';

import { Box, BoxProps } from './Box';

type ContainerProps = BoxProps;

export const Container: FC<ContainerProps> = props => {
  const themeContext = useTheme();

  return (
    <Box
      mx="auto"
      px={themeContext?.grid?.container?.padding}
      maxWidth={themeContext?.grid?.container?.maxWidth}
      {...props}
    />
  );
};

Container.displayName = 'Container';
