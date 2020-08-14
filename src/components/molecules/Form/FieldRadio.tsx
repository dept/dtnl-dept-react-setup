import css from '@styled-system/css';
import { hideVisually } from 'polished';
import React, { InputHTMLAttributes } from 'react';
import styled, { useTheme } from 'styled-components';

import { Box, Flex, Label, Text } from '@/components/atoms';

export interface FieldRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  checked?: boolean;
  value?: string;
}

const HiddenInput = styled.input`
  ${hideVisually()};
`;

export const FieldRadio: React.FC<FieldRadioProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Label style={{ cursor: 'pointer' }}>
      <Flex opacity={props.disabled ? 0.2 : 1} alignItems="center">
        <HiddenInput type="radio" {...props} />
        <Box
          mr={3}
          my={1}
          css={css({
            display: 'inline-flex',
            flexShrink: 0,
            height: 25,
            width: 25,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: 'primary',
            'input:checked + &': {
              borderWidth: '6px',
            },
            'input:focus + &': {
              outline: 'none',
              boxShadow: theme.shadows.outline,
            },
          })}
        />
        <Text>{children}</Text>
      </Flex>
    </Label>
  );
};
