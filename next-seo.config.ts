import type { NextSeoProps } from 'next-seo';

const config: NextSeoProps = {
  title: 'DEPT®',
  description: 'DEPT® is pioneering tech/marketing to help brands stay ahead',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.deptagency.com',
    title: 'DEPT®',
    description: 'DEPT® is pioneering tech/marketing to help brands stay ahead',
    images: [
      {
        url: 'https://www.deptagency.com/wp-content/uploads/2022/12/black-white-melons.png',
        width: 800,
        height: 600,
        alt: 'DEPT® is pioneering tech/marketing to help brands stay ahead',
        type: 'image/jpeg',
        secureUrl: 'https://www.deptagency.com/wp-content/uploads/2022/12/black-white-melons.png',
      },
    ],
    siteName: 'DEPT®',
  },
  twitter: {
    handle: '@deptagency',
    site: '@deptagency.com',
    cardType: 'summary_large_image',
  },
};

export default config;
