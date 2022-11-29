import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

type PageProps = {};

const Page: NextPage<PageProps> = () => (
  <>
    <NextSeo title="About" description="This is the about page" />
    <Box>
      <Heading as="h1">About</Heading>
      <Text>This is the about page</Text>
    </Box>
  </>
);

export default Page;
