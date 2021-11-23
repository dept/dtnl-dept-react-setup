import { chakra } from '@chakra-ui/system';
import * as React from 'react';

import { BoxProps } from './Box';

const classnames = (...args: any[]) => args.join(' ');
const getClassName = (el: any) => (el.props && el.props.className) || '';

export function StyledChildren({ className, children }: { className?: string } & BoxProps) {
  const styledChildren = React.Children.toArray(children).map((child: any) =>
    React.cloneElement(child, {
      className: classnames(getClassName(child), className),
    }),
  );
  return <>{styledChildren}</>;
}

export const Space = chakra(StyledChildren);

Space.displayName = 'Space';
