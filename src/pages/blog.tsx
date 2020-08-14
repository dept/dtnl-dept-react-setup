import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Box, Heading, Hyperlink } from '@/components/atoms';

interface PageProps {}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Example blog post',
    content: 'Awesome content',
  },
  {
    id: 2,
    title: 'Another example blog post',
    content: 'More awesome content',
  },
];

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Blog" description="An overview of our blog posts" />
      <Box>
        <Heading as="h1" color="primary">
          Blogs
        </Heading>
        <ul>
          {blogPosts.map(item => {
            return (
              <li key={item.id}>
                <Hyperlink href="/blog/[postId]" as={`/blog/${item.id}`}>
                  {item.title}
                </Hyperlink>
              </li>
            );
          })}
        </ul>
      </Box>
    </>
  );
};

export default Page;
