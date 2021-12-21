import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';
import { LinkProps } from 'next/link';
import { forwardRef } from 'react';

import { Link } from '../Link';

interface HyperLinkElementProps {
  icon?: any;
  iconColor?: string;
  target?: string;
}

type HyperlinkProps = BoxProps &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'> &
  HyperLinkElementProps;

export const Hyperlink = forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ children, icon: Icon, href, as, iconColor, color = 'primary', ...props }, ref) => {
    const theme = useTheme();

    return (
      <Link href={href} as={as} passHref>
        <Box
          as="a"
          display="inline-block"
          color={color}
          borderRadius={4}
          {...props}
          _focus={{
            outline: 'none',
            boxShadow: theme.shadows.outline,
          }}
          ref={ref as any}
        >
          <Flex alignItems="center" height="100%" as="span">
            {Icon && (
              <Flex mr={'0.5em'} as="span" color={iconColor}>
                <Icon size={18} />
              </Flex>
            )}
            {children}
          </Flex>
        </Box>
      </Link>
    );
  },
);
