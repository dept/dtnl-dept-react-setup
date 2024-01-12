'use client';

import { cx } from '@dept/styled-system/css';
import { HTMLStyledProps, splitCssProps, styled } from '@dept/styled-system/jsx';
import { button, ButtonVariant } from '@dept/styled-system/recipes';
import { ReactNode } from 'react';

export type ButtonProps = HTMLStyledProps<'div'> &
  HTMLStyledProps<'button'> & {
    children: ReactNode;
  } & Partial<ButtonVariant>;

export const Button = (props: ButtonProps) => {
  const { children, size, shape, fullWidth, className, visual, ...restProps } = props;
  const [_, buttonProps] = splitCssProps(restProps);

  return (
    <styled.button
      {...buttonProps}
      className={cx(className, button({ size, fullWidth, shape, visual }))}
    >
      {children}
    </styled.button>
  );
};
