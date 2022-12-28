'use-client';

import { Stack } from '@chakra-ui/react';

import { FieldRadio, FieldRadioProps } from './FieldRadio';

interface Option {
  value: string;
  label: string;
}

export type FieldRadioGroupProps = FieldRadioProps & {
  options: Option[];
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  direction?: 'horizontal' | 'vertical';
  value: string | undefined;
};

export const FieldRadioGroup = ({
  name,
  options,
  value,
  direction = 'vertical',
  onChange,
  ...props
}: FieldRadioGroupProps) => (
  <Stack direction={direction === 'horizontal' ? 'row' : 'column'} spacing="md" flexWrap="wrap">
    {options.map((option, index) => (
      <FieldRadio
        key={index}
        name={name}
        value={option.value}
        onChange={onChange}
        {...props}
        checked={value === option.value}
      >
        {option.label}
      </FieldRadio>
    ))}
  </Stack>
);
