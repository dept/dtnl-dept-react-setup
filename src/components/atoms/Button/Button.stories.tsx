import { boolean, select, text } from '@storybook/addon-knobs';

import { Button, buttonShapes, buttonSizes, buttonVariants } from './Button';

export default { title: 'Atoms/Button', component: Button };

export const example = () => (
  <Button
    variant={select('Variant', buttonVariants, buttonVariants[0])}
    size={select('Size', buttonSizes, buttonSizes[2])}
    shape={select('Shape', buttonShapes, buttonShapes[0])}
    loading={boolean('Is loading', false)}
    disabled={boolean('Is disabled', false)}>
    {text('Label', 'Button')}
  </Button>
);
