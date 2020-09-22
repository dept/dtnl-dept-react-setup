import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { colors } from '@/theme/colors';

import { Box, BoxProps } from '../Grid';

type ButtonElements = 'button' | 'a' | 'span';

interface IconButtonProps {
  as?: ButtonElements;
  'aria-label': string;
  size?: number;
  icon: any;
  height?: any;
  padding?: number;
  color?: string;
  radii?: number;
  rotate?: number;
  selected?: boolean;
  disabled?: boolean;
  border?: boolean;
  type?: string;
}

interface ConditionalProps {
  as: ButtonElements;
  type?: 'submit' | 'button' | 'reset';
}

interface IconButtonStyledProps {
  height?: number;
  padding: number;
  radii?: number;
  border?: boolean;
}

const StyledIconButton = styled(Box)<IconButtonStyledProps>`
  border-radius: ${({ radii }) => radii}px;
  border: ${({ border }) => (border ? `1px solid ${colors.black};` : 'none')};
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadows.outline || 'inherit'};
  }
`;

export const IconButton: FC<IconButtonProps & HTMLAttributes<any> & BoxProps> = ({
  as = 'button',
  size = 40,
  height,
  border,
  radii = 0,
  padding = 0,
  bg,
  icon: Icon,
  rotate,
  ...rest
}) => {
  const conditionalProps: ConditionalProps = { as };
  if (as === 'button') {
    conditionalProps.type = 'button';
  }

  return (
    <StyledIconButton
      {...conditionalProps}
      radii={padding > 5 ? radii : 0}
      height={height}
      padding={padding}
      border={border}
      bg={bg || 'transparent'}
      {...rest}>
      <Icon size={size} rotate={rotate} />
    </StyledIconButton>
  );
};
