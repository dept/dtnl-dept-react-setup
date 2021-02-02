import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';

import { Button } from '@/components/atoms/Button';
import { Box, Flex } from '@/components/atoms/Grid';
import { Text } from '@/components/atoms/Text';
import { Modal } from '@/components/molecules/Modal';
import { useModal } from '@/components/molecules/Modal/modalStore';

import { CookiesConfig } from './CookiesConfig';

export const CookiesModal = () => {
  const cookies = new Cookies();
  const date = new Date();
  const expires = new Date(date.setDate(date.getDate() + 365));
  const router = useRouter();
  const { hide } = useModal('cookies-modal');

  const AcceptCookies = () => {
    cookies.set(`${CookiesConfig.prefix}accepted`, true, { expires, sameSite: 'lax' });

    CookiesConfig.cookies.map(cookie => {
      cookies.set(CookiesConfig.prefix + cookie.name, true, { expires, sameSite: 'lax' });
    });

    hide();
  };

  const DismissCookies = () => {
    cookies.set(`${CookiesConfig.prefix}accepted`, false, { expires, sameSite: 'lax' });

    CookiesConfig.cookies.map(cookie => {
      cookies.set(CookiesConfig.prefix + cookie.name, cookie.value, { expires, sameSite: 'lax' });
    });

    router.push('/cookies');
  };

  useModal('cookies-modal', {
    isClosable: false,
    isShown: !cookies.get(`${CookiesConfig.prefix}accepted`),
  });

  return (
    <Modal id="cookies-modal">
      <Box p={4}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet a nisi eget
          dignissim. Vestibulum augue tellus, convallis tristique massa eu, iaculis blandit lectus.
          Fusce aliquam lectus purus, sit amet imperdiet nulla tincidunt id.
        </Text>
        <Flex flexWrap="wrap">
          <Button mt={4} onClick={DismissCookies} variant="secondary" w={['100%', 'auto']}>
            Cookie settings
          </Button>
          <Button ml={[0, 4]} mt={4} onClick={AcceptCookies} variant="primary" w={['100%', 'auto']}>
            Accept
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};
