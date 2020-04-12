import { useSelect } from 'downshift'
import { InputHTMLAttributes, useState } from 'react'
import styled, { css } from 'styled-components'

import { Box, Icon } from '@/components/atoms'
import { Label } from '@/components/atoms/Label/Label'

import { InputWrapper } from './FieldInput'

type Value = string | number

interface Option {
  value: Value
  label: Value
}

export interface FieldSelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  name: string
  items: Option[]
  color?: string
  label?: string
  placeholder?: string
  hasError?: boolean
  native?: boolean
  onChange?: (value: Value) => void
}

const activeListStyles = css`
  --list-scale: 1;
  opacity: 1;
  pointer-events: all;
`

const List = styled(Box)<{ isOpen: boolean }>`
  --list-scale: 0.8;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 15px;
  left: 50%;
  z-index: 100;
  pointer-events: none;
  transform-origin: left center;
  transition: transform 0.1s ease-out, opacity 0.1s ease;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  opacity: 0;
  outline: none;
  transform: scale(var(--list-scale)) translateX(-50%);
  ${props => props.isOpen && activeListStyles};
`

const ListItem = Box

const CustomSelect: React.FC<FieldSelectProps> = ({
  name,
  items,
  color,
  label,
  placeholder,
  hasError,
}) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items })

  return (
    <Box position="relative">
      {label && (
        <Label htmlFor={name} color={color} {...getLabelProps()}>
          {label}
        </Label>
      )}
      <InputWrapper color={color} hasError={hasError}>
        <Box
          height="100%"
          width="100%"
          display="block"
          p="11px 14px"
          as="label"
          {...getToggleButtonProps()}>
          {(selectedItem && selectedItem.label) || placeholder || '-'}
          <IconWrapper position="absolute" right={10} top="50%">
            <Icon icon="Chevron" size={15} rotate={isOpen ? -180 : 0} />
          </IconWrapper>
        </Box>
      </InputWrapper>
      <List
        isOpen={isOpen}
        as="ul"
        bg="white"
        color="black"
        minWidth={200}
        maxWidth="100%"
        {...getMenuProps()}>
        {items.map((item, index) => (
          <ListItem
            color="black"
            as="li"
            bg={highlightedIndex === index ? 'rgba(0, 0, 0, 0.04)' : null}
            p="12px 14px"
            key={`${item}${index}`}
            {...getItemProps({ item, index })}>
            {item.label}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const Select = styled.select`
  -webkit-appearance: none;
  background-color: transparent;
  width: 100%;
  display: block;
  border: none;
  padding: 12px 14px;
  height: 50px;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  &:invalid {
    opacity: 0.5;
  }
`

const IconWrapper = styled(Box)`
  transform: translateY(-50%);
  pointer-events: none;
`

const NativeSelect: React.FC<FieldSelectProps> = ({
  name,
  items,
  color,
  label,
  placeholder,
  hasError,
  defaultValue = '',
  onChange = () => {
    /** noop */
  },
  disabled,
  ...rest
}) => {
  const [hasFocus, setFocus] = useState(false)

  function onFocus(e: React.FocusEvent<HTMLSelectElement>) {
    if (rest.onFocus) rest.onFocus(e)
    setFocus(true)
  }

  function onBlur(e: React.FocusEvent<HTMLSelectElement>) {
    if (rest.onBlur) rest.onBlur(e)
    setFocus(false)
  }

  return (
    <>
      {label && (
        <Label htmlFor={name} color={color}>
          {label}
        </Label>
      )}
      <InputWrapper hasFocus={hasFocus} color={color} hasError={hasError}>
        <Select
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          defaultValue={defaultValue}>
          {placeholder && (
            <option disabled value="">
              {placeholder}
            </option>
          )}
          {items.map((item, index) => (
            <option key={`${item}${index}`} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <IconWrapper position="absolute" right={10} top="50%">
          <Icon icon="Chevron" size={15} />
        </IconWrapper>
      </InputWrapper>
    </>
  )
}

export const FieldSelect: React.FC<FieldSelectProps> = props => {
  if (props.native) {
    return <NativeSelect {...props}></NativeSelect>
  } else {
    return <CustomSelect {...props}></CustomSelect>
  }
}

FieldSelect.defaultProps = {
  placeholder: 'Choose option...',
  color: 'black',
}
