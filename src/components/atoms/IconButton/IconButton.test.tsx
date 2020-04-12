import { render } from '@test/utils'
import React from 'react'

import { IconButton } from './IconButton'

test('it renders', () => {
  render(<IconButton icon="Home" aria-label="Home"></IconButton>)
})
