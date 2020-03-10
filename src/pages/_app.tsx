import '@static/fonts/fonts.css'
import '@/components/organisms/RichTextEditor/styles.css'

import { DefaultSeo } from 'next-seo'
import App from 'next/app'
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

export interface AppProps {}

class MyApp extends App<AppProps> {
  public render() {
    const { Component, pageProps } = this.props

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
}

export default MyApp
