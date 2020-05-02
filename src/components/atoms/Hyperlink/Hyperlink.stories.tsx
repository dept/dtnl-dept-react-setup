import React from 'react'

import { Hyperlink } from '.'

export default { title: 'Atoms|Hyperlink', component: Hyperlink }

export const example = () => <Hyperlink href="https://www.google.nl">Go to a page</Hyperlink>
export const withIcon = () => (
  <Hyperlink href="https://www.google.nl" icon="Clock">
    Go to a page
  </Hyperlink>
)
