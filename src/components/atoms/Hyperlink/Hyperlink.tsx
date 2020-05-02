import { LinkProps } from 'next/link'
import React from 'react'

import { IconOption } from '@/theme'

import { Box, BoxProps, Flex } from '../Grid'
import { Icon } from '../Icon'
import { Link } from '../Link'

interface HyperLinkElementProps {
  icon?: IconOption
  iconColor?: string
  target?: string
}

type HyperlinkProps = BoxProps & Pick<LinkProps, 'href' | 'as' | 'prefetch'> & HyperLinkElementProps

export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ children, icon, href, as, iconColor, color = 'primary', ...props }, ref) => {
    return (
      <Link href={href} as={as} passHref>
        <Box as="a" color={color} {...props} ref={ref}>
          <Flex alignItems="center" height="100%" as="span">
            {icon && (
              <Box mr={'0.5em'} as="span">
                <Icon size={16} icon={icon} color={iconColor} />
              </Box>
            )}
            {children}
          </Flex>
        </Box>
      </Link>
    )
  },
)
