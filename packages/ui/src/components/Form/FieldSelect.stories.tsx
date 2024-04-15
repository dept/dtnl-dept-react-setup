import { StoryFn } from '@storybook/react';

import { FieldSelect, FieldSelectProps } from './FieldSelect';

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Ember'].map(item => ({
  value: item,
  label: item,
}));

export default {
  title: 'Forms/Select field',
  component: FieldSelect,
  argTypes: {
    native: {
      control: {
        type: 'boolean',
      },
    },
    hasError: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
  },
};

export const Example: StoryFn<FieldSelectProps> = props => <FieldSelect {...props} />;
Example.args = {
  native: true,
  label: 'Some label',
  name: 'framework',
  placeholder: 'john@doe.nl',
  hasError: false,
  options: frameworks,
};
