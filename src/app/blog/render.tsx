'use client';

import { Article } from '@/pages/api/articles';
import { Box, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

type PageProps = {
  articles: Article[];
};

const PageRender = ({ articles }: PageProps) => (
  <Box>
    <Heading as="h1">Blogs</Heading>
    <ul>
      {articles.map(item => (
        <li key={item.id}>
          <Link as={NextLink} href={`/blog/${item.id}`}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </Box>
);

export { PageRender };
