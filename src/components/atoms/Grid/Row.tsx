import { useTheme } from '@chakra-ui/system';
import { FC } from 'react';

import { BoxProps } from './Box';
import { Flex } from './Flex';
import { Space } from './Space';

interface GutterProps {
  gap?: any[] | number;
}

type RowProps = BoxProps & GutterProps;

export const Row: FC<RowProps> = ({ gap, children, ...props }) => {
  const themeContext = useTheme();

  if (!gap && themeContext && themeContext.grid) {
    gap = themeContext.grid.gap;
  }

  if (!gap) {
    gap = 15;
  }

  const spacing =
    gap && Array.isArray(gap) ? gap.map(space => space && space / 2) : (gap as number) / 2;

  const mx =
    gap && Array.isArray(gap)
      ? gap.map(space => space && (space / 2) * -1)
      : ((gap as number) / 2) * -1;

  return (
    <Flex mx={mx} flexWrap="wrap" {...props}>
      <Space px={spacing}>{children}</Space>
    </Flex>
  );
};

Row.displayName = 'Row';
