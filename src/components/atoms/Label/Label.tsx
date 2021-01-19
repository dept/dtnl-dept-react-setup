import { HTMLAttributes, FC } from 'react';

import styles from './Label.module.scss';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
}

export const Label: FC<LabelProps> = ({ children, className, required, ...props }) => {
  const classes = [className, styles.label].join(' ');

  return (
    <label className={classes} {...props}>
      {children}
      {required ? ' *' : null}
    </label>
  );
};
