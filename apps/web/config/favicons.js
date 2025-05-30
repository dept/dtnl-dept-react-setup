const fs = require('fs');

const { favicons } = require('favicons');
const prettier = require('prettier');

const folder = 'public/favicon';
const source = 'public/logo.png'; // Source image(s). `string`, `buffer` or array of `string`

const configuration = {
  path: '/favicon', // Path for overriding default icons path. `string`
  appName: 'DEPT®', // Your application's name. `string`
  appShortName: 'DEPT®', // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: 'Next.js starter for DEPT®', // Your application's description. `string`
  developerName: null, // Your (or your developer's) name. `string`
  developerURL: null, // Your (or your developer's) URL. `string`
  dir: 'auto', // Primary text direction for name, short_name, and description
  lang: 'en-US', // Primary language for name and short_name
  background: '#000', // Background colour for flattened icons. `string`
  theme_color: '#000', // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
  version: require('../package.json').version, // Your application's version string. `string`
  logging: false, // Print logs to console? `boolean`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
  },
};

favicons(source, configuration)
  .then(({ html, images, files }) => {
    images.forEach(image => {
      fs.writeFileSync(`${folder}/${image.name}`, image.contents);
    });

    files.forEach(file => {
      fs.writeFileSync(`${folder}/${file.name}`, file.contents);
    });

    const metaTags = html
      .map(html => {
        return html.replace('">', '" />');
      })
      .join('\n');

    prettier.resolveConfigFile().then(filePath => {
      prettier.resolveConfig(filePath).then(options => {
        const formatted = prettier.format(
          `
      export const renderFavicons = () => {
        return (
          <>
            ${metaTags}
          </>
        )
      }
      `,
          { ...options, parser: 'babel' },
        );

        fs.writeFileSync(`src/utils/favicons.tsx`, formatted);
        console.log('💅 :: Finished generating favicons');
      });
    });
  })
  .catch(error => {
    console.log('❌ :: Error generating favicons:', error.message);
    return;
  });
