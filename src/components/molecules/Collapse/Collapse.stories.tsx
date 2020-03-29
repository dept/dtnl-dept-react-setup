import { withKnobs } from '@storybook/addon-knobs'
import React, { useState } from 'react'

import { Button, Card } from '@/components/atoms'

import { Collapse } from '.'

export default { title: 'Molecules|Collapse', decorators: [withKnobs], component: Collapse }

export const Component = () => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Click to collapse</Button>
      <Collapse isOpen={open}>
        <Card border="2px solid red" p={30}>
          Content to be collapsed
        </Card>
      </Collapse>
    </div>
  )
}
