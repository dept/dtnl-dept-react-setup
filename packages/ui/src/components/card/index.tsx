'use client';

import styles from './card.module.css';

export type CardProps = React.HTMLAttributes<HTMLButtonElement> & {
  /**
   * Title heading of the card
   */
  title: string;
  /**
   * Color that can be dynamicaly set to title heading
   */
  titleColor?: 'green' | 'orange';
};

export const Card = (props: React.PropsWithChildren<CardProps>) => {
  return (
    <div className={styles.root}>
      <h1
        className={styles.title}
        style={
          props.titleColor
            ? {
                ['--colors-card-color' as string]: `var(--colors-${props.titleColor})`,
              }
            : undefined
        }
      >
        {props.title}
      </h1>
      <div className={styles.body}>{props.children}</div>
    </div>
  );
};
