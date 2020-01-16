import '@static/fonts/fonts.css'
import '@/components/organisms/RichTextEditor/styles.css'

import { DefaultSeo } from 'next-seo'
import App, { AppContext } from 'next/app'
import ReactModal from 'react-modal'
import { ThemeProvider } from 'styled-components'

import { BaseLayout } from '@/components/templates'
import { ContextProvider } from '@/context/ContextProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'
import { theme } from '@/theme/theme'
import { withCookies } from '@/utils/withCookies'

ReactModal.setAppElement('#__next')

export interface AppProps {}

class MyApp extends App<AppProps> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

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

export default withCookies(MyApp)
