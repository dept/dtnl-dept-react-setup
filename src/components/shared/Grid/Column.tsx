import { Box, BoxProps } from './Box';

type ColumnProps = Omit<BoxProps, 'inset'> & {
  col?: number | (number | null | string)[] | Record<string, number | null | string>;
  inset?: number | (number | null | string)[] | Record<string, number | null | string>;
};

function transformValue(n: string | number | null) {
  if (!n || isNaN(n as any)) {
    return n;
  }

  const cols = Number(n);
  return (cols / 12) * 100 + '%';
}

export function Column({ col, inset, ...props }: ColumnProps) {
  const width =
    col && Array.isArray(col)
      ? col.map(transformValue)
      : typeof col === 'object'
      ? Object.values(col).map(transformValue)
      : transformValue(col!) || undefined;

  const ml =
    inset && Array.isArray(inset)
      ? inset.map(transformValue)
      : typeof inset === 'object'
      ? Object.values(inset).map(transformValue)
      : transformValue(inset!) || undefined;

  return <Box {...props} width={width} ml={ml} />;
}

Column.displayName = 'Column';
