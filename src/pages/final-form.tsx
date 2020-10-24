import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Box } from '@/components/atoms/Grid';
import { FinalFormExampleForm } from '@/components/organisms/Forms/FinalFormExampleForm';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Box py={10}>
        <FinalFormExampleForm />
      </Box>
    </>
  );
};

export default Page;
