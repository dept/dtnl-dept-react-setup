import { FC } from 'react';

import { Box, Flex, Container } from '../atoms/Grid';
import { Heading, Text } from '../atoms/Text';
import { Modal } from '../molecules/Modal';
import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';

interface BaseLayoutProps {}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />

      <Box as="main" flex="1 0 auto" display="block">
        <Container>{children}</Container>
      </Box>

      <Footer />

      <Modal id="error">
        <Box p={60}>
          <Heading mb={30}>Oops!</Heading>
          <Text>Somethign went wrong. Try to refresh the page</Text>
        </Box>
      </Modal>
    </Flex>
  );
};
