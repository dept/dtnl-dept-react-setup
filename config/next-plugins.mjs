import withBundleAnalyzerImport from '@next/bundle-analyzer';
import withPWAImport from 'next-pwa';

const plugins = [
  withBundleAnalyzerImport({
    enabled: process.env.BUNDLE_ANALYZE === 'true',
  }),
  withPWAImport({
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    publicExcludes: ['!favicon/**/*'],
  }),
];

export { plugins };
