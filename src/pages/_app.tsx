import '@public/fonts/fonts.css';

import { ThemeProvider } from '@chakra-ui/system';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/dist/shared/lib/router/router';
import React from 'react';

import { BaseLayout } from '@/components/templates';
import { GlobalStyle } from '@/theme/GlobalStyle';
import { theme } from '@/theme/theme';
import { isBrowser } from '@/utils/isBrowser';

if (isBrowser) {
  import('@/utils/detectTouch');
  import('@/utils/detectKeyboardFocus');
}

const MyApp = ({ Component: Page, pageProps }: AppProps) => {
  if (pageProps.renderWithoutLayout) {
    return <Page {...pageProps} />;
  }

  return (
    <>
      <DefaultSeo titleTemplate={`%s | Dept`} />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BaseLayout>
          <Page {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
