import '@/sass/main.scss';
import '@public/fonts/fonts.css';

import { DefaultSeo } from 'next-seo';
import { AppType } from 'next/dist/next-server/lib/utils';
import * as React from 'react';

import { BaseLayout } from '@/components/templates';
import { isBrowser } from '@/utils/isBrowser';

if (process.browser) {
  import('@/utils/detectTouch');
  import('@/utils/detectKeyboardFocus');
}

if (isBrowser && process.env.ENVIRONMENT_NAME !== 'production') {
  /**
   * why-did-you-render README
   * https://github.com/welldone-software/why-did-you-render
   */
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
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
