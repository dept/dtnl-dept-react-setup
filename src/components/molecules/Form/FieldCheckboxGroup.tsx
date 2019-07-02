import { Column,Row } from '@tpdewolf/styled-system'

import { Checkbox, CheckBoxProps } from '@/components/atoms'

interface Option {
  value: string
  label: string
}

export type FieldCheckBoxGroupProps = CheckBoxProps & {
  options: Option[]
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  name: string
  direction?: 'horizontal' | 'vertical'
  value: string | undefined
}

export const FieldCheckBoxGroup: React.FC<FieldCheckBoxGroupProps> = ({
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
            <Checkbox
              name={`${name}[]`}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              {...props}>
              {option.label}
            </Checkbox>
          </Column>
        )
      })}
    </Row>
  )
}
