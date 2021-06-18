import React, { FC, Children } from 'react';

import { FlexProps, BoxProps } from '.';

type Align = 'left' | 'center' | 'right' | null;

interface StackProps extends Omit<FlexProps, 'align'> {
  space: BoxProps['paddingTop'];
  divider?: JSX.Element;
  align?: Align | Align[];
  direction?: 'column' | 'row';
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

export const Stack: FC<StackProps> = ({
  children,
  divider,
  space,
  align,
  direction = 'column',
  ...props
}) => {
  const spaceProps: BoxProps = {
    [direction === 'column' ? 'pb' : 'pr']: space,
  };

  const containerProps: FlexProps = {
    flexDirection: direction,
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

  return (
    <Flex {...containerProps} {...props}>
      {childComponents}
    </Flex>
  );
};
