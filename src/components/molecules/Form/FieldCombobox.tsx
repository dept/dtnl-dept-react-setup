import { useCombobox, UseComboboxProps } from 'downshift';
import React, { useState } from 'react';
import { HiSelector } from 'react-icons/hi';

import { Box } from '@/components/atoms/Grid';
import { IconButton } from '@/components/atoms/IconButton';

import { FieldInput, FieldInputProps } from './FieldInput';
import { List } from './FieldSelect';

type Value = string | number;

interface Option {
  value: Value;
  label: Value;
}

export type FieldComboboxProps = Omit<FieldInputProps, 'type' | 'onChange'> & {
  options: Option[];
  onChange?: (value: Value) => void;
};

const ListItem = Box;

const stateReducer: UseComboboxProps<Option>['stateReducer'] = (state, actionAndChanges) => {
  const { type, changes } = actionAndChanges;

  // returning an uppercased version of the item string.
  switch (type) {
    // also on selection.
    case useCombobox.stateChangeTypes.InputBlur:
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
    case useCombobox.stateChangeTypes.FunctionSelectItem:
    case useCombobox.stateChangeTypes.FunctionSetInputValue:
      return {
        ...changes,
        inputValue: changes.selectedItem ? String(changes.selectedItem?.label) : changes.inputValue,
      };
    default:
      return changes; // otherwise business as usual.
  }
};

export const FieldCombobox: React.FC<FieldComboboxProps> = ({
  options: items,
  onChange,
  ...rest
}) => {
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    // selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
    openMenu,
    closeMenu,
  } = useCombobox({
    items: inputItems,
    stateReducer,
    onInputValueChange: ({ inputValue = '' }) => {
      setInputItems(
        items.filter(item => String(item.label).toLowerCase().startsWith(inputValue.toLowerCase())),
      );
    },
    onSelectedItemChange: e => {
      if (e?.selectedItem?.value && onChange) {
        onChange(e?.selectedItem?.value);
      }

      closeMenu();
    },
  });

  return (
    <Box position="relative" {...getComboboxProps()}>
      <FieldInput
        {...rest}
        {...getInputProps({
          onFocus: () => {
            openMenu();
          },
        })}
        labelProps={getLabelProps()}
        onClear={() => {
          reset();
        }}
        end={
          <IconButton
            {...getToggleButtonProps()}
            icon={HiSelector}
            size={18}
            aria-label="Toggle menu"
            hideOutline
          />
        }
      />

      <Box position="relative">
        <List
          isOpen={isOpen}
          as="ul"
          bg="white"
          color="black"
          minWidth={200}
          maxWidth="100%"
          {...getMenuProps()}>
          {inputItems.map((item, index) => (
            <ListItem
              color="black"
              as="li"
              cursor="pointer"
              bg={highlightedIndex === index ? 'rgba(0, 0, 0, 0.04)' : null}
              p="12px 14px"
              key={`${item}${index}`}
              {...getItemProps({ item, index })}>
              {item.label}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

FieldCombobox.defaultProps = {
  placeholder: 'Choose option...',
  clearable: true,
};
