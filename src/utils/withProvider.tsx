import { NextPage, NextPageContext } from 'next'
import React from 'react'

/**
 * Use this to only wrap one Page with a Provider instead of the entire app
 *
 * Usage:
 * `export default withProvider(Page, ModalContextProvider)`
 */
export const withProvider = (Page: NextPage, Provider: React.ComponentType) => {
  return class WithProvider extends React.Component<any> {
    public static async getInitialProps(ctx: NextPageContext) {
      let pageProps: any = {}

      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx)
      }

      return pageProps
    }

    public render() {
      return (
        <Provider>
          <Page {...this.props}></Page>
        </Provider>
      )
    }
  }
}
