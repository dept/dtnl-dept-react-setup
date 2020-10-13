import React, { Children } from 'react';

import { Box, BoxProps } from './Box';
import { Flex, FlexProps } from './Flex';

type Align = 'left' | 'center' | 'right' | null;

interface StackProps {
  space: BoxProps['paddingTop'];
  divider?: JSX.Element;
  align?: Align | Align[];
}

function mapAlign(align: Align) {
  switch (align) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    default:
      return align;
  }
}

export const Stack: React.FC<StackProps> = ({ children, divider, space, align }) => {
  const spaceProps: BoxProps = {
    pb: space,
  };

  const containerProps: FlexProps = {
    flexDirection: 'column',
  };

  if (Array.isArray(align)) {
    containerProps.alignItems = align.map(mapAlign);
  } else {
    if (align) {
      containerProps.alignItems = mapAlign(align);
    }
  }

  const childComponents = Children.toArray(children).map((child, i, arr) => {
    const isLast = i === arr.length - 1;

    if (isLast) {
      return <Box key={i}>{child}</Box>;
    }

    return (
      <React.Fragment key={i}>
        <Box {...spaceProps}>{child}</Box>
        {divider && i > 0 && <Box {...spaceProps}>{divider}</Box>}
      </React.Fragment>
    );
  });

  return <Flex {...containerProps}>{childComponents}</Flex>;
};
