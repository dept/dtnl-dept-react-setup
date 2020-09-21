import React, { FC } from 'react';
import styled from 'styled-components';

import { IconOption, icons } from '@/theme';
import { Omit } from '@/utils/types';

import { Box, BoxProps } from '../Grid';

type IconProps = Omit<BoxProps, 'width' | 'height'> & {
  icon: IconOption;
  rotate?: number;
  color?: string;
  size?: number | any[];
};

const StyledIconWrapper = styled(Box)<BoxProps & { rotate?: number }>`
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  ${props => props.rotate && `transform: rotate(${props.rotate}deg);`};
`;

export const Icon: FC<IconProps> = ({ size = 22, icon, ...props }) => {
  const IconComponent = icons[icon];

  return (
    <StyledIconWrapper {...props} width={size} height={size} color={props.color}>
      <IconComponent
        role="presentation"
        aria-hidden="true"
        focusable="false"
        width="100%"
        height="100%"
        size={size}
      />
    </StyledIconWrapper>
  );
};
