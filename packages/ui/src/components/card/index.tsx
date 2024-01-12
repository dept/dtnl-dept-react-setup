'use client';

import { styled } from '@dept/styled-system/jsx';
import { card } from '@dept/styled-system/recipes';
import { HTMLStyledProps } from '@dept/styled-system/types';

export type CardProps = {
  title: string;
  titleColor: HTMLStyledProps<'h1'>['color'];
};

export const Card = (props: React.PropsWithChildren<CardProps>) => {
  const classes = card();

  return (
    <div className={classes.root}>
      <styled.h1 className={classes.title} color={props.titleColor}>
        {props.title}
      </styled.h1>
      <div className={classes.body}>{props.children}</div>
    </div>
  );
};
