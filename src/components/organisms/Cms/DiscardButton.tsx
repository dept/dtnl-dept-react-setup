import { Button as TinaButton } from '@tinacms/styles'
import { useInlineForm } from 'react-tinacms-inline'

export function DiscardButton() {
  const { form } = useInlineForm()

  /*
   ** If there are no changes
   ** to discard, return early
   */
  if (form.finalForm.getState().pristine) {
    return null
  }

  return (
    <TinaButton
      color="primary"
      onClick={() => {
        form.finalForm.reset()
      }}>
      Discard Changes
    </TinaButton>
  )
}
