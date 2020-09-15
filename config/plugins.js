const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

const withPWA = require('next-pwa');

const plugins = [
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV !== 'production',
        register: true,
        dest: 'public',
      },
    },
  ],
  withBundleAnalyzer,
];

module.exports = {
  plugins,
};
