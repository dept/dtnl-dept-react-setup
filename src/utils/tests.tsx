import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme'

export const ThemeMockProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
