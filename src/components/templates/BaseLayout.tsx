import { Box, Flex, Grid, Heading, Text } from '@/components/atoms'

import { Modal } from '../molecules'
import { Footer, Header } from '../organisms'

interface BaseLayoutProps {}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />
      <Box as="main" flex={'1 0 auto'} display="block">
        <Grid>{children}</Grid>
      </Box>
      <Footer />

      <Modal id="error">
        <Box p={60}>
          <Heading mb={30}>Oops!</Heading>
          <Text>Somethign went wrong. Try to refresh the page</Text>
        </Box>
      </Modal>
    </Flex>
  )
}
