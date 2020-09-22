import CloseLightIcon from '@public/icons/components/CloseLight';
import React, { FocusEventHandler } from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/src/types';
import styled from 'styled-components';

import { Box } from '@/components/atoms/Grid';
import { IconButton } from '@/components/atoms/IconButton';
import { colors } from '@/theme/colors';

interface Option {
  value: string | number;
  label: string | number;
}

export interface FieldSelectAdvancedProps {
  isClearable?: boolean;
  isSearchable?: boolean;
  minWidth?: number;
  items: Option[];
  value?: string | number;
  placeholder?: string;
  label?: string;
  onBlur?: FocusEventHandler;
  onChange?: (value: ValueType<Option>, action: any) => void;
  name?: string;
  disabled?: boolean;
  hasError?: boolean;
}

const INPUT_HEIGHT = '50px';

const SelectWrapper = styled.div<{ hasError?: boolean; minWidth: number | undefined }>`
  width: 100%;
  max-width: 100%;
  ${({ minWidth }) => `min-width: ${minWidth}px;`}
  .reactselect__control {
    border-radius: 0;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${({ hasError }) => (hasError ? colors.error : colors.gray[600])};
    min-height: ${INPUT_HEIGHT};
    &:hover {
      border-color: ${colors.gray[600]};
    }
    &--is-focused {
      outline: none !important;
      box-shadow: none;
    }

    &--menu-is-open {
      box-shadow: none;
    }
  }

  .reactselect__value-container {
    padding: 0;
    height: ${INPUT_HEIGHT};
  }

  .reactselect__menu {
    box-shadow: none;
    border: 1px solid ${colors.gray[600]};
    border-radius: 0;
    margin-top: -1px;
  }

  .reactselect__menu-list {
    padding: 0;
  }

  .reactselect__indicator-separator {
    display: none;
  }

  .reactselect__option {
    &--is-focused {
      background-color: ${colors.gray[100]};
    }
    &--is-selected {
      background-color: ${colors.gray[200]};
    }
    &:active {
      background-color: ${colors.gray[300]};
      color: #fff;
    }
  }
`;

export const FieldSelectAdvanced: React.FC<FieldSelectAdvancedProps> = ({
  label,
  value,
  items,
  disabled,
  minWidth = 200,
  isClearable = true,
  placeholder,
  hasError,
  ...props
}) => {
  return (
    <SelectWrapper hasError={hasError} minWidth={minWidth}>
      <Select
        components={{
          DropdownIndicator: ddProps => {
            return (
              <Box px={8}>
                <IconButton
                  tabIndex={-1}
                  aria-label={'Uitklappen'}
                  icon={'Chevron'}
                  size={18}
                  padding={0}
                  rotate={ddProps.selectProps.menuIsOpen ? -180 : 0}
                />
              </Box>
            );
          },
          ClearIndicator: clearProps => (
            <Box px={10}>
              <IconButton
                aria-label={'Wissen'}
                onClick={clearProps.clearValue}
                icon={CloseLightIcon}
                rotate={-180}
                size={14}
                padding={0}
              />
            </Box>
          ),
        }}
        // menuIsOpen
        classNamePrefix="reactselect"
        isDisabled={disabled}
        isSearchable
        placeholder={placeholder || label || 'Select'}
        noOptionsMessage={() => 'No options'}
        isClearable={isClearable}
        value={items.find(item => item.value === value)}
        options={items}
        {...props}
      />
    </SelectWrapper>
  );
};
