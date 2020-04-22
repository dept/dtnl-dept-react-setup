import React, { InputHTMLAttributes, useState } from 'react'
import styled, { css } from 'styled-components'

import { Box, BoxProps, IconButton, Label } from '@/components/atoms'
import { colors } from '@/theme/colors'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel'
  color?: string
  inputRef?: any
  clearable?: boolean
  hasError?: boolean
  readonly?: boolean
  onClear?: () => void
  start?: string | number | JSX.Element
  end?: string | number | JSX.Element
}

export type FieldInputProps = InputProps & {
  label?: string
  name: string
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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

type InputWrapperProps = InputProps & { hasFocus?: boolean }

export const InputWrapper = styled(Box)<InputWrapperProps>`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.gray[200]};
  border-radius: 4px;
  height: ${({ theme }) => theme.input.height || '50px'};
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: ${colors.gray[300]};
  }

  ${props =>
    props.hasFocus &&
    css`
      outline: none;
      box-shadow: ${props.theme.shadows.outline || 'inherit'};
      border-color: ${colors.gray[300]};
    `};

  ${props =>
    props.hasError &&
    css`
      color: ${colors.error};
      border-color: ${colors.error} !important;
    `};
`

const AdornmentWrapper: React.FC<BoxProps> = props => (
  <Box
    minWidth={40}
    display="flex"
    alignItems="center"
    justifyContent="center"
    px={10}
    height="100%"
    flex="1"
    bg="grey.lighter"
    {...props}
  />
)

const Clear: React.FC<any> = ({ onClick }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" px={10} height="100%" flex="1">
      <IconButton type="button" aria-label="Clear" icon="CloseLight" size={15} onClick={onClick} />
    </Box>
  )
}

const floatingLabelStyles = css``

const FieldInputWrapper = styled(Box)<{ isFloating: boolean }>`
  position: relative;
  label {
    ${props => props.isFloating && floatingLabelStyles}
  }
`

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  name,
  color,
  type,
  clearable,
  onClear,
  start,
  end,
  hasError,
  onBlur,
  onFocus,
  onChange,
  inputRef,
  ...props
}) => {
  const initFloat = Boolean(
    props.value !== undefined ||
      props.defaultValue !== undefined ||
      start !== undefined ||
      end !== undefined,
  )
  const initHasValue = Boolean(props.value !== undefined || props.defaultValue !== undefined)
  const [hasValue, setHasValue] = useState(initHasValue)
  const [hasFocus, setHasFocus] = useState(false)

  const shouldFloat = initFloat || hasValue || hasFocus

  return (
    <FieldInputWrapper isFloating={shouldFloat}>
      {label && (
        <Label htmlFor={name} color={color || colors.gray[800]}>
          {label}
        </Label>
      )}
      <InputWrapper color={color} hasFocus={hasFocus} hasError={hasError}>
        {start && <AdornmentWrapper>{start}</AdornmentWrapper>}
        <StyledInput
          type={type}
          {...props}
          id={name}
          ref={inputRef}
          onChange={e => {
            const { value } = e.currentTarget
            setHasValue(Boolean(value))
            if (onChange) onChange(e)
          }}
          onBlur={e => {
            setHasFocus(false)
            if (onBlur) onBlur(e)
          }}
          onFocus={e => {
            setHasFocus(true)
            if (onFocus) onFocus(e)
          }}
        />
        {clearable && hasValue && <Clear onClick={onClear} />}
        {end && <AdornmentWrapper>{end}</AdornmentWrapper>}
      </InputWrapper>
    </FieldInputWrapper>
  )
}
