import Link from 'next/link';
import { FC, forwardRef } from 'react';
import { FaReact } from 'react-icons/fa';

import { Box, BoxProps, Flex, Container } from '../atoms/Grid';
import { NavLink } from '../atoms/Link';

interface HeaderProps {}

const NavigationLink = forwardRef<any, BoxProps>((props, ref) => (
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
      bg: 'gray.700',
    }}
    sx={{
      '&.active': {
        bg: 'gray.900',
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
  {
    href: '/form',
    title: 'Example form',
  },
];

const Navigation: FC = () => {
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

export const Header: FC<HeaderProps> = () => {
  return (
    <Box as="header" bg="gray.800" color="white">
      <Container>
        <Flex flexShrink={0} alignItems="center">
          <Link href="/">
            <Flex as="a" mr={8} cursor="pointer">
              <FaReact size={30} />
            </Flex>
          </Link>

          <Navigation />
        </Flex>
      </Container>
    </Box>
  );
};
