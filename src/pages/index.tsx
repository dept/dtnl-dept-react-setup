import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Stack } from '@/components/atoms/Grid/Stack';
import { Heading, Text, Paragraph } from '@/components/atoms/Text';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />

      <Stack space={4}>
        <Heading as="h1">Homepage</Heading>
        <Paragraph>Run `yarn storybook` to view all components</Paragraph>
        <Paragraph>Run `yarn route [name]` to create a page</Paragraph>
        <Paragraph>Run `yarn component [name]` to create a component</Paragraph>
        <Paragraph>Run `yarn context [name]` to create a context provider</Paragraph>
        {process.env.ENVIRONMENT_NAME && (
          <code>Running on environment: {process.env.ENVIRONMENT_NAME}</code>
        )}

        <Text as="span">dfgdfg</Text>
      </Stack>
    </>
  );
};

export default Page;
