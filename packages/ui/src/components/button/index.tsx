'use client';

import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './button.module.css';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={classNames(styles.button, props.className)}>
      <span>{props.children}</span>
    </button>
  );
};
