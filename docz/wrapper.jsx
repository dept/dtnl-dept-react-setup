import React from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../src/theme'

const Wrapper = ({children}) => {
return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Wrapper
