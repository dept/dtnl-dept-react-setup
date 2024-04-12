import withBundleAnalyzer from '@next/bundle-analyzer';

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZE === 'true',
  }),
];

export { plugins };
