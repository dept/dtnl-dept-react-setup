import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Box, Heading, Paragraph, Text } from '@/components/atoms';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
      <Box>
        <Heading as="h1" color="primary" variant="heading1">
          Homepage
        </Heading>
        <Text>Run `yarn storybook` to view all components</Text>
        <Paragraph>Run `yarn route [name]` to create a page</Paragraph>
        <Paragraph>Run `yarn component [name]` to create a component</Paragraph>
        <Paragraph>Run `yarn context [name]` to create a context provider</Paragraph>

        {process.env.ENVIRONMENT_NAME && (
          <code>Running on environment: {process.env.ENVIRONMENT_NAME}</code>
        )}
      </Box>
    </>
  );
};

export default Page;
