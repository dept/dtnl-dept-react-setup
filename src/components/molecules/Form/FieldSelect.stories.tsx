import { boolean, text } from '@storybook/addon-knobs'
import React from 'react'

import { FieldSelect } from './FieldSelect'

export default { title: 'Forms|Select field', component: FieldSelect }

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Ember'].map(item => ({
  value: item,
  label: item,
}))

export const example = () => (
  <FieldSelect
    native={boolean('native', true)}
    hasError={boolean('error', false)}
    items={frameworks}
    name="framework"
    placeholder={text('placeholder', 'Choose framework')}
    label={text('label', 'Framework')}></FieldSelect>
)
