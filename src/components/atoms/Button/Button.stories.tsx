import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';

import { ButtonOption, buttons } from '@/theme';

import { Button } from './Button';

export default { title: 'Atoms/Button', component: Button };

const buttonVariants = Object.keys(buttons) as ButtonOption[];

export const example = () => (
  <Button
    variant={select('Variant', buttonVariants, buttonVariants[0] as ButtonOption)}
    loading={boolean('Is loading', false)}
    disabled={boolean('Is disabled', false)}>
    {text('Label', 'Button')}
  </Button>
);
