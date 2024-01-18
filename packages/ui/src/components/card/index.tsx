'use client';

import styles from './card.module.css';

export type CardProps = React.HTMLAttributes<HTMLButtonElement> & {
  title: string;
  titleColor: 'white' | 'orange';
};

export const Card = (props: React.PropsWithChildren<CardProps>) => {
  return (
    <div className={styles.root}>
      <h1
        className={styles.title}
        style={{ color: props.titleColor ? `var(--colors-{props.titleColor})` : undefined }}
      >
        {props.title}
      </h1>
      <div className={styles.body}>{props.children}</div>
    </div>
  );
};
