import '@static/fonts/fonts.css'

import { DefaultSeo } from 'next-seo'
import { AppType } from 'next/dist/next-server/lib/utils'
import ReactModal from 'react-modal'
import { ThemeProvider } from 'styled-components'

import { BaseLayout } from '@/components/templates'
import { ContextProvider } from '@/context/ContextProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'
import { theme } from '@/theme/theme'

if (process.browser) {
  require('@/utils/detectTouch')
  require('@/utils/detectKeyboardFocus')
}

ReactModal.setAppElement('#__next')

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo titleTemplate={`%s | Dept`} />
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </>
        </ThemeProvider>
      </ContextProvider>
    </>
  )
}

export default MyApp
