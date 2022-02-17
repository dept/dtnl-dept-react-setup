import { Story } from '@storybook/react';

import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Molecules/Pagination',
  component: Pagination,
  current: {
    defaultValue: 6,
    control: {
      name: 'Current page',
      type: 'number',
    },
  },
  total: {
    defaultValue: 74,
    control: {
      name: 'Amount of content',
      type: 'number',
    },
  },
  perPage: {
    defaultValue: 10,
    control: {
      name: 'Items per page',
      type: 'number',
    },
  },
};

export const example: Story<PaginationProps> = args => (
  <Pagination {...args} onNavigate={val => console.log(val)} />
);
