import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme'

addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
    // source: false,
    propTables: false,
  }),
)

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

configure(require.context('../src', true, /\.stories\.tsx$/), module)
