import { Box, Heading, Link } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

import { NavLink } from '@/components/shared/Link';
import { SeoProps } from '@/constants/types';

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export type BlogPost = {
  id: number;
  title: string;
  content: string;
};

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

const Page: NextPage<PageProps> = () => (
  <>
    <Box>
      <Heading as="h1">Blogs</Heading>
      <ul>
        {blogPosts.map(item => {
          return (
            <li key={item.id}>
              <NavLink href="/blog/[postId]" as={`/blog/${item.id}`}>
                <Link>{item.title}</Link>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </Box>
  </>
);

export const getServerSideProps = (async () => {
  return {
    props: {
      seo: {
        title: 'Blog',
        description: 'An overview of our blog posts',
      },
    },
  };
}) satisfies GetServerSideProps<SeoProps>;

export default Page;
