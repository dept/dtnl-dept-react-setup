import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Box } from '@/components/atoms/Grid';
import { ExampleForm } from '@/components/organisms/Forms/ExampleForm';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Box py={10}>
        <ExampleForm />
      </Box>
    </>
  );
};

export default Page;
