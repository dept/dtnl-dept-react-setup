import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Box } from '@/components/atoms/Grid';
import { Hyperlink } from '@/components/atoms/Hyperlink';
import { Heading, Text } from '@/components/atoms/Text';

import { BlogPost, blogPosts } from '../blog';

interface PageProps {
  post: BlogPost;
}

const Page: NextPage<PageProps> = ({ post }) => {
  return (
    <>
      <NextSeo title={post.title} description={post.content} />
      <Box>
        <Heading as="h1" color="primary">
          {post.title}
        </Heading>
        <Text as="p">{post.content}</Text>

        <Hyperlink href="/blog">Go back</Hyperlink>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ctx => {
  const post = blogPosts.find(item => item.id === Number(ctx.params!.postId));

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogPosts.map(item => ({ params: { postId: String(item.id) } })),
    fallback: false,
  };
};

export default Page;
