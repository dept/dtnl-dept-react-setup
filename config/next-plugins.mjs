import withBundleAnalyzeImport from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

const withBundleAnalyze = withBundleAnalyzeImport({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

const plugins = [
  withBundleAnalyze,
  withPWA({
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    publicExcludes: ['!favicon/**/*'],
  }),
];

export { plugins };
