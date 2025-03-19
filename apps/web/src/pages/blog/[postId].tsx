import { ParsedUrlQuery } from 'querystring';

import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { REVALIDATE_PAGE_TTL } from '@/constants/cache';
import { SeoProps } from '@/constants/types';
import { NavLink } from '@dept/ui';
import { blogPosts } from '../blog';

type PageParams = ParsedUrlQuery & {
  postId: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ post }) => (
  <>
    <Box>
      <Heading as="h1" color="primary">
        {post.title}
      </Heading>
      <Text as="p">{post.content}</Text>

      <NavLink href="/blog">
        <Link>Go back</Link>
      </NavLink>
    </Box>
  </>
);

export const getStaticProps = (async ({ params }) => {
  const post = blogPosts.find(item => item.id === Number(params?.postId));

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      seo: {
        title: post.title,
        description: post.content,
        openGraph: {
          type: 'article',
          /**
           * Replace static locale with one from useTranslate() when using https://nextjs.org/docs/advanced-features/i18n-routing
           */
          locale: 'en',
          url: `https://www.deptagency.com/blog/${post.id}`,
          siteName: 'DEPT®',
          article: {
            publishedTime: `${new Date()}`,
            modifiedTime: `${new Date()}`,
            expirationTime: `${new Date()}`,
            author: 'DEPT®',
            section: 'Technology',
            tags: ['DEPT®, Technology, NextJS, ReactJS'],
          },
        },
      },
    },
    revalidate: REVALIDATE_PAGE_TTL,
  };
}) satisfies GetStaticProps<SeoProps, PageParams>;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogPosts.map(item => ({ params: { postId: String(item.id) } })),
    fallback: 'blocking',
  };
};

export default Page;
