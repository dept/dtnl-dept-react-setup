import { render } from '@test/utils'
import React from 'react'

import { Hyperlink } from './Hyperlink'

test('it renders', () => {
  render(<Hyperlink href="#"></Hyperlink>)
})
