import { Story } from '@storybook/react';
import React from 'react';

import { FieldSelect } from './FieldSelect';

import { FieldSelectProps } from '.';

export default {
  title: 'Forms/Select field',
  component: FieldSelect,
  argTypes: {
    native: {
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
    hasError: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    label: {
      defaultValue: 'Some label',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'john@doe.nl',
      control: {
        type: 'text',
      },
    },
  },
};

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Ember'].map(item => ({
  value: item,
  label: item,
}));

export const example: Story<Partial<FieldSelectProps>> = args => (
  <FieldSelect options={frameworks} name="framework" {...args}></FieldSelect>
);
