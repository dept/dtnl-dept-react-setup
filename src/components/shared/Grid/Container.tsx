import { useTheme } from '@chakra-ui/system';

import { Box, BoxProps } from './Box';

type ContainerProps = BoxProps;

export function Container(props: ContainerProps) {
  const themeContext = useTheme();

  return (
    <Box
      mx="auto"
      px={themeContext?.grid?.container?.padding}
      maxWidth={themeContext?.grid?.container?.maxWidth}
      {...props}
    />
  );
}

Container.displayName = 'Container';
