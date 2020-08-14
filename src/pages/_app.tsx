import '@public/fonts/fonts.css';

import whyDidYouRender from '@welldone-software/why-did-you-render';
import { DefaultSeo } from 'next-seo';
import { AppType } from 'next/dist/next-server/lib/utils';
import React from 'react';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import { BaseLayout } from '@/components/templates';
import { ContextProvider } from '@/context/ContextProvider';
import { GlobalStyle } from '@/theme/GlobalStyle';
import { theme } from '@/theme/theme';
import { appConfigurator } from '@/utils/appConfigurator';
import { isBrowser } from '@/utils/isBrowser';
import yn from '@/utils/yn';

if (process.browser) {
  require('@/utils/detectTouch');
  require('@/utils/detectKeyboardFocus');
}

if (isBrowser && process.env.ENVIRONMENT_NAME !== 'production') {
  /**
   * why-did-you-render README
   * https://github.com/welldone-software/why-did-you-render
   */

  whyDidYouRender(React);

  /**
   * To debug a component:
   *
   * const Whatever = () => <Box />
   *
   * Whatever.whyDidYouRender = true
   *
   * export { Whatever }
   */
}

ReactModal.setAppElement('#__next');

const MyApp: AppType = ({ Component: Page, pageProps }) => {
  return (
    <>
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
    </>
  );
};

export default appConfigurator(MyApp, {
  supportIE: yn(process.env.IE_SUPPORT, false),
  ssr: true,
});
