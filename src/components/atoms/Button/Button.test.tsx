import { render, screen } from '@testing-library/react'

import { ThemeMockProvider } from '@/utils/tests'

import { Button } from './Button'

test('renders with text', () => {
  const text = 'Click me'
  render(
    <ThemeMockProvider>
      <Button>{text}</Button>
    </ThemeMockProvider>,
  )
  expect(screen.getByText(text)).toBeInTheDocument()
})
