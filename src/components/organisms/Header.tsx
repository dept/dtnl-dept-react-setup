import { Box, Flex } from '@tpdewolf/styled-primitives'
import styled from 'styled-components'

import { ActiveLink, Link } from '@/components/atoms'

interface HeaderProps {}

const NavigationLink = styled(Box)`
  --border-color: transparent;
  display: block;
  padding-top: 15px;
  padding-bottom: 10px;
  border-bottom: 5px solid var(--border-color);
  &.active {
    --border-color: black;
  }
`

const Navigation: React.FC = () => {
  const items = [
    {
      href: '/about',
      title: 'About',
    },
    {
      href: '/blog',
      title: 'Blog',
    },
    {
      href: '/examples',
      title: 'Examples',
    },
  ]

  return (
    <Flex as="nav">
      {items.map(item => {
        return (
          <Box key={item.title}>
            <ActiveLink href={item.href}>
              <NavigationLink as="a" px={15} mx={10}>
                {item.title}
              </NavigationLink>
            </ActiveLink>
          </Box>
        )
      })}
    </Flex>
  )
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <Flex as="header" bg="primary" color="white" px={30} alignItems="center">
      <Box mr={50}>
        <Link href="/">
          <a>
            <Box>Logo</Box>
          </a>
        </Link>
      </Box>

      <Navigation></Navigation>
    </Flex>
  )
}
