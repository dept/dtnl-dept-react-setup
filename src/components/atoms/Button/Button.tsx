import { forwardRef, ButtonHTMLAttributes, ReactElement } from 'react';
import Ink from 'react-ink';

import { classNames } from '@/utils/classNames';

import { Loader } from '../Loader';
import styles from './Button.module.scss';

type ButtonElements = 'button' | 'a' | any;

interface ConditionalProps {
  type?: 'submit' | 'button' | 'reset';
}

type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type ButtonVariant = 'primary' | 'secondary' | 'clear';
type ButtonShape = 'rounded' | 'square' | 'pill';

export const buttonSizes: ButtonSize[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
export const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'clear'];
export const buttonShapes: ButtonShape[] = ['rounded', 'square', 'pill'];

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: ButtonElements;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
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

export const Button = forwardRef<any, ButtonProps>((props, ref) => {
  const {
    as: Component = 'button',
    startIcon,
    endIcon,
    className,
    shape = 'rounded',
    size = 'medium',
    variant = 'primary',
    type = 'button',
    ripple = true,
    children,
    loading,
    disabled,
    ...rest
  } = props;

  const conditionalProps: ConditionalProps = {};

  if (Component === 'button') {
    conditionalProps.type = type;
  }

  return (
    <Component
      {...conditionalProps}
      className={classNames(
        className,
        styles.button,
        styles[`shape--${shape}`],
        styles[`variant--${variant}`],
        styles[`size--${size}`],
      )}
      disabled={disabled}
      {...rest}
      ref={ref}>
      <>
        {variant !== 'clear' && ripple && <Ink />}
        {loading && (
          <div className={styles.loader}>
            <Loader size={30} />
          </div>
        )}

        <div className={styles.inner} data-loading={loading || undefined}>
          {startIcon && <div className={styles.start}>{startIcon}</div>}
          <span>{children}</span>
          {endIcon && <div className={styles.end}>{endIcon}</div>}
        </div>
      </>
    </Component>
  );
});
