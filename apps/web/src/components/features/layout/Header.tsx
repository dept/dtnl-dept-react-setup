import { Box, BoxProps, Container, Flex, forwardRef } from '@chakra-ui/react';
import Link from 'next/link';
import { FaReact } from 'react-icons/fa';

import { NavLink } from '@dept/ui';

const NavigationLink = forwardRef<BoxProps, 'div'>((props, ref) => (
  <Box
    ref={ref}
    as="a"
    px={4}
    py={1}
    mx={3}
    my={5}
    display="block"
    fontSize="sm"
    borderRadius={5}
    fontWeight="medium"
    _hover={{
      bg: 'secondary',
    }}
    sx={{
      '&.active': {
        bg: 'gray.700',
      },
    }}
    {...props}
  />
));

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
];

function Navigation() {
  return (
    <Flex as="nav">
      {items.map(item => {
        return (
          <Box key={item.title}>
            <NavLink href={item.href} passHref legacyBehavior>
              <NavigationLink>{item.title}</NavigationLink>
            </NavLink>
          </Box>
        );
      })}
    </Flex>
  );
}

export function Header() {
  return (
    <Box as="header" bg="primary" color="white">
      <Container>
        <Flex flexShrink={0} alignItems="center">
          <Link href="/" legacyBehavior>
            <Flex as="a" mr={2} cursor="pointer">
              <FaReact size={30} />
            </Flex>
          </Link>

          <Navigation />
        </Flex>
      </Container>
    </Box>
  );
}
