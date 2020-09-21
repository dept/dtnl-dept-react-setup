import React from 'react';

import { Column, Row } from '@/components/atoms/Grid';

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

export const FieldRadioGroup: React.FC<FieldRadioGroupProps> = ({
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
          <Column key={index} my={5}>
            <FieldRadio
              name={`${name}[]`}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              {...props}>
              {option.label}
            </FieldRadio>
          </Column>
        );
      })}
    </Row>
  );
};
