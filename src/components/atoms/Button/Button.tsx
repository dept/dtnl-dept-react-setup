import { Box, BoxProps } from '@tpdewolf/styled-primitives'
import React, { ButtonHTMLAttributes } from 'react'
import Ink from 'react-ink'
import styled from 'styled-components'

import { buttons } from '@/theme'

import { Icon, IconOption } from '../Icon'
import { Loader } from '../Loader'

type ButtonElements = 'button' | 'a'

interface ConditionalProps {
  as: ButtonElements
  type?: 'submit' | 'button' | 'reset'
}

export type ButtonProps = BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements
    variant?: keyof typeof buttons
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
    target?: string
  }

type StyleFunction = (props: ButtonProps) => string

const sizeStyles: StyleFunction = props => `
  ${
    props.size === 'small'
      ? `
          height: 50px;
          font-size: 16px;
        `
      : ''
  }

  ${
    props.size === 'normal'
      ? `
          height: 50px;
          font-size: 16px;
        `
      : ''
  }
`

const ButtonBase = styled(Box)<ButtonProps>`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  user-select: none;

  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadows.outline || 'inherit'};
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${sizeStyles}
  ${props => (props.inline ? 'display: inline-flex' : '')};
  ${props => (props.block ? 'display: block; width: 100%;' : '')};
`

const StyledButtonLabel = styled.span<ButtonProps>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${props => props.justify};

  ${props => props.iconReverse && 'flex-direction: row-reverse;'}
`

// this is a class component because Buttons often need a ref, and function components require React.forwardRef to forward refs
export class Button extends React.Component<ButtonProps> {
  render() {
    const {
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
    } = this.props

    const conditionalProps: ConditionalProps = { as }

    if (as === 'button') {
      conditionalProps.type = type
    }

    return (
      <ButtonBase
        {...conditionalProps}
        variant={variant}
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
      </ButtonBase>
    )
  }
}
