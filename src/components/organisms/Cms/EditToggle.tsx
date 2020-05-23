import { Button as TinaButton } from '@tinacms/styles'
import { useInlineForm } from 'react-tinacms-inline'

import { Box } from '@/components/atoms'

export function EditToggle() {
  // Access 'edit mode' controls via `useInlineForm` hook
  const { status, deactivate, activate } = useInlineForm()

  return (
    <TinaButton
      primary
      onClick={() => {
        status === 'active' ? deactivate() : activate()
      }}>
      {status === 'active' ? 'Preview' : 'Edit'}
    </TinaButton>
  )
}
