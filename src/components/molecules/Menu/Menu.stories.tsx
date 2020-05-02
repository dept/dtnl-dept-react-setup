import React from 'react'

import { Box, Button } from '@/components/atoms'

import { Menu } from './Menu'

export default { title: 'Molecules|Menu' }

export const example = () => {
  return (
    <Menu
      trigger={(clickHandler, isOpen) => (
        <Button onClick={clickHandler}>{isOpen ? 'Close menu' : 'Open menu'}</Button>
      )}>
      <Box bg="white" border="1px solid #ddd" width={200}>
        <Button variant="clear" display="block">
          Option 1
        </Button>
        <Button variant="clear" display="block">
          Option 2
        </Button>
        <Button variant="clear" display="block">
          Option 3
        </Button>
      </Box>
    </Menu>
  )
}
