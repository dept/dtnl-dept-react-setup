import { Box } from '@tpdewolf/styled-system'
import { InputHTMLAttributes, useState } from 'react'
import styled, { css } from 'styled-components'

import { colors } from '@/theme/colors'

import { IconButton } from '../IconButton'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel'
  color?: 'white' | 'black'
  clearable?: boolean
  hasError?: boolean
  readonly?: boolean
  onClear?: () => void
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  background-color: transparent;
  border: none;
  margin: 0;
  color: ${props => props.color || 'black'};
  padding: 12px 14px;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }

  ${props =>
    props.hasError &&
    css`
      color: ${colors.error};
    `};

  ${props =>
    props.readOnly &&
    css`
      opacity: 0.3;
      user-select: none;
      cursor: not-allowed;
    `};
`

const InputWrapper = styled.div<InputProps & { hasFocus: boolean }>`
  color: ${props => props.color || 'black'};
  border: 1px solid ${colors.grey.light};
  border-radius: 4px;

  &:hover {
    border-color: ${colors.grey.medium};
  }

  ${props =>
    props.hasFocus &&
    css`
      outline: ${props => props.theme.outline || 'inherit'};
      border-color: ${colors.grey.medium};
    `};

  ${props =>
    props.hasError &&
    css`
      color: ${colors.error};
      border-color: ${colors.error} !important;
    `};
`

export const Input: React.FC<InputProps> = ({ type, clearable, onClear, ...props }) => {
  const [hasFocus, setHasFocus] = useState(false)

  return (
    <InputWrapper color={props.color} hasFocus={hasFocus} hasError={props.hasError}>
      <StyledInput
        type={type}
        {...props}
        onBlur={e => {
          setHasFocus(false)
          if (props.onBlur) {
            props.onBlur(e)
          }
        }}
        onFocus={e => {
          setHasFocus(true)
          if (props.onFocus) {
            props.onFocus(e)
          }
        }}
      />
      {clearable && props.value && (
        <Box position="absolute" right={0} top={24}>
          <IconButton
            type="button"
            aria-label="Wissen"
            color={props.color}
            icon="closeLight"
            size={15}
            onClick={onClear}
          />
        </Box>
      )}
    </InputWrapper>
  )
}
