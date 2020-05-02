import css from '@styled-system/css'
import { motion } from 'framer-motion'
import React, { ButtonHTMLAttributes } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import Ink from 'react-ink'
import { useTheme } from 'styled-components'

import { buttons, IconOption } from '@/theme'

import { Box, BoxProps, PseudoBox } from '../Grid'
import { Icon } from '../Icon'

type ButtonElements = 'button' | 'a'

interface ConditionalProps {
  as: ButtonElements
  type?: 'submit' | 'button' | 'reset'
}

export type ButtonProps = BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements
    variant?: keyof typeof buttons
    disabled?: boolean
    startIcon?: IconOption
    endIcon?: IconOption
    loading?: boolean
    ripple?: boolean
    href?: string
    target?: string
    // adds a test id so it's easier to find in integration/e2e tests
    'data-testid'?: string
  }

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      as = 'button',
      startIcon,
      endIcon,
      children,
      variant = 'primary',
      type = 'button',
      ripple = true,
      loading,
      disabled,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme()
    const buttonVariant = theme.buttons[variant]
    const conditionalProps: ConditionalProps = { as }

    if (as === 'button') {
      conditionalProps.type = type
    }

    return (
      <PseudoBox
        as="button"
        display="inline-block"
        {...conditionalProps}
        disabled={disabled || loading}
        css={css({
          textAlign: 'center',
          lineHeight: 1.5,
          userSelect: 'none',
          position: 'relative',
          cursor: 'pointer',
          border: 0,
          appearance: 'none',
          ...buttonVariant,
        })}
        _disabled={{
          cursor: 'not-allowed',
        }}
        _focus={{
          outline: 'none',
          boxShadow: theme.shadows.outline,
        }}
        {...props}
        ref={ref}>
        {variant === 'clear' ? (
          children
        ) : (
          <>
            {ripple && <Ink />}
            <PseudoBox display="flex" alignItems="center" justifyContent="space-between">
              {loading ? (
                <motion.div
                  animate={{ transform: 'rotate(350deg)' }}
                  style={{ width: '24px', height: '24px' }}
                  transition={{ duration: 1, loop: Infinity, ease: 'linear' }}>
                  <AiOutlineLoading size={20} />
                </motion.div>
              ) : (
                <>
                  {startIcon && (
                    <Box mr={8}>
                      <Icon size={20} icon={startIcon}></Icon>
                    </Box>
                  )}
                  <span>{children}</span>
                  {endIcon && (
                    <Box ml={8}>
                      <Icon size={20} icon={endIcon}></Icon>
                    </Box>
                  )}
                </>
              )}
            </PseudoBox>
          </>
        )}
      </PseudoBox>
    )
  },
)
