import { Heading, Stack, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import CloseLightIcon from '@/icons/components/CloseLight';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
      <CloseLightIcon size={{ base: '20px', md: '60px' }} color="neutral" />

      <Stack spacing="4">
        <Heading as="h1">Homepage</Heading>
        <Text>Run `yarn storybook` to view all components</Text>
        <Text>Run `yarn route [name]` to create a page</Text>
        <Text>Run `yarn component [name]` to create a component</Text>
        <Text>Run `yarn context [name]` to create a context provider</Text>
        {process.env.ENVIRONMENT_NAME && (
          <code>Running on environment: {process.env.ENVIRONMENT_NAME}</code>
        )}
      </Stack>
    </>
  );
};

export default Page;
