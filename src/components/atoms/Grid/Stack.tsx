import React, { Children } from 'react';

import { Box, BoxProps } from './Box';
import { Flex, FlexProps } from './Flex';

interface StackProps {
  space: BoxProps['paddingTop'];
  divider?: JSX.Element;
  direction?: 'horizontal' | 'vertical';
}

export const Stack: React.FC<StackProps> = ({
  children,
  divider,
  space,
  direction = 'vertical',
}) => {
  const isVertical = direction === 'vertical';

  const containerProps: FlexProps = {
    flexDirection: direction === 'vertical' ? 'column' : 'row',
  };
  const spaceProps: BoxProps = { [isVertical ? 'pb' : 'pr']: space };

  const childComponents = Children.toArray(children).map((child, i, arr) => {
    const isLast = i === arr.length - 1;

    if (isLast) {
      return <Box>{child}</Box>;
    }

    return (
      <>
        <Box {...spaceProps}>{child}</Box>
        {divider && <Box {...spaceProps}>{divider}</Box>}
      </>
    );
  });

  return <Flex {...containerProps}>{childComponents}</Flex>;
};
