import { Stack } from '@chakra-ui/react';

import { FieldCheckbox, FieldCheckboxProps } from './FieldCheckbox';

export interface Option {
  value: string;
  label: string;
}

export type FieldCheckboxGroupProps = FieldCheckboxProps & {
  options: Option[];
  name: string;
  direction?: 'horizontal' | 'vertical';
  value: string[];
};

export const FieldCheckboxGroup = ({
  name,
  options,
  value,
  direction = 'vertical',
  onChange,
  ...props
}: FieldCheckboxGroupProps) => (
  <Stack direction={direction === 'horizontal' ? 'row' : 'column'} spacing="xs" flexWrap="wrap">
    {options.map((option, index) => (
      <FieldCheckbox
        key={index}
        name={name}
        value={option.value}
        onChange={onChange}
        {...props}
        // has to be after props
        checked={Boolean(value && value.includes(option.value))}
      >
        {option.label}
      </FieldCheckbox>
    ))}
  </Stack>
);
