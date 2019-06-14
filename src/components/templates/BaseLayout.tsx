import { Box, Flex, Heading, Text } from '@/components/atoms'
import { useModal } from '@/context/ModalContext'

import { Modal } from '../molecules'
import { Footer, Header } from '../organisms'

interface BaseLayoutProps {}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const modalStore = useModal()

  return (
    <Flex flexDirection="column" height="100vh">
      <Header />
      <Box as="main" flex={'1 0 auto'} display="block">
        {children}
      </Box>
      <Modal isOpen={modalStore.isShown('error')} onDismiss={() => modalStore.hide('error')}>
        <Box p={60}>
          <Heading mb={30}>Er is iets misgegaan!</Heading>
          <Text>Er ging iets mis met je verzoek. Probeer het opnieuw op ververs de pagina.</Text>
        </Box>
      </Modal>
      <Footer />
    </Flex>
  )
}
