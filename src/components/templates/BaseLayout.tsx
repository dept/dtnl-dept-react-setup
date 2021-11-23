import { ReactNode } from 'react';

import { Footer } from '../features/layout/Footer';
import { Header } from '../features/layout/Header';
import { CookiesModal } from '../shared/Cookies/CookiesModal';
import { Box, Flex, Container } from '../shared/Grid';
import { Modal } from '../shared/Modal';
import { Heading, Text } from '../shared/Text';

interface BaseLayoutProps {
  children?: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />

      <Box as="main" flex="1 0 auto" display="block">
        <Container>{children}</Container>
      </Box>

      <Footer />

      <CookiesModal />

      <Modal id="error">
        <Box p={60}>
          <Heading mb={30}>Oops!</Heading>
          <Text>Somethign went wrong. Try to refresh the page</Text>
        </Box>
      </Modal>
    </Flex>
  );
}
