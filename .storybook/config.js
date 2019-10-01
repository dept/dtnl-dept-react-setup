import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
    // source: false,
    propTables: false,
  }),
)
configure(require.context('../src', true, /\.stories\.tsx$/), module)
