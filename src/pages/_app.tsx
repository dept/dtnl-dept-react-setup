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
import { isBrowser } from '@/utils/isBrowser';

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
  if (pageProps.renderWithoutLayout) {
    return <Page {...pageProps} />;
  }

  return (
    <>
      <DefaultSeo titleTemplate={`%s | Dept`} />
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BaseLayout>
            <Page {...pageProps} />
          </BaseLayout>
        </ThemeProvider>
      </ContextProvider>
    </>
  );
};

export default MyApp;
