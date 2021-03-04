import { useTheme } from '@chakra-ui/system';
import styled from '@emotion/styled';
import { hideVisually } from 'polished';
import { InputHTMLAttributes, FC } from 'react';

import { Box, Flex } from '@/components/atoms/Grid';
import { Label } from '@/components/atoms/Label';
import { Text } from '@/components/atoms/Text';

export interface FieldRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hasError?: any;
  checked?: boolean;
  value?: string;
}

const HiddenInput = styled.input`
  ${hideVisually()};
`;

export const FieldRadio: FC<FieldRadioProps> = ({ children, hasError, ...props }) => {
  const theme = useTheme();
  return (
    <Label>
      <Flex opacity={props.disabled ? 0.2 : 1} alignItems="center">
        <HiddenInput type="radio" {...props} />
        <Box
          className="field-radio"
          mr={3}
          my={1}
          sx={{
            display: 'inline-flex',
            flexShrink: 0,
            height: 25,
            width: 25,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: hasError ? 'error' : 'primary',
            'input[type=radio]:checked + &': {
              borderWidth: '6px',
              bg: 'white',
            },
            'input[type=radio]:focus + &': {
              outline: 'none',
              boxShadow: theme.shadows.outline,
            },
          }}
        />
        <Text>{children}</Text>
      </Flex>
    </Label>
  );
};
