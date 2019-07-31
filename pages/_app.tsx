import { DefaultSeo } from 'next-seo'
import App, { AppContext, Container } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { ContextProvider } from '@/context/ContextProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'
import { theme } from '@/theme/theme'

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
      <Container>
        <DefaultSeo titleTemplate={`%s | Dept`} />
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </ContextProvider>
      </Container>
    )
  }
}

export default MyApp
