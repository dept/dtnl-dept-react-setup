import { boolean, withKnobs } from '@storybook/addon-knobs'
import { Box } from '@tpdewolf/styled-primitives'
import React from 'react'

import { Hamburger } from '.'

export default { title: 'Atoms|Hamburger', component: Hamburger, decorators: [withKnobs] }

export const example = () => (
  <Box background="black" display="inline-block">
    <Hamburger onClick={console.log} isActive={boolean('Is active', false)} />
  </Box>
)
