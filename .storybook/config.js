import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ThemeProvider } from 'styled-components'

import { theme } from '../src/theme'
import { GlobalStyle } from '../src/theme/GlobalStyle'

addDecorator(
  withInfo({
    inline: true,
    header: false, // Global configuration for the info addon across all of your stories.
  }),
)

addDecorator(story => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </>
))

configure(require.context('../src', true, /\.stories\.tsx$/), module)
