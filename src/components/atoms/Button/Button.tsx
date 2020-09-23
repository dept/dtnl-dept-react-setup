import React, { ButtonHTMLAttributes } from 'react';
import Ink from 'react-ink';
import { useTheme } from 'styled-components';

import { buttons, buttonSizes } from '@/theme';

import { Box, BoxProps, PseudoBox } from '../Grid';
import { Loader } from '../Loader';

type ButtonElements = 'button' | 'a';

interface ConditionalProps {
  as: ButtonElements;
  type?: 'submit' | 'button' | 'reset';
}

export type ButtonProps = BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    variant?: keyof typeof buttons;
    size?: keyof typeof buttonSizes;
    disabled?: boolean;
    startIcon?: any;
    endIcon?: any;
    loading?: boolean;
    ripple?: boolean;
    href?: string;
    target?: string;
    // adds a test id so it's easier to find in integration/e2e tests
    'data-testid'?: string;
  };

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      as = 'button',
      startIcon: StartIcon,
      endIcon: EndIcon,
      size = 'medium',
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
    const theme = useTheme();
    const buttonVariant = theme.buttons[variant];
    const conditionalProps: ConditionalProps = { as };
    const buttonSize = variant !== 'clear' ? theme.buttonSizes[size] : {};

    if (as === 'button') {
      conditionalProps.type = type;
    }

    return (
      <PseudoBox
        {...conditionalProps}
        disabled={disabled}
        sx={{
          lineHeight: 1.5,
          userSelect: 'none',
          position: 'relative',
          cursor: 'pointer',
          transitionProperty:
            'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
          transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
          transitionDuration: '.15s',
          ...buttonSize,
          ...buttonVariant,
        }}
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
            {loading && (
              <Box
                position="absolute"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                left={0}
                top={0}>
                <Loader size={30} />
              </Box>
            )}

            <Box
              display="inline-flex"
              visibility={loading ? 'hidden' : null}
              justifyContent="space-between"
              alignItems="center"
              textAlign="center">
              {StartIcon && (
                <Box mr={2}>
                  <StartIcon size={20} />
                </Box>
              )}

              <span>{children}</span>

              {EndIcon && (
                <Box ml={2}>
                  <EndIcon size={20} />
                </Box>
              )}
            </Box>
          </>
        )}
      </PseudoBox>
    );
  },
);
