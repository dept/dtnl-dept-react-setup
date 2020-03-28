import { render, screen } from '@/utils/tests'

import { Button } from './Button'

test('renders with text', () => {
  const text = 'Click me'
  render(<Button>{text}</Button>)
  expect(screen.getByText(text)).toBeInTheDocument()
})
