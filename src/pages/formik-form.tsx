import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Box } from '@/components/atoms/Grid';
import { FormikExampleForm } from '@/components/organisms/Forms/FormikExampleForm';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Box py={10}>
        <FormikExampleForm />
      </Box>
    </>
  );
};

export default Page;
