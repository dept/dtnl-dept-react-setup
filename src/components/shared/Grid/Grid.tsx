import { ReactNode } from 'react';

import { Box, BoxProps } from './Box';

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;
type Int = BigInt | null;
interface GridProps {
  cols?: Column[] | Column;
  rows?: Int[] | Int;
  gap?: BoxProps['gridGap'];
  gapY?: BoxProps['gridRowGap'];
  gapX?: BoxProps['gridColumnGap'];
  children?: ReactNode;
}

export const Grid = ({ cols, rows, children, gap, gapY, gapX }: GridProps) => {
  const colArray: Column[] = !!cols && Array.isArray(cols) ? cols : [cols as Column];
  const rowArray: Int[] = !!rows && Array.isArray(rows) ? rows : [rows as Int];

  const columnsProp =
    colArray && colArray.map(col => (col ? `repeat(${col}, minmax(0, 1fr));` : null));
  const rowsProp =
    rowArray && rowArray.map(row => (row ? `repeat(${row}, minmax(0, 1fr));` : null));

  return (
    <Box
      display="grid"
      gridTemplateColumns={columnsProp}
      gridTemplateRows={rowsProp}
      gridGap={gap}
      gridRowGap={gapY}
      gridColumnGap={gapX}
    >
      {children}
    </Box>
  );
};
