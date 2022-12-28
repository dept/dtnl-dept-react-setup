import { Favicons } from '@/utils/favicons';
import { NextSeo } from 'next-seo';

import config from '../../next-seo.config';

export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="disabled-adaptations" content="watch" />
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function() {
                var host = window.location.hostname;
                var ua = window.navigator.userAgent;
                var redirect = '/unsupported';
                // test if browser is  <= IE10
                var msie = ua.indexOf('MSIE');
                if (msie > 0) {
                    window.location.href = redirect;
                }
                // test if browser is IE11
                var trident = ua.indexOf('Trident/');
                if (trident > 0) {
                  window.location.href = redirect;
                }
              })();`,
        }}
      /> */}

      <Favicons />
      <NextSeo {...config} useAppDir />
    </>
  );
}
