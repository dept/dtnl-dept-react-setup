import { SeoProps } from '@/constants/types';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

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
  <div>
    blog
  </div>
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
