import { SeoProps } from '@/constants/types';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = () => <>Homepage</>;

export const getStaticProps = (() => {
  return {
    props: {
      seo: {
        title: 'Homepage',
        description: 'This is the homepage',
        openGraph: {
          type: 'website',
        },
      },
    },
  };
}) satisfies GetStaticProps<SeoProps>;

export default Page;
