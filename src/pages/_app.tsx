import '@/sass/main.scss';
import '@public/fonts/fonts.css';

import { DefaultSeo } from 'next-seo';
import { AppType } from 'next/dist/next-server/lib/utils';
import * as React from 'react';

import { BaseLayout } from '@/components/templates';

if (process.browser) {
  import('@/utils/detectTouch');
  import('@/utils/detectKeyboardFocus');
}

const MyApp: AppType = ({ Component: Page, pageProps }) => {
  if (pageProps.renderWithoutLayout) {
    return <Page {...pageProps} />;
  }

  return (
    <>
      <DefaultSeo titleTemplate={`%s | Dept`} />

      <BaseLayout>
        <Page {...pageProps} />
      </BaseLayout>
    </>
  );
};

export default MyApp;
