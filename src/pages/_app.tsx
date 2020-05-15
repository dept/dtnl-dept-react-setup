import '@public/fonts/fonts.css'

import { GitClient, GitMediaStore } from '@tinacms/git-client'
import { DefaultSeo } from 'next-seo'
import { AppType } from 'next/dist/next-server/lib/utils'
import { useEffect, useMemo } from 'react'
import ReactModal from 'react-modal'
import { ThemeProvider } from 'styled-components'
import { TinaCMS, TinaProvider } from 'tinacms'

import { BaseLayout } from '@/components/templates'
import { ContextProvider } from '@/context/ContextProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'
import { theme } from '@/theme/theme'
import { appConfigurator } from '@/utils/appConfigurator'

if (process.browser) {
  require('@/utils/detectTouch')
  require('@/utils/detectKeyboardFocus')
}

ReactModal.setAppElement('#__next')

const MyApp: AppType = ({ Component: Page, pageProps }) => {
  const cms = useMemo(() => {
    const cms = new TinaCMS()
    const client = new GitClient('http://localhost:3000/___tina')
    cms.registerApi('git', client)
    cms.media.store = new GitMediaStore(client)
    return cms
  }, [])

  return (
    <TinaProvider cms={cms}>
      <DefaultSeo titleTemplate={`%s | Dept`} />

      <ContextProvider>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <BaseLayout>
              <Page {...pageProps} />
            </BaseLayout>
          </>
        </ThemeProvider>
      </ContextProvider>
    </TinaProvider>
  )
}

export default appConfigurator(MyApp, {
  supportIE: false,
  ssr: true,
})
