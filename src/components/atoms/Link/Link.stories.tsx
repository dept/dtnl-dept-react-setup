import React from 'react'

import { Hyperlink } from '../Hyperlink'
import { Link } from './Link'

export default { title: 'Atoms|Link', component: Link }

export const example = () => (
  <Link href="/">
    <Hyperlink underline>Go to page</Hyperlink>
  </Link>
)

example.story = {
  parameters: {
    info:
      'The Next.js <Link> component differs from the react-router Link component. Check Next.js documentation: https://nextjs.org/docs#with-link',
  },
}
