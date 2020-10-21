import { hideVisually } from 'polished';
import React, { InputHTMLAttributes } from 'react';
import styled, { useTheme } from 'styled-components';

import { Box, Flex } from '@/components/atoms/Grid';
import { Label } from '@/components/atoms/Label';
import { Text } from '@/components/atoms/Text';
import CloseNormalIcon from '@/icons/components/CloseNormal';

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
          sx={{
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
            color: 'white',
            'input[type=checkbox]:checked + &': {
              bg: 'primary',
            },
            'input[type=checkbox]::focus + &': {
              outline: 'none',
              boxShadow: theme.shadows.outline,
            },
          }}>
          <CloseNormalIcon size={13} />
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
