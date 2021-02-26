import { FC } from 'react';
import { useTheme } from 'styled-components';
import { DisplayProps, HeightProps } from 'styled-system';

import { Box } from './Box';

type ContainerProps = DisplayProps & HeightProps;

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
