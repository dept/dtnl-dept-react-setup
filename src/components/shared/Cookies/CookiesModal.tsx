import { Cookies } from 'react-cookie';

import { Button } from '../Button';
import { Box, Flex } from '../Grid';
import { Modal } from '../Modal';
import { useModal } from '../Modal/modalStore';
import { Text } from '../Text';
import { CookiesConfig } from './CookiesConfig';
import { acceptCookies, dismissCookies } from './helpers';

export const CookiesModal = () => {
  const cookies = new Cookies();
  const { hide } = useModal('cookies-modal', {
    isClosable: false,
    isShown: !cookies.get(`${CookiesConfig.prefix}accepted`),
  });

  const handleAcceptCookies = () => {
    acceptCookies();
    hide();
  };

  return (
    <Modal id="cookies-modal">
      <Box p={4}>
        <Text as="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet a nisi eget
          dignissim. Vestibulum augue tellus, convallis tristique massa eu, iaculis blandit lectus.
          Fusce aliquam lectus purus, sit amet imperdiet nulla tincidunt id.
        </Text>
        <Flex flexWrap="wrap" mt={4} gridGap={4} justifyContent="center">
          <Button onClick={dismissCookies} variant="foot" w={['100%', 'auto']}>
            Cookie settings
          </Button>
          <Button onClick={handleAcceptCookies} variant="primary" w={['100%', 'auto']}>
            Accept
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};
