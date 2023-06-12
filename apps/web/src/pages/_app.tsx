import '@public/fonts/fonts.css';

import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/dist/shared/lib/router/router';
import React from 'react';

import { BaseLayout } from '@/components/templates';
import { theme } from '@dept/ui';

const MyApp = ({ Component: Page, pageProps, router }: AppProps) => {
  if (process.env.NODE_ENV === 'development' && !pageProps.seo) {
    console.warn(
      `There is no minimal SEO set for this page on path: ${router.asPath}. We would strongly recommend to atleast set a title and description`,
    );
  }

  if (pageProps.renderWithoutLayout) {
    return <Page {...pageProps} />;
  }

  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | DEPT®`}
        openGraph={{
          type: 'website',
          /**
           * Replace static locale with one from useTranslate() when using https://nextjs.org/docs/advanced-features/i18n-routing
           */
          locale: 'en',
          url: 'https://www.deptagency.com',
          siteName: 'DEPT®',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
        {...pageProps.seo}
      />
      <ChakraProvider theme={theme} resetCSS>
        <BaseLayout>
          <Page {...pageProps} />
        </BaseLayout>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
