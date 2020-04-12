import { render } from '@test/utils'
import { axe } from 'jest-axe'

import { ButtonLink } from './ButtonLink'

test('renders with text', async () => {
  const text = 'Click me'
  const screen = render(<ButtonLink href="#">{text}</ButtonLink>)

  const link = screen.container.querySelector('a')

  const results = await axe(screen.container)

  expect(results).toHaveNoViolations()

  expect(link).toBeInTheDocument()
  expect(link).toHaveTextContent(text)
})
