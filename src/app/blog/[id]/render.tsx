'use client';

import { Article } from '@/pages/api/articles';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';

type PageProps = {
  article: Article;
};

export const PageRender = ({ article }: PageProps) => (
  <>
    <NextSeo title={article.title} description={article.content} useAppDir />
    <Box>
      <Heading as="h1" color="primary">
        {article.title}
      </Heading>
      <Text as="p">{article.content}</Text>

      <Link as={NextLink} href="/blog">
        Go back
      </Link>
    </Box>
  </>
);
