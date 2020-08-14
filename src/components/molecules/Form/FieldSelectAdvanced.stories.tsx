import React from 'react';

import { FieldSelectAdvanced } from './FieldSelectAdvanced';

export default { title: 'Forms/Advanced Select field', component: FieldSelectAdvanced };

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Ember'].map(item => ({
  value: item,
  label: item,
}));

export const example = () => (
  <FieldSelectAdvanced items={frameworks} name="framework" label="Framework"></FieldSelectAdvanced>
);

example.story = {
  parameters: {
    info:
      'Uses react-select (https://github.com/JedWatson/react-select) to create a accessible select component',
  },
};
