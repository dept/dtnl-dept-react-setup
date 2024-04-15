import { REVALIDATE_PAGE_TTL } from '@/constants/cache';
import { SeoProps } from '@/constants/types';
import { Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { HeartFilledIcon, HeartOutlineIcon } from '@dept/icons';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = () => (
  <>
    <HStack>
      <HeartFilledIcon />
      <HeartOutlineIcon />
    </HStack>

    <Stack spacing="4">
      <Heading>{process.env.NEXT_PUBLIC_APP_URL}</Heading>
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

export const getStaticProps = (() => {
  return {
    props: {
      seo: {
        title: 'Homepage',
        description: 'This is the homepage',
        openGraph: {
          type: 'website',
        },
      },
    },
    revalidate: REVALIDATE_PAGE_TTL,
  };
}) satisfies GetStaticProps<SeoProps>;

export default Page;
