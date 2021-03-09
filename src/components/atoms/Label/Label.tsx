import { FC } from 'react';

import { Box, BoxProps } from '../Grid';

interface LabelProps extends BoxProps {
  htmlFor?: string;
  required?: boolean;
}

export const Label: FC<LabelProps> = ({ children, color, required, ...props }) => {
  return (
    <Box
      as="label"
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        fontWeight: 'medium',
        fontSize: 'sm',
        color: color || 'gray.700',
      }}
      {...props}>
      {children}
      {required ? ' *' : null}
    </Box>
  );
};
