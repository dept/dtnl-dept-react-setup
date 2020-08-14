import css from '@styled-system/css';
import { hideVisually } from 'polished';
import React, { InputHTMLAttributes } from 'react';
import styled, { useTheme } from 'styled-components';

import { Box, Flex, Icon, Label, Text } from '@/components/atoms';

export interface FieldCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  hasError?: any;
  value?: string;
  name: string;
  disabled?: boolean;
}

const HiddenInput = styled.input`
  ${hideVisually()};
`;

export const FieldCheckbox: React.FC<FieldCheckboxProps> = ({
  children,
  onFocus,
  onChange,
  onBlur,
  hasError,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Label>
      <Flex opacity={props.disabled ? 0.2 : 1} alignItems="center">
        <HiddenInput
          type="checkbox"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          {...props}
        />
        <Box
          mr={3}
          css={css({
            height: 25,
            width: 25,
            bg: 'white',
            border: '2px solid',
            borderRadius: 4,
            borderColor: hasError ? 'error' : 'primary',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box',
            'input:checked + &': {
              bg: 'primary',
            },
            'input:focus + &': {
              outline: 'none',
              boxShadow: theme.shadows.outline,
            },
          })}>
          <Icon icon="CloseNormal" size={13} color="white" />
        </Box>
        <Box>
          <Text color="gray.800" fontSize={14}>
            {children}
          </Text>
        </Box>
      </Flex>
    </Label>
  );
};
