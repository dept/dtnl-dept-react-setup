import { render, screen } from '@test/utils'

import { Button } from './Button'

test('renders with text', () => {
  const text = 'Click me'
  render(<Button>{text}</Button>)
  expect(screen.getByText(text)).toBeInTheDocument()
})
