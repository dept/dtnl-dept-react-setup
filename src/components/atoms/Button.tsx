import { Box,BoxProps } from '@tpdewolf/styled-system'
import { darken } from 'polished'
import React, { ButtonHTMLAttributes } from 'react'
import Ink from 'react-ink'
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components'

import { Loader } from '@/components/molecules/Loader'
import { colors } from '@/theme/colors'
import { media } from '@/utils/media'

import { Icon, IconOption } from './Icon'

type ButtonElements = 'button' | 'a'
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'clear' | 'disabled'

interface ConditionalProps {
  as: ButtonElements
  type?: 'submit' | 'button' | 'reset'
}

export type ButtonProps = BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements
    variant?: ButtonVariant
    size?: 'small' | 'normal'
    disabled?: boolean
    iconReverse?: boolean
    icon?: IconOption
    block?: boolean
    inline?: boolean
    justify?: 'center' | 'space-between'
    loading?: boolean
    selected?: boolean
    ripple?: boolean
    href?: string
  }

type StyleFunction = (props: ButtonProps) => string

const sizeStyles: StyleFunction = props => `
  ${
    props.size === 'small'
      ? css`
          height: 50px;
          font-size: 16px;
        `
      : ''
  }

  ${
    props.size === 'normal'
      ? css`
          height: 50px;
          font-size: 16px;

          ${media.min('tablet')} {
            font-size: 20px;
          }
        `
      : ''
  }
`

type B = StyledComponent<'div', DefaultTheme, ButtonProps, never>

type ButtonBaseType<T> = T & { [key in ButtonVariant]?: T }

const ButtonBase: ButtonBaseType<B> = styled(Box)<ButtonProps>`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  border: none;
  padding: 0 20px;
  position: relative;
  user-select: none;

  &:focus {
    outline: ${props => props.theme.outline || 'inherit'};
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${props => sizeStyles(props)}
  ${props => (props.inline ? 'display: inline-flex' : '')};
  ${props => (props.block ? 'display: block; width: 100%;' : '')};
`

ButtonBase.primary = styled(ButtonBase)`
  color: ${colors.white};
  background-color: ${colors.primary};

  &:hover,
  &:focus {
    background-color: ${darken(0.2, colors.primary)};
  }
`

ButtonBase.outline = styled(ButtonBase)`
  background-color: ${props => (props.selected ? colors.grey.dark : 'transparent')};
  border: 1px solid ${colors.grey.medium};
  color: ${props => (props.selected ? colors.white : colors.grey.dark)};

  ${props =>
    !props.selected
      ? `
        &:hover,&:focus {
          background-color: transparent;
          color: ${colors.black};
          border: 1px solid ${colors.black};
        }`
      : ''};
`

ButtonBase.secondary = styled(ButtonBase)`
  background-color: ${props => (props.selected ? colors.grey.dark : 'transparent')};
  border: 1px solid ${colors.grey.medium};
  color: ${props => (props.selected ? colors.white : colors.grey.dark)};

  ${props =>
    !props.selected
      ? `
        &:hover,&:focus {
          background-color: transparent;
          color: ${colors.black};
          border: 1px solid ${colors.black};
        }`
      : ''};
`

ButtonBase.clear = styled(ButtonBase)`
  padding: 0;
  height: inherit;
  font-size: inherit;
  font-weight: inherit;
  width: inherit;
  background-color: transparent;
  color: #000;
`

ButtonBase.disabled = styled(ButtonBase)`
  background-color: ${colors.grey.lighter};
  cursor: not-allowed;
  color: ${colors.grey.medium};
`

const StyledButtonLabel = styled.span<ButtonProps>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${props => props.justify};

  ${props => props.iconReverse && 'flex-direction: row-reverse;'}
`

export const Button: React.FC<ButtonProps> = ({
  as = 'button',
  icon,
  children,
  variant = 'primary',
  justify = 'center',
  size = 'normal',
  type = 'button',
  ripple = true,
  loading,
  disabled,
  ...props
}) => {
  const conditionalProps: ConditionalProps = { as }
  if (as === 'button') {
    conditionalProps.type = type
  }

  if (disabled) {
    variant = 'disabled'
  }

  const ButtonComponent = ButtonBase[variant]!

  return (
    <ButtonComponent
      {...conditionalProps}
      variant={variant}
      fontWeight="bold"
      disabled={disabled || loading}
      size={size}
      {...props}>
      {variant === 'clear' ? (
        children
      ) : (
        <>
          {ripple && <Ink />}
          <StyledButtonLabel size={size} justify={justify}>
            {loading ? (
              <Loader color={'white'} size={50} />
            ) : (
              <>
                <span>{children}</span>
                {icon && (
                  <Box pl="xxs">
                    <Icon size={18} icon={icon} />
                  </Box>
                )}
              </>
            )}
          </StyledButtonLabel>
        </>
      )}
    </ButtonComponent>
  )
}
