import { text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'

import { Switch } from '.'

export default { title: 'Atoms|Switch', decorators: [withKnobs] }

export const component = () => {
  return (
    <Switch
      label={{
        active: text('Active label', 'Active label'),
        inactive: text('Inactive label', 'Inactive label'),
      }}></Switch>
  )
}
