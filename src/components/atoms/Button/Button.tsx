import { forwardRef, ButtonHTMLAttributes, ReactElement } from 'react';
import Ink from 'react-ink';

import { buttons, buttonSizes } from '@/theme';
import { classNames } from '@/utils/classNames';

import { Box, BoxProps } from '../Grid';
import { Loader } from '../Loader';
import styles from './Button.module.scss';

type ButtonElements = 'button' | 'a' | any;

interface ConditionalProps {
  type?: 'submit' | 'button' | 'reset';
}

export type ButtonProps = BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    variant?: keyof typeof buttons;
    size?: keyof typeof buttonSizes;
    disabled?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    loading?: boolean;
    ripple?: boolean;
    href?: string;
    target?: string;
    hideOutline?: boolean;
    // adds a test id so it's easier to find in integration/e2e tests
    'data-testid'?: string;
  };

export const Button = forwardRef<any, ButtonProps>(
  (
    {
      as: Component = 'button',
      startIcon,
      endIcon,
      className,
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
    const conditionalProps: ConditionalProps = {};

    if (Component === 'button') {
      conditionalProps.type = type;
    }

    console.log(styles);

    const classes = classNames({
      [styles.button]: true,
      [className!]: Boolean(className),
      [styles[`variant-${variant}`]]: true,
      [styles[`size-${size}`]]: true,
    });

    return (
      <Component {...conditionalProps} className={classes} disabled={disabled} {...props} ref={ref}>
        {variant === 'clear' ? (
          children
        ) : (
          <>
            {ripple && <Ink />}
            {loading && (
              <div className={styles['button-loader']}>
                <Loader size={30} />
              </div>
            )}

            <div
              className={styles.inner}
              style={{
                visibility: loading ? 'hidden' : undefined,
              }}>
              {startIcon && <div className={styles['start-icon']}>{startIcon}</div>}

              <span>{children}</span>

              {endIcon && <div className={styles['end-icon']}>{endIcon}</div>}
            </div>
          </>
        )}
      </Component>
    );
  },
);
