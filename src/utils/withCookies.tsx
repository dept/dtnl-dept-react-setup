import { NextPageContext } from 'next'
import { AppContext, AppProps, default as NextApp } from 'next/app'
import React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'

type WithCookieProps = AppProps & {
  cookies: Cookies
}

export const withCookies = (App: typeof NextApp) => {
  return class WithCookies extends React.Component<WithCookieProps> {
    static getCookies(ctx: NextPageContext) {
      if (ctx && ctx.req && ctx.req.headers.cookie) {
        return new Cookies(ctx.req.headers.cookie)
      }

      return new Cookies()
    }

    public static async getInitialProps(appCtx: AppContext) {
      const { ctx } = appCtx
      let appProps: any = {}

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appCtx)
      }

      const cookies = this.getCookies(ctx)

      return { ...appProps, cookies }
    }

    public render() {
      const { cookies, ...rest } = this.props
      return (
        <CookiesProvider cookies={process.browser ? undefined : cookies}>
          <App {...rest} />
        </CookiesProvider>
      )
    }
  }
}
