import styled from '@emotion/styled';
import React, { FC } from 'react';

import { IconOption, icons } from '@/theme';

import { Box, BoxProps } from '../Grid';

type IconProps = BoxProps & {
  icon: IconOption;
  rotate?: number;
  color?: string;
  size?: number | any[] | string;
  height?: number | any[] | string;
  width?: number | any[] | string;
  fill?: string;
};

const StyledIconWrapper = styled(Box)<BoxProps & { rotate?: number }>`
  transition: transform 150ms ease-in-out;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  ${props => props.rotate && `transform: rotate(${props.rotate}deg);`};
`;

export const Icon: FC<IconProps> = ({ size = 22, height, width, icon, fill, ...props }) => {
  const IconComponent = icons[icon];
  if (!IconComponent) return null;

  return (
    <StyledIconWrapper width={width || size} height={height || size} color={props.color} {...props}>
      <IconComponent
        role="presentation"
        focusable="false"
        style={{
          fill: fill || 'currentColor',
        }}
      />
    </StyledIconWrapper>
  );
};
