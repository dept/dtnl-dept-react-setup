import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { FaviconsMeta } from '../../public/favicon/FaviconsMeta'

export default class MyDocument extends Document {
  public static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet()

    const page = renderPage(App => props =>
      sheet.collectStyles(
        <StyleSheetManager sheet={sheet.instance}>
          <App {...props} />
        </StyleSheetManager>,
      ),
    )

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  public render() {
    return (
      <Html lang="nl">
        <Head>
          <FaviconsMeta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
