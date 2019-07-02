import { Box } from '@tpdewolf/styled-system'

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <Box textAlign="center" as="header" bg="primary" color="white" py={10} px={30}>
      Header
    </Box>
  )
}
