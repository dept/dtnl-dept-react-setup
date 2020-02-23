const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withOffline = require('next-offline')

const plugins = [
  withOffline,
  [
    withBundleAnalyzer,

    {
      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../bundles/server.html',
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html',
        },
      },
    },
  ],
]

module.exports = {
  plugins,
}
