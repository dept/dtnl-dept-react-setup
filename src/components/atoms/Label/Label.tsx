import css from '@styled-system/css';
import React, { HTMLAttributes } from 'react';

import { PseudoBox, PseudoBoxProps } from '../Grid';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps & PseudoBoxProps> = ({ children, ...props }) => {
  return (
    <PseudoBox
      as="label"
      css={css({
        cursor: 'pointer',
        userSelect: 'none',
      })}
      {...props}>
      {children}
    </PseudoBox>
  );
};
