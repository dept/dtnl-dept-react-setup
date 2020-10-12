import Link from 'next/link';
import React from 'react';
import { FaReact } from 'react-icons/fa';

import { Box, Flex, Grid, PseudoBox } from '../atoms/Grid';
import { NavLink } from '../atoms/Link';

interface HeaderProps {}

const NavigationLink: React.FC = props => (
  <PseudoBox
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
      bg: 'gray.700',
    }}
    sx={{
      '&.active': {
        bg: 'gray.900',
      },
    }}
    {...props}
  />
);

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
];

const Navigation: React.FC = () => {
  return (
    <Flex as="nav">
      {items.map(item => {
        return (
          <Box key={item.title}>
            <NavLink href={item.href} passHref>
              <NavigationLink>{item.title}</NavigationLink>
            </NavLink>
          </Box>
        );
      })}
    </Flex>
  );
};

export const Header: React.FC<HeaderProps> = () => {
  return (
    <Box as="header" bg="gray.800" color="white">
      <Grid>
        <Flex flexShrink={0} alignItems="center">
          <Link href="/">
            <Flex as="a" mr={8} cursor="pointer">
              <FaReact size={30} />
            </Flex>
          </Link>

          <Navigation />
        </Flex>
      </Grid>
    </Box>
  );
};
