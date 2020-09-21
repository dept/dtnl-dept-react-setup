import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Box } from '@/components/atoms/Grid';
import { Heading, Paragraph } from '@/components/atoms/Text';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="About" description="This is the about page" />
      <Box>
        <Heading as="h1" color="primary">
          About
        </Heading>
        <Paragraph>This is the about page</Paragraph>
      </Box>
    </>
  );
};

export default Page;
