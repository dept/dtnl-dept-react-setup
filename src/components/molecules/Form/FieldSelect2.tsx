import { Box } from '@tpdewolf/styled-primitives'
import { useSelect } from 'downshift'
import styled from 'styled-components'

import { InputWrapper } from '@/components/atoms'
import { Label } from '@/components/atoms/Form/Label'

interface Option {
  value: string | number
  label: string | number
}

interface SelectProps {
  name: string
  items: Option[]
  color?: string
  label?: string
  placeholder?: string
  hasError?: boolean
  native?: boolean
}

const List = styled(Box)`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 100;
`

const ListItem = Box

const CustomSelect: React.FC<SelectProps> = ({
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
    <>
      {label && (
        <Label htmlFor={name} color={color} {...getLabelProps()}>
          {label}
        </Label>
      )}
      <InputWrapper color={color} hasError={hasError}>
        <Box display="block" p="12px 14px" as="label" {...getToggleButtonProps()}>
          {(selectedItem && selectedItem.label) || placeholder}
        </Box>
        <List as="ul" bg="white" minWidth={200} maxWidth="100%" {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <ListItem
                as="li"
                bg={highlightedIndex === index ? 'grey.light' : null}
                p="12px 14px"
                key={`${item}${index}`}
                {...getItemProps({ item, index })}>
                {item.label}
              </ListItem>
            ))}
        </List>
      </InputWrapper>
    </>
  )
}

const StyledSelect = styled.select`
  appearance: none;
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
`

const NativeSelect: React.FC<SelectProps> = ({
  name,
  items,
  color,
  label,
  // placeholder,
  hasError,
}) => {
  return (
    <>
      {label && (
        <Label htmlFor={name} color={color}>
          {label}
        </Label>
      )}
      <InputWrapper color={color} hasError={hasError}>
        <StyledSelect>
          {items.map((item, index) => (
            <option key={`${item}${index}`}>{item.label}</option>
          ))}
        </StyledSelect>
      </InputWrapper>
    </>
  )
}

export const FieldSelect2: React.FC<SelectProps> = props => {
  if (props.native) {
    return <NativeSelect {...props}></NativeSelect>
  } else {
    return <CustomSelect {...props}></CustomSelect>
  }
}

FieldSelect2.defaultProps = {
  placeholder: 'Choose option...',
  color: 'grey.medium',
}
