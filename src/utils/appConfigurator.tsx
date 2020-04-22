import { AppType } from 'next/dist/next-server/lib/utils'
import React from 'react'

import { NoSsr, UnsupportedBrowser } from '@/components/atoms'

interface AppConfig {
  supportIE: boolean
  ssr: boolean
}

export const appConfigurator = (App: AppType, config: AppConfig) => {
  const AppConfigurator: AppType = props => {
    const appNodes = (
      <UnsupportedBrowser supportIE={config.supportIE}>
        <App {...props} />
      </UnsupportedBrowser>
    )

    if (config.ssr === false) {
      return <NoSsr>{appNodes}</NoSsr>
    }

    return appNodes
  }

  if (App.getInitialProps) {
    AppConfigurator.getInitialProps = async ctx => {
      return App.getInitialProps!(ctx)
    }
  }

  return AppConfigurator
}
