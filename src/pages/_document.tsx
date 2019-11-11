import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'

import { FaviconsMeta } from '../../public/favicon/FaviconsMeta'

export default class MyDocument extends Document {
  constructor(props: any) {
    super(props)

    // fix needed for deploying on azure
    const { __NEXT_DATA__ } = props
    if (!__NEXT_DATA__.dataManager) {
      __NEXT_DATA__.dataManager = '[]'
    }
  }

  public static async getInitialProps(ctx: DocumentContext) {
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
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>,
        ],
      }
    } finally {
      sheet.seal()
    }
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
