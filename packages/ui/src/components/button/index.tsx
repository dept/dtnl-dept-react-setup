'use client';

import { ReactNode } from 'react';
import buttonClasses from './button.module.css';
import { VariantProps, cva, cx } from 'class-variance-authority';

const button = cva(buttonClasses.root, {
  variants: {
    variant: {
      primary: buttonClasses.primary,
      secondary: buttonClasses.secondary,
    },
    size: {
      small: buttonClasses.size_sm,
      medium: buttonClasses.size_lg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

/**
 * Retrieve the button variant props from the CVA function
 */
export type ButtonVariantProps = VariantProps<typeof button>;

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
} & ButtonVariantProps;

export const Button = ({ className, variant, size, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cx(button({ variant, size }), className)}>
      <span>{children}</span>
    </button>
  );
};
