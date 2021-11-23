import '@public/fonts/fonts.css';

import { ThemeProvider } from '@chakra-ui/system';
import { DefaultSeo } from 'next-seo';
import { AppType } from 'next/dist/next-server/lib/utils';

import { AppInsightsProvider } from '@/components/features/tools/ApplicationInsights';
import { BaseLayout } from '@/components/templates';
import { GlobalStyle } from '@/theme/GlobalStyle';
import { theme } from '@/theme/theme';
import { isBrowser } from '@/utils/isBrowser';

if (isBrowser) {
  import('@/utils/detectTouch');
  import('@/utils/detectKeyboardFocus');
}

const MyApp: AppType = ({ Component: Page, pageProps }) => {
  if (pageProps.renderWithoutLayout) {
    return <Page {...pageProps} />;
  }

  return (
    <AppInsightsProvider>
      <DefaultSeo titleTemplate={`%s | Dept`} />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BaseLayout>
          <Page {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </AppInsightsProvider>
  );
};

export default MyApp;
