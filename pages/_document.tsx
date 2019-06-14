import Document, { Head, Html, Main, NextDocumentContext, NextScript } from 'next/document'
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  constructor(props: any) {
    super(props)

    // fix needed for deploying on azure
    const { __NEXT_DATA__ } = props
    if (!__NEXT_DATA__.dataManager) {
      __NEXT_DATA__.dataManager = '[]'
    }
  }

  public static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  public render() {
    return (
      <Html lang="nl">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
