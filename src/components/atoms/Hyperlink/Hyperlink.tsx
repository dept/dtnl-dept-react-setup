import { LinkProps } from 'next/link';
import React from 'react';
import { useTheme } from 'styled-components';

import { Box, BoxProps, Flex, PseudoBox } from '../Grid';
import { Link } from '../Link';

interface HyperLinkElementProps {
  icon?: any;
  iconColor?: string;
  target?: string;
}

type HyperlinkProps = BoxProps &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'> &
  HyperLinkElementProps;

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ children, icon: Icon, href, as, iconColor, color = 'primary', ...props }, ref) => {
    const theme = useTheme();

    return (
      <Link href={href} as={as} passHref>
        <PseudoBox
          as="a"
          display="inline-block"
          color={color}
          borderRadius={4}
          {...props}
          _focus={{
            outline: 'none',
            boxShadow: theme.shadows.outline,
          }}
          ref={ref}>
          <Flex alignItems="center" height="100%" as="span">
            {Icon && (
              <Box mr={'0.5em'} as="span" color={iconColor}>
                <Icon size={18} />
              </Box>
            )}
            {children}
          </Flex>
        </PseudoBox>
      </Link>
    );
  },
);
