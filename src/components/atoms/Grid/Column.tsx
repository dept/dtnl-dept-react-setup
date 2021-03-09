import { FC } from 'react';

import { Box, BoxProps } from './Box';

type ColumnProps = Omit<BoxProps, 'inset'> & {
  col?: number | (number | null | string)[];
  inset?: number | (number | null | string)[];
};

function transformValue(n: string | number | null) {
  if (!n || isNaN(n as any)) {
    return n;
  }

  const cols = Number(n);
  return (cols / 12) * 100 + '%';
}

export const Column: FC<ColumnProps> = ({ col, inset, ...props }) => {
  const width =
    col && Array.isArray(col) ? col.map(transformValue) : transformValue(col!) || undefined;

  const ml =
    inset && Array.isArray(inset) ? inset.map(transformValue) : transformValue(inset!) || undefined;

  return <Box {...props} width={width} ml={ml} />;
};

Column.displayName = 'Column';
