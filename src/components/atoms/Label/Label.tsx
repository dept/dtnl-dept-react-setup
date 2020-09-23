import React, { HTMLAttributes } from 'react';

import { PseudoBox, PseudoBoxProps } from '../Grid';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps & PseudoBoxProps> = ({ children, color, ...props }) => {
  return (
    <PseudoBox
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
    </PseudoBox>
  );
};
