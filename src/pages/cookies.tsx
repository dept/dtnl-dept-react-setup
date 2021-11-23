import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Cookies } from 'react-cookie';

import { Button } from '@/components/shared/Button';
import { CookiesConfig } from '@/components/shared/Cookies';
import { Box } from '@/components/shared/Grid';
import { useModal } from '@/components/shared/Modal/modalStore';
import { Heading, Paragraph } from '@/components/shared/Text';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const cookies = new Cookies();

  const { show } = useModal('cookies-modal', {
    isClosable: false,
    isShown: !cookies.get(`${CookiesConfig.prefix}accepted`),
  });

  return (
    <>
      <NextSeo title="About" description="This is the about page" />
      <Box>
        <Heading as="h1">Cookies</Heading>
        <Paragraph>Information about the cookies we Use</Paragraph>
        <Button onClick={show}>Open cookie bar</Button>
      </Box>
    </>
  );
};

export default Page;
