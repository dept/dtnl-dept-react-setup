import React, { FC } from 'react';

import { Column, Row } from '@/components/atoms';

import { FieldCheckbox, FieldCheckboxProps } from './FieldCheckbox';

interface Option {
  value: string;
  label: string;
}

export type FieldCheckboxGroupProps = FieldCheckboxProps & {
  options: Option[];
  name: string;
  direction?: 'horizontal' | 'vertical';
  value: string[];
};

export const FieldCheckboxGroup: FC<FieldCheckboxGroupProps> = ({
  name,
  options,
  value,
  direction = 'vertical',
  onChange,
  ...props
}) => {
  return (
    <Row flexDirection={direction === 'horizontal' ? 'row' : 'column'} flexWrap="wrap">
      {options.map((option, index) => {
        return (
          <Column key={index}>
            <FieldCheckbox
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={onChange}
              {...props}>
              {option.label}
            </FieldCheckbox>
          </Column>
        );
      })}
    </Row>
  );
};
