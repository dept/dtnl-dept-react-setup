import { StoryFn } from '@storybook/react';
import { Pagination } from './Pagination';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Pagination',
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

export const Example: StoryFn<typeof Pagination> = props => <Pagination {...props} />;
Example.args = {
  current: 6,
  total: 74,
  perPage: 10,
  onNavigate: action('onNavigate'),
};
