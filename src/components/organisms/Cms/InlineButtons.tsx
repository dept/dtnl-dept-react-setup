import { Box } from '@/components/atoms'

import { DiscardButton } from './DiscardButton'
import { EditToggle } from './EditToggle'
import { SaveButton } from './SaveButton'

export function InlineButtons() {
  return (
    <Box position="fixed" right="40px" bottom="40px">
      <EditToggle />
      <DiscardButton />
      <SaveButton />
    </Box>
  )
}
