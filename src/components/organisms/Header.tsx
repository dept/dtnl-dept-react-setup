import styled from 'styled-components'

import { Box, Flex, Link, NavLink } from '@/components/atoms'

interface HeaderProps {}

const NavigationLink = styled(Box)`
  --border-color: transparent;
  display: block;
  padding-top: 15px;
  padding-bottom: 10px;
  border-bottom: 5px solid var(--border-color);
  &.active {
    --border-color: rgba(0, 0, 0, 0.2);
  }
`

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
  {
    href: '/admin',
    title: 'Admin',
  },
]

const Navigation: React.FC = () => {
  return (
    <Flex as="nav">
      {items.map(item => {
        return (
          <Box key={item.title}>
            <NavLink href={item.href} passHref>
              <NavigationLink as="a" px={4} mx={3}>
                {item.title}
              </NavigationLink>
            </NavLink>
          </Box>
        )
      })}
    </Flex>
  )
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <Flex as="header" bg="primary" color="white" px={8} alignItems="center">
      <Box mr={8}>
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
