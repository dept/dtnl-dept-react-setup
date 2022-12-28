'use-client';

import { Box, BoxProps, Container, Flex, forwardRef } from '@chakra-ui/react';
import Link from 'next/link';
import { FaReact } from 'react-icons/fa';

import NextLink from 'next/link';

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
      {items.map(item => (
        <Box key={item.title}>
          <NavigationLink as={NextLink} href={item.href}>
            {item.title}
          </NavigationLink>
        </Box>
      ))}
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
