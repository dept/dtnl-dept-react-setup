import React from 'react'

import { Button, Card } from '@/components/atoms'

import { Menu } from './Menu'

export default { title: 'Molecules|Menu' }

export const example = () => {
  return (
    <Menu
      trigger={(clickHandler, isOpen) => (
        <Button onClick={clickHandler}>{isOpen ? 'Close menu' : 'Open menu'}</Button>
      )}>
      <Card bg="white" border="1px solid #ddd" width={200}>
        <Button variant="clear" block>
          Option 1
        </Button>
        <Button variant="clear" block>
          Option 2
        </Button>
        <Button variant="clear" block>
          Option 3
        </Button>
      </Card>
    </Menu>
  )
}
