import { AppType } from 'next/dist/next-server/lib/utils'
import React from 'react'

import { UnsupportedBrowser } from '@/components/organisms/UnsupportedBrowser'

import { isBrowser } from './isBrowser'

interface AppConfig {
  supportIE: boolean
  ssr: boolean
}

export const appConfigurator = (App: AppType, config: AppConfig) => {
  const AppConfigurator: AppType = props => {
    if (config.ssr === false && !isBrowser) {
      return null
    }

    return (
      <UnsupportedBrowser supportIE={config.supportIE}>
        <App {...props} />
      </UnsupportedBrowser>
    )
  }

  if (App.getInitialProps) {
    AppConfigurator.getInitialProps = async ctx => {
      return App.getInitialProps!(ctx)
    }
  }

  return AppConfigurator
}
