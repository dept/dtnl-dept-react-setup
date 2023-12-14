import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

type PageProps = {};

const Page: NextPage<PageProps> = () => (
  <>
    <NextSeo title="About" description="About page" />
    <div>about</div>
  </>
);

export default Page;
