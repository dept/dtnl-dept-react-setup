import { render, screen } from '@testing-library/react'

import { Alert } from './Alert'

test('renders with text', () => {
  const testMessage = 'Something went wrong'
  render(<Alert>{testMessage}</Alert>)
  expect(screen.getByText(testMessage)).toBeInTheDocument()
})
