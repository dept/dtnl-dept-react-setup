import { Children, Fragment, ReactNode } from 'react';

import { Box, BoxProps } from './Box';
import { Flex, FlexProps } from './Flex';

type Align = 'left' | 'center' | 'right' | null;

interface StackProps {
  space: BoxProps['paddingTop'];
  divider?: JSX.Element;
  align?: Align | Align[];
  children?: ReactNode;
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

export const Stack = ({ children, divider, space, align }: StackProps) => {
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
      containerProps.alignItems = mapAlign(align) || undefined;
    }
  }

  const childComponents = Children.toArray(children).map((child, i, arr) => {
    const isLast = i === arr.length - 1;

    if (isLast) {
      return <Box key={i}>{child}</Box>;
    }

    return (
      <Fragment key={i}>
        <Box {...spaceProps}>{child}</Box>
        {divider && i > 0 && <Box {...spaceProps}>{divider}</Box>}
      </Fragment>
    );
  });

  return <Flex {...containerProps}>{childComponents}</Flex>;
};
