import React, { FC } from 'react'

import { Column, Row } from '@/components/atoms'

import { FieldCheckbox, FieldCheckBoxProps } from './FieldCheckbox'

interface Option {
  value: string
  label: string
}

export type FieldCheckBoxGroupProps = FieldCheckBoxProps & {
  options: Option[]
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  name: string
  direction?: 'horizontal' | 'vertical'
  value: string[]
}

export const FieldCheckBoxGroup: FC<FieldCheckBoxGroupProps> = ({
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
        )
      })}
    </Row>
  )
}
