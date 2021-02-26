import { FC } from 'react';
import { useTheme } from 'styled-components';
import { FlexboxProps, SpaceProps, WidthProps } from 'styled-system';

import { Flex } from './Flex';
import { Space } from './Space';

interface GutterProps {
  gap?: any[] | number;
}

type RowProps = FlexboxProps & GutterProps & SpaceProps & WidthProps;

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
