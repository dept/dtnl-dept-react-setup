import { useTheme } from 'styled-components'

import { Box, Flex, Grid, Heading, Text } from '@/components/atoms'
import { useMongoGlobalForm } from '@/mongo/hooks/useMongoGlobalForm'

import { Modal } from '../molecules'
import { Footer, Header } from '../organisms'

interface BaseLayoutProps {}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const theme = useTheme()

  const [footer] = useMongoGlobalForm('globals', 'footer', {
    label: 'Edit footer',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
    ],
    onSubmit: async () => {
      return
    },
  })

  const [settings] = useMongoGlobalForm('globals', 'settings', {
    label: 'Settings',
    initialValues: {
      color: theme.colors.primary,
    },
    fields: [
      {
        name: 'colors',
        label: 'Colors',
        component: 'group',
        fields: [
          {
            name: 'primary',
            label: 'Primary',
            component: 'color',
          },
          {
            name: 'secondary',
            label: 'Secondary',
            component: 'color',
          },
          {
            name: 'text',
            label: 'Text',
            component: 'color',
          },
        ],
      },
    ],
    onSubmit: async values => {
      return
    },
  })

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
