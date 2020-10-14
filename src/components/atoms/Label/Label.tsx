import React, { HTMLAttributes } from 'react';

import { Box, BoxProps } from '../Grid';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps & BoxProps> = ({ children, color, ...props }) => {
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
    </Box>
  );
};
