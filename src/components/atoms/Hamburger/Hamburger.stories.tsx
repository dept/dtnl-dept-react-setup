import { boolean, withKnobs } from '@storybook/addon-knobs'
import React from 'react'

import { Box } from '../Grid'
import { Hamburger } from './Hamburger'

export default { title: 'Atoms|Hamburger', component: Hamburger, decorators: [withKnobs] }

export const example = () => (
  <Box background="black" display="inline-block">
    <Hamburger onClick={console.log} isActive={boolean('Is active', false)} />
  </Box>
)
