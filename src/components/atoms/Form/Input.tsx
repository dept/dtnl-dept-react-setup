import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { colors } from '@/theme/colors'

import { Box, BoxProps } from '../Grid'
import { IconButton } from '../IconButton'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel'
  color?: string
  inputRef?: any
  floatCallback?: (shouldFloat: boolean) => void
  clearable?: boolean
  hasError?: boolean
  readonly?: boolean
  onClear?: () => void
  start?: string | number | JSX.Element
  end?: string | number | JSX.Element
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
  border: 1px solid ${colors.grey.light};
  border-radius: 4px;
  height: ${({ theme }) => theme.input.height || '50px'};
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: ${colors.grey.medium};
  }

  ${props =>
    props.hasFocus &&
    css`
      outline: none;
      box-shadow: ${props.theme.shadows.outline || 'inherit'};
      border-color: ${colors.grey.medium};
    `};

  ${props =>
    props.hasError &&
    css`
      color: ${colors.error};
      border-color: ${colors.error} !important;
    `};
`

const ClearableWrapper = styled(Box)`
  transform: translateY(-50%);
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

export const Input: React.FC<InputProps> = ({
  type,
  clearable,
  onClear,
  start,
  end,
  inputRef,
  floatCallback,
  ...props
}) => {
  const initHasValue = Boolean(props.value || props.defaultValue)
  const [hasValue, setHasValue] = useState(initHasValue)
  const [hasFocus, setHasFocus] = useState(false)
  const { color, hasError, onBlur, onFocus, onChange } = props

  useEffect(() => {
    if (floatCallback) {
      floatCallback(initHasValue || hasValue || hasFocus)
    }
  }, [hasValue, hasFocus, initHasValue, floatCallback])

  return (
    <InputWrapper color={color} hasFocus={hasFocus} hasError={hasError}>
      {start && <AdornmentWrapper>{start}</AdornmentWrapper>}
      <StyledInput
        type={type}
        {...props}
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
      {end && <AdornmentWrapper>{end}</AdornmentWrapper>}
      {clearable && props.value && (
        <ClearableWrapper position="absolute" right={10} top="50%">
          <IconButton
            type="button"
            aria-label="Wissen"
            color={props.color}
            icon="CloseLight"
            size={15}
            onClick={onClear}
          />
        </ClearableWrapper>
      )}
    </InputWrapper>
  )
}
