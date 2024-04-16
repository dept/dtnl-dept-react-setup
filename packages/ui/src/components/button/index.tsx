'use client';

import type { ReactNode } from 'react';
import type { VariantProps} from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';
import buttonClasses from './button.module.css';

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

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
   return (
    <button {...props} className={cx(button({ variant, size }), className)}>
      <span>{children}</span>
    </button>
  );
}
