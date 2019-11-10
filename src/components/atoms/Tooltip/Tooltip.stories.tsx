import React from 'react'

import { Tooltip } from './Tooltip'

export default { title: 'Atoms|Tooltip' }

export const example = () => {
  return <Tooltip>More information in the tooltip</Tooltip>
}

export const withCustomTrigger = () => {
  return (
    <Tooltip placement={'right'} trigger={<span>Hover over this text</span>}>
      More information in the tooltip
    </Tooltip>
  )
}
