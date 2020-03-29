import { render } from '@test/utils'

import { Alert } from './Alert'

test('renders with text', () => {
  const testMessage = 'Something went wrong'
  const screen = render(<Alert>{testMessage}</Alert>)
  expect(screen.getByText(testMessage)).toBeInTheDocument()
})
