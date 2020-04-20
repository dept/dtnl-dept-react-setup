import { NextPage, NextPageContext } from 'next'
import React from 'react'

/**
 * Use this to only wrap one Page with a Provider instead of the entire app
 *
 * Usage:
 * `export default withProvider(Page, ModalContextProvider)`
 */
export const withProvider = (
  Page: NextPage<any>,
  Provider: React.ComponentType<any>,
  providerProps: any,
) => {
  const WithProvider: NextPage<any> = props => {
    return (
      <Provider {...providerProps}>
        <Page {...props}></Page>
      </Provider>
    )
  }

  WithProvider.getInitialProps = async (ctx: NextPageContext) => {
    let pageProps: any = {}

    if (Page.getInitialProps) {
      pageProps = await Page.getInitialProps(ctx)
    }

    return pageProps
  }
}
